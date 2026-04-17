const RNHTMLtoPDF: any = require("react-native-html-to-pdf").default 
  ?? require("react-native-html-to-pdf");

export const generatePDF = async (
  formData: any,
  images: any[],
  includeImages: boolean
) => {
  try {
    let formFieldsHTML = "";

    // ✅ Skip the 'images' key to avoid [object Object] in PDF
    const excludedKeys = ["images"];

    Object.keys(formData).forEach((key) => {
      if (!excludedKeys.includes(key)) {
        const label = key.replace(/([A-Z])/g, " $1").trim(); // camelCase → readable
        formFieldsHTML += `
          <tr>
            <td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">${label}</td>
            <td style="padding:6px 12px;border:1px solid #ddd">${formData[key] ?? ""}</td>
          </tr>`;
      }
    });

    let imagesHTML = "";
    if (includeImages && images?.length > 0) {
      images.forEach((img: any) => {
        const uri = img?.uri || img;
        // ✅ Ensure file:// prefix for local images
        const src = uri.startsWith("file://") ? uri : `file://${uri}`;
        imagesHTML += `
          <div style="margin-top:10px">
            <img src="${src}" style="width:200px;height:auto;border-radius:6px"/>
          </div>`;
      });
    }

    const html = `
      <html><body style="font-family:Arial;padding:20px">
        <h1 style="color:#1976D2">Expense Claim</h1>
        <h2>Claim Details</h2>
        <table style="border-collapse:collapse;width:100%">
          ${formFieldsHTML}
        </table>
        ${includeImages && imagesHTML ? `<h2>Receipts</h2>${imagesHTML}` : ""}
      </body></html>
    `;

    const options = {
      html,
      fileName: `ExpenseClaim_${Date.now()}`,
      directory: "Documents",
    };

    const file = await RNHTMLtoPDF.convert(options);
    console.log("PDF created:", file.filePath);
    return file.filePath;

  } catch (error) {
    console.log("PDF generation failed:", error);
    return null; // ✅ Explicit null return on failure
  }
};