import { mkConfig, generateCsv, download } from "export-to-csv";

const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

 export const handleExportData = (data) => {
    const allReports = data.map(reportItem => {
      const report = {
       ...reportItem,
        id: reportItem.id,
      };
      delete report.isNew
      return report;
    })

    
    
    const csv = generateCsv(csvConfig)(allReports);
    download(csvConfig)(csv);
  };