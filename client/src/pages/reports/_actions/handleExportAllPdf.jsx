import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const handleExportRows = (data) => {
  const doc = new jsPDF();
  const tableData = data.map((reportItem) => {
    const report = {
      ...reportItem,
      id: reportItem.id,
    };
    delete report.latitude;
    delete report.longitude;
    delete report.id;
    delete report.isNew;
    delete report.residentId;
    delete report.Resident;

    console.log(report);
    return Object.values(report);
  });

  const tableHeaders = Object.keys(data[0]);

  const headersToRemove = [
    "id",
    "isNew",
    "latitude",
    "longitude",
    "residentId",
    "Resident",
  ];

  const updatedTableHeaders = tableHeaders.filter(
    (header) => !headersToRemove.includes(header)
  );

  const filteredHeaders = updatedTableHeaders.filter(
    (header) => header !== "isNew"
  );
  // console.log(tableHeaders)
  autoTable(doc, {
    head: [filteredHeaders],
    body: tableData,
  });

  doc.save("generated-report.pdf");
};
