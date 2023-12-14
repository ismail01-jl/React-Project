import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useShoppingCart } from "use-shopping-cart";

const PdfCart = () => {
  const { cartDetails, totalPrice } = useShoppingCart();

  const generatePDF = (tableRows, columns, isLandscape) => {
    const doc = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
    });

    doc.autoTable({
      head: columns,
      body: tableRows,
      startY: 20,
      headStyles: {
        fillColor: [241, 196, 15],
        fontSize: 12,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 30, cellHeight: 20, halign: "center" },
        1: { cellWidth: "auto", halign: "center", fontStyle: "bold" },
        2: { cellWidth: 30, halign: "center" },
        3: { cellWidth: 30, halign: "center" },
        4: { cellWidth: 30, halign: "center" },
      },
      styles: {
        valign: "middle",
      },

      didParseCell: function (data) {
        if (data.section === "body") {
          data.row.height = 20;
        }
        if (data.column.dataKey === "cover") {
          data.cell.text = "";
          data.cell.raw = `${data.cell.raw}`;
        }
      },

      didDrawCell: function (data) {
        if (
          data.row.section === "body" &&
          data.column.dataKey === "cover" &&
          data.cell.raw
        ) {
          doc.addImage(
            data.cell.raw,
            "JPEG",
            data.cell.x + 5,
            data.cell.y + 2,
            13,
            16
          );
        }
      },
    });

    const date = new Date().toString().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text(`Total : ${totalPrice} $`, 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

  const columnsPDF = [
    {
      cover: "Poster",
      title: "Title",
      quantity: "Tickets",
      cost: "Prix",
      STotal: "S/Total",
    },
  ];

  return (
    <>
      <button
        style={{
          color: "#eee",
          outline: 0,
          border: 0,
          backgroundColor: "#271c5f",
          height: 70,
          width: 150,
          margin: "150px 600px",
          cursor: "pointer",
        }}
        onClick={() =>
          generatePDF(
            Object.values(cartDetails).map((item) => ({
              cover: item.cover,
              title: item.title,
              quantity: item.quantity,
              cost: item.cost,
              STotal: item.cost * item.quantity,
            })),
            columnsPDF,
            true
          )
        }
      >
        DOWNLOAD PDF
      </button>
    </>
  );
};

export default PdfCart;
