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
        y: y - cellHeight,
        width: 250,
        height: cellHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0)
      });

      // RIGHT CELL
      page.drawRectangle({
        x: 300,
        y: y - cellHeight, 
        width: 245,
        height: cellHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0)
      });

      page.drawText(label1, {
        x: 60,
        y: y - 16, 
        size: 10,
        font,
        color: rgb(0.4,0.4,0.4)
      });

      page.drawText(String(value1 || "-"), {
        x: 130,
        y: y - 16, 
        size: 11,
        font
      });

      if (label2) {

        page.drawText(label2, {
          x: 310,
          y: y - 16,
          size: 10,
          font,
          color: rgb(0.4,0.4,0.4)
        });

        page.drawText(String(value2 || "-"), {
          x: 390,
          y: y - 16,
          size: 11,
          font
        });

      }

      y -= cellHeight;
    };

    // FORM SECTION
    drawRow("Requested By", formData.requestedBy, "Employee No", formData.employeeNo);
    drawRow("Request Type", formData.requestType, "Brand", formData.Brand);
    drawRow("Company", formData.company, "Business Division", formData.businessDivision);
    drawRow("Department", formData.department, "Sites", formData.sites);
    drawRow("Voucher Date", formData.voucherDate, "Activity Date", formData.activityDate);

    // PURPOSE HEADER
    const purposeHeight = 24;

page.drawRectangle({
  x: 50,
  y: y - purposeHeight,
  width: 495,
  height: purposeHeight,
  borderWidth: 1,
  borderColor: rgb(0,0,0),
});

page.drawText("Purpose", {
  x: 60,
  y: y - 16,
  size: 11,
  font,
});

page.drawText(String(formData.purpose || "-"), {
  x: 150,
  y: y - 16,
  size: 11,
  font,
});

y -= purposeHeight;


    const expenseHeight = 24;

    const drawExpense = (label: string, value: any) => {

      page.drawRectangle({
        x: 50,
        y: y - expenseHeight,
        width: 495,
        height: expenseHeight,
        borderWidth: 1,
        borderColor: rgb(0,0,0),
      });

      page.drawText(label, {
        x: 60,
        y: y - 16,
        size: 11,
        font,
      });

      page.drawText(String(value || "-"), {
        x: 200,
        y: y - 16,
        size: 11,
        font,
      });

      y -= expenseHeight;
    };

    drawExpense("Food & Beverage", formData.foodBeverage);
    drawExpense("Miscellaneous(Remarks)", formData.micellaneous);

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

      const maxWidth = 180;

      for (const img of images) {

        const uri = img?.uri || img;
        const cleanUri = uri.replace("file://", "");

        const base64 = await RNFS.readFile(cleanUri, "base64");

        const image = await pdfDoc.embedJpg(base64);

        const dims = image.scale(1);

        let imgWidth = dims.width;
        let imgHeight = dims.height;

        if (imgWidth > maxWidth) {
          const scale = maxWidth / imgWidth;
          imgWidth *= scale;
          imgHeight *= scale;
        }

        if (y < 150) {
          page = pdfDoc.addPage([595, 842]);
          y = 750;
          x = 50;
        }

        page.drawImage(image, {
          x,
          y: y - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });

        x += imgWidth + 20;

        if (x > 420) {
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