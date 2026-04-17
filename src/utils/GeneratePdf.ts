import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import RNFS from "react-native-fs";

export const generatePDF = async (
  formData: any,
  images: any[],
  includeImages: boolean
): Promise<string | null> => {

  try {

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 800;

    // HEADER
    page.drawRectangle({
      x: 0,
      y: 760,
      width: 595,
      height: 60,
      color: rgb(0.1, 0.4, 0.8),
    });

    page.drawText("Expense Claim", {
      x: 50,
      y: 790,
      size: 18,
      font,
      color: rgb(1, 1, 1),
    });

    y = 730;

    const drawRow = (
      label1: string,
      value1: any,
      label2?: string,
      value2?: any
    ) => {

      if (y < 120) {
        page = pdfDoc.addPage([595, 842]);
        y = 780;
      }

      const cellHeight = 26;

      // LEFT CELL
      page.drawRectangle({
        x: 50,
        y: y - 10,
        width: 250,
        height: cellHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0)
      });

      // RIGHT CELL
      page.drawRectangle({
        x: 300,
        y: y - 10,
        width: 245,
        height: cellHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0)
      });

      // LEFT LABEL
      page.drawText(label1, {
        x: 60,
        y,
        size: 10,
        font,
        color: rgb(0.4,0.4,0.4)
      });

      // LEFT VALUE
      page.drawText(String(value1 || "-"), {
        x: 170,
        y,
        size: 11,
        font
      });

      if (label2) {

        page.drawText(label2, {
          x: 310,
          y,
          size: 10,
          font,
          color: rgb(0.4,0.4,0.4)
        });

        page.drawText(String(value2 || "-"), {
          x: 430,
          y,
          size: 11,
          font
        });

      }

      y -= cellHeight;
    };

    // FORM SECTION
    drawRow("Requested By", formData.requestedBy, "Employee No", formData.employeeNo);
    drawRow("Request Type", formData.requestType, "Brand", formData.brand);
    drawRow("Company", formData.company, "Business Division", formData.businessDivision);
    drawRow("Department", formData.department, "Sites", formData.sites);
    drawRow("Voucher Date", formData.voucherDate, "Activity Date", formData.activityDate);

    y -= 10;

    // PURPOSE HEADER ROW
const purposeLabelHeight = 24;

page.drawRectangle({
  x: 50,
  y: y - purposeLabelHeight,
  width: 495,
  height: purposeLabelHeight,
  borderWidth: 1,
  borderColor: rgb(0,0,0),
});

page.drawText("Purpose", {
  x: 60,
  y: y - 17,
  size: 11,
  font,
});

y -= purposeLabelHeight;

// PURPOSE TEXT AREA
const purposeBoxHeight = 55;

page.drawRectangle({
  x: 50,
  y: y - purposeBoxHeight,
  width: 495,
  height: purposeBoxHeight,
  borderWidth: 1,
  borderColor: rgb(0,0,0),
});

page.drawText(String(formData.purpose || "-"), {
  x: 60,
  y: y - 25,
  size: 11,
  font,
});

y -= purposeBoxHeight + 10;

    // EXPENSE HEADER
    page.drawText("Expense Details", {
      x: 50,
      y,
      size: 14,
      font,
    });

    y -= 20;

    drawRow("Food & Beverage", formData.foodBeverage);
    drawRow("Miscellaneous", formData.miscellaneous);

    // IMAGE SECTION
    if (includeImages && images?.length > 0) {

      y -= 20;

      page.drawText("Receipts", {
        x: 50,
        y,
        size: 16,
        font,
      });

      y -= 20;

      let x = 50;

      const imgWidth = 150;
      const imgHeight = 120;

      for (const img of images) {

        const uri = img?.uri || img;
        const cleanUri = uri.replace("file://", "");

        const base64 = await RNFS.readFile(cleanUri, "base64");

        const imageBytes = Uint8Array.from(
          atob(base64),
          (c) => c.charCodeAt(0)
        );

        const jpg = await pdfDoc.embedJpg(imageBytes);

        if (y < 150) {
          page = pdfDoc.addPage([595, 842]);
          y = 750;
          x = 50;
        }

        page.drawImage(jpg, {
          x,
          y: y - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });

        x += imgWidth + 20;

        if (x > 400) {
          x = 50;
          y -= imgHeight + 20;
        }
      }
    }

    const base64 = await pdfDoc.saveAsBase64();

    const path = `${RNFS.DownloadDirectoryPath}/ExpenseClaim_${Date.now()}.pdf`;

    await RNFS.writeFile(path, base64, "base64");

    console.log("PDF saved:", path);

    return path;

  } catch (error) {

    console.log("PDF generation failed:", error);
    return null;
  }
};