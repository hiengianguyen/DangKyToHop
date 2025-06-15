const { FirestoreModel, RegisteredCombinationModel, UserModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");
const { exportExcelFile } = require("../../utils/exportFile");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

class FileController {
  constructor() {
    this.userDBRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
    this.registeredCombinationsDbRef = new FirestoreModel(CollectionNameConstant.RegisteredCombinations, RegisteredCombinationModel);
    this.exportSubmitedListExcel = this.exportSubmitedListExcel.bind(this);
    this.exportSubmitedPDF = this.exportSubmitedPDF.bind(this);
  }

  async exportSubmitedListExcel(req, res, next) {
    let submitedList = await this.registeredCombinationsDbRef.getAllItems({
      fieldName: "registeredAt",
      type: "asc"
    });
    submitedList = await Promise.all(
      submitedList.map(async (doc) => {
        let phoneNumber;
        if (doc.userId) {
          const userSubmited = await this.userDBRef.getItemById(doc.userId);
          phoneNumber = userSubmited.phone || "";
        }
        return {
          ...doc,
          registeredAt: convertToVietnameseDateTime(doc.registeredAt.toDate()),
          phoneNumber: phoneNumber
        };
      })
    );

    const keys = [
      "STT",
      "Họ tên học sinh",
      "Ngày tháng năm sinh",
      "Trường cấp 2",
      "Nguyện vọng 1",
      "Nguyện vọng 2",
      "Ngày đăng ký",
      "SĐT liên hệ"
    ];
    const rows = submitedList.map((row, index) => {
      return {
        index: index + 1,
        fullName: row.fullName,
        dateOfBirth: row.dateOfBirth,
        secondarySchool: row.secondarySchool + ", " + (row.schoolDistrict || ""),
        combination1: row.combination1,
        combination2: row.combination2,
        registeredAt: row.registeredAt,
        phoneNumber: row.phoneNumber
      };
    });
    const buffer = exportExcelFile(rows, keys);

    res.setHeader("Content-Disposition", "attachment; filename=DanhSachDangKy.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    return res.send(buffer);
  }

  async exportSubmitedPDF(req, res, next) {
    // 1. Lấy dữ liệu cho file PDF
    const userId = req?.params?.userId ?? req?.cookies?.userId;
    const data = await this.registeredCombinationsDbRef.getItemByFilter({
      userId: userId
    });

    // 2. Render HTML từ Handlebars
    const html = await new Promise((resolve, reject) => {
      req.app.render(
        "combination/submited_detail",
        {
          submitedCombinationDetail: data,
          isExportPDF: true
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    // 3. Dùng Puppeteer để xuất PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: ["load", "domcontentloaded", "networkidle0"] });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    fs.writeFileSync("HoSoChiTiet.pdf", pdfBuffer);

    await browser.close();

    // 4. Gửi file về trình duyệt
    res.set({
      "Content-Disposition": "inline; filename=HoSoChiTiet.pdf",
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length
    });

    //return res.send(pdfBuffer);
    return res.sendFile(path.resolve("HoSoChiTiet.pdf"));
  }
}

module.exports = new FileController();
