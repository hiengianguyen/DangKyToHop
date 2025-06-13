const XLSX = require("xlsx");

function exportExcelFile(submitedList, keys) {
  const rows = submitedList.map((row, index) => {
    return {
      index: index + 1,
      fullName: row.fullName,
      dateOfBirth: row.dateOfBirth,
      secondarySchool: row.secondarySchool,
      combination1: row.combination1,
      combination2: row.combination2,
      registeredAt: row.registeredAt,
      phoneNumber: row.phoneNumber
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Submited");
  XLSX.utils.sheet_add_aoa(worksheet, [keys], { origin: "A1" });

  const colWidths = keys.map((key, index) => {
    const maxLength = Math.max(
      key.length,
      ...rows.map((row) => {
        const rowKeys = Object.keys(row);
        return row[rowKeys[index]]?.toString().length || 0;
      })
    );
    return { wch: maxLength + 2 };
  });

  worksheet["!cols"] = colWidths;
  // tra ve doi tuong buffer tu file
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

module.exports = { exportExcelFile };
