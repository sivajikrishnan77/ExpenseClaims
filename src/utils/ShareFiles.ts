import Share from "react-native-share";

export const shareFiles = async (
  pdfPath: string,
  images: any[],
  includeImages: boolean
) => {

  try {

    if (includeImages) {

      await Share.open({
        url: `file://${pdfPath}`,
        type: "application/pdf"
      });

    } else {

      const imageUrls = images.map((img: any) => img.uri || img);

      await Share.open({
        urls: [`file://${pdfPath}`, ...imageUrls]
      });

    }

  } catch (error) {
    console.log("Sharing cancelled or failed:", error);
  }

};