import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const handleExportRows = (data) => {
  const doc = new jsPDF();
  const tableData = data.map((reportItem) => {
    const report = {
      ...reportItem,
      id: reportItem.id,
    };
   delete report.isNew
    return Object.values(report);
  });

  const tableHeaders = Object.keys(data[0])
  const filteredHeaders = tableHeaders.filter(header => header !== "isNew")
  // console.log(tableHeaders)
  autoTable(doc, {
    head: [filteredHeaders],
    body: tableData,
  });

  doc.save("mrt-pdf-example.pdf");
};