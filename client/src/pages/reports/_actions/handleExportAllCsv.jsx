import { mkConfig, generateCsv, download } from "export-to-csv";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "generated-report",
});

export const handleExportData = (data) => {
  const allReports = data.map((reportItem) => {
    const report = {
      ...reportItem,
      id: reportItem.id,
    };
    delete report.isNew;
    delete report.Resident;
    delete report.residentId;
    return report;
  });

  const csv = generateCsv(csvConfig)(allReports);
  download(csvConfig)(csv);
};
