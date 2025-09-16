import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";

export const exportEventDetailsReportToExcel = async (
  eventSummary,
  participantData,
  title = "Event_Details_Report"
) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Event Report");

  // ----- HEADER -----
  sheet.mergeCells(1, 1, 1, 2);
  const summaryTitle = sheet.getCell("A1");
  summaryTitle.value = eventSummary.event_name || title;
  summaryTitle.font = { bold: true, size: 16 };
  summaryTitle.alignment = { horizontal: "center", vertical: "middle" };
  summaryTitle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: eventSummary.event_status === "Active" ? "C6EFCE" : "F8D7DA",
    },
  };
  sheet.getRow(1).height = 25;

  sheet.addRow([]);

  // ----- EVENT DETAILS -----
  const details = [
    ["Member Allowed", eventSummary?.data?.event_member_allowed ?? "-"],
    [
      "No. of Member Allowed",
      eventSummary?.data?.event_no_member_allowed ?? "-",
    ],
    [
      "From Date",
      eventSummary?.data?.event_from_date
        ? moment(eventSummary?.data?.event_from_date).format("DD-MMM-YYYY")
        : "-",
    ],
    [
      "To Date",
      eventSummary?.data?.event_to_date
        ? moment(eventSummary?.data?.event_to_date).format("DD-MMM-YYYY")
        : "-",
    ],
    ["Payment", eventSummary?.data?.event_payment || "-"],
  ];

  if (
    eventSummary?.data?.event_payment == "Cash" ||
    eventSummary?.data?.event_payment == "Online"
  ) {
    details.push(["Amount", eventSummary?.data?.event_amount ?? "-"]);
  }

  sheet.addRows(details);

  sheet.getColumn(1).width = 25;
  sheet.getColumn(2).width = 50;
  sheet.getColumn(1).font = { bold: true };

  sheet.addRow([]);

  // ----- DESCRIPTION -----
  sheet.addRow(["Description", eventSummary.event_description || "-"]);
  sheet.getRow(sheet.lastRow.number).font = { bold: true };
  sheet.addRow([]);

  // ----- TOTALS -----
  const totals = [
    ["Registered", eventSummary.totalRegister ?? 0],
    ["Attended", eventSummary.totalAttend ?? 0],
    ["Not Scanned", eventSummary.totalregisterNotScanned ?? 0],
    ["Not Registered", eventSummary.totalNotregister ?? 0],
  ];

  const totalHeaderRow = sheet.addRow(["Totals"]);
  totalHeaderRow.font = { bold: true, size: 14 };
  sheet.addRows(totals);

  sheet.addRow([]);
  sheet.addRow([]);

  // ----- PARTICIPANT TABLE -----
  const tableHeader = [
    "MID",
    "Full Name",
    "Mobile",
    "Payment Type",
    "Transaction",
    "No. of People",
  ];

  const headerRow = sheet.addRow(tableHeader);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f3f4f6" },
  };

  sheet.columns = [
    { key: "mid", width: 30 },
    { key: "name", width: 25 },
    { key: "mobile", width: 18 },
    { key: "payment", width: 30 },
    { key: "txn", width: 22 },
    { key: "people", width: 15 },
  ];

  participantData.forEach((item) => {
    const fullName = [item.first_name, item.middle_name, item.last_name]
      .filter(Boolean)
      .join(" ");
    sheet.addRow({
      mid: item.event_register_mid,
      name: fullName,
      mobile: item.mobile,
      payment: item.event_register_payment_type,
      txn: item.event_register_transaction,
      people: item.event_no_of_people,
    });
  });

  // ----- EXPORT -----
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${title}.xlsx`);
};
