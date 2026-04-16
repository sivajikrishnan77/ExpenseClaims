import RNHTMLtoPDF from "react-native-html-to-pdf";

export const generatePDF = async (
  formData: any,
  images: any[],
  includeImages: boolean
) => {

  // Convert all form fields into HTML
  let formFieldsHTML = "";

  Object.keys(formData).forEach((key) => {
    formFieldsHTML += `
      <p>
        <b>${key}:</b> ${formData[key] ?? ""}
      </p>
    `;
  });

  // Prepare image section
  let imagesHTML = "";

  if (includeImages && images?.length > 0) {

    images.forEach((img: any) => {

      const uri = img?.uri || img;

      imagesHTML += `
        <div style="margin-top:10px">
          <img src="${uri}" width="200"/>
        </div>
      `;

    });

  }

  const html = `
    <h1>Expense Claim</h1>

    <h2>Claim Details</h2>

    ${formFieldsHTML}

    ${
      includeImages
        ? `<h2>Receipts</h2>${imagesHTML}`
        : ""
    }
  `;

  const options = {
    html,
    fileName: "ExpenseClaim",
    directory: "Documents"
  };

  const file = await RNHTMLtoPDF.convert(options);

  return file.filePath;
};