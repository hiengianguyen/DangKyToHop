const { FirestoreModel, RegisteredCombinationModel, UserModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");
const { exportExcelFile } = require("../../utils/exportFile");

class FileController {
  constructor() {
    this.userDBRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
    this.registeredCombinationsDbRef = new FirestoreModel(CollectionNameConstant.RegisteredCombinations, RegisteredCombinationModel);
    this.exportSubmitedListExcel = this.exportSubmitedListExcel.bind(this);
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

    console.log(rows);
    const buffer = exportExcelFile(rows, keys);

    res.setHeader("Content-Disposition", "attachment; filename=DanhSachDangKy.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    return res.send(buffer);
  }
}

module.exports = new FileController();
