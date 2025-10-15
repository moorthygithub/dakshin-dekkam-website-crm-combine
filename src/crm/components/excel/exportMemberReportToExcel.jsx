import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportMemberReportToExcel = async (
  data,
  title = "Member_Report"
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Member Report");

  // Define columns
  const columns = [
    { header: "Sl No", key: "slNo", width: 10 },
    { header: "Name", key: "name", width: 25 },
    { header: "Mobile", key: "mobile", width: 15 },
    { header: "Email", key: "email", width: 30 },
    { header: "Blood Group", key: "bloodGroup", width: 12 },
    { header: "Married Status", key: "marriedStatus", width: 15 },
    { header: "Status", key: "status", width: 12 },
  ];
  worksheet.columns = columns;

  const columnCount = columns.length;

  // ----- TITLE ROW -----
  worksheet.mergeCells(1, 1, 1, columnCount);
  const titleCell = worksheet.getCell("A1");
  titleCell.value = title;
  titleCell.font = { size: 16, bold: true };
  titleCell.alignment = { horizontal: "center", vertical: "middle" };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F3F4F6" },
  };
  worksheet.getRow(1).height = 30;

  // ----- HEADER ROW -----
  const headerRow = worksheet.getRow(2);
  columns.forEach((col, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = col.header;
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F3F4F6" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getColumn(index + 1).width = col.width;
  });
  headerRow.commit();

  // ----- DATA ROWS -----
  data.forEach((item, i) => {
    const row = worksheet.getRow(i + 3);
    row.getCell(1).value = i + 1; // Sl No
    row.getCell(
      2
    ).value = `${item.first_name} ${item.middle_name} ${item.last_name}`;
    row.getCell(3).value = item.mobile;
    row.getCell(4).value = item.email;
    row.getCell(5).value = item.user_blood_group;
    row.getCell(6).value = item.user_married_status;
    row.getCell(7).value = item.user_status;

    // Align cells
    for (let j = 1; j <= columnCount; j++) {
      const cell = row.getCell(j);
      cell.alignment = {
        vertical: "middle",
        horizontal: j === 1 || j === 3 ? "center" : "left",
        wrapText: true,
      };
    }

    row.commit();
  });

  // ----- EXPORT -----
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${title.replace(/\s+/g, "_")}.xlsx`);
};
