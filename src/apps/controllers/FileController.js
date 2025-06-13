const { FirestoreModel, RegisteredCombinationModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");
const { exportExcelFile } = require("../../utils/exportFile");

class FileController {
  constructor() {
    this.registeredCombinationsDbRef = new FirestoreModel(CollectionNameConstant.RegisteredCombinations, RegisteredCombinationModel);
    this.exportSubmitedListExcel = this.exportSubmitedListExcel.bind(this);
  }

  async exportSubmitedListExcel(req, res, next) {
    let submitedList = await this.registeredCombinationsDbRef.getAllItems({
      fieldName: "registeredAt",
      type: "asc"
    });
    Array.from(submitedList).forEach((doc) => {
      doc.registeredAt = convertToVietnameseDateTime(doc.registeredAt.toDate());
    });

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
    const buffer = exportExcelFile(submitedList, keys);

    res.setHeader("Content-Disposition", "attachment; filename=DanhSachDangKy.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    return res.send(buffer);
  }
}

module.exports = new FileController();
