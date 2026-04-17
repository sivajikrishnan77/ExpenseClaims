import Share from "react-native-share";

export const shareFiles = async (
  pdfPath: string,
  images: any[],
  includeImages: boolean
) => {
  try {
    // ✅ Ensure clean file:// prefix
    const cleanPath = (uri: string): string => {
      const stripped = uri.startsWith("file://") 
        ? uri.slice(7) 
        : uri;
      return `file://${stripped}`;
    };

    const pdfUrl = cleanPath(pdfPath);
    console.log("Sharing PDF:", pdfUrl);

    if (includeImages) {
      await Share.open({
        url: pdfUrl,
        type: "application/pdf",
        title: "Share Expense Claim",
        failOnCancel: false,
      });
    } else {
      const imageUrls = images.map((img: any) => {
        const uri: string = img?.uri || img;
        return cleanPath(uri);
      });

      console.log("Sharing URLs:", [pdfUrl, ...imageUrls]);

      await Share.open({
        urls: [pdfUrl, ...imageUrls],
        title: "Share Expense Claim",
        failOnCancel: false,
      });
    }

  } catch (error: any) {
    console.log("Share failed:", error);
  }
};