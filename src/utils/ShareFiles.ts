import Share from "react-native-share";

export const shareFiles = async (
  pdfPath: string,
  images: any[],
  includeImages: boolean
) => {
  try {
    // ✅ On Android, Share needs base64 data URIs OR content:// URIs
    // react-native-share handles this if you pass the file:// path
    // but we must ensure the path is clean (no double file://)
    const cleanPath = (uri: string) =>
      uri.startsWith("file://") ? uri : `file://${uri}`;

    const pdfUrl = cleanPath(pdfPath);

    if (includeImages) {
      // Images embedded in PDF — share PDF only
      await Share.open({
        url: pdfUrl,
        type: "application/pdf",
        title: "Share Expense Claim",
        failOnCancel: false, // ✅ Prevents error on cancel
      });
    } else {
      // Share PDF + images separately
      const imageUrls = images.map((img: any) => {
        const uri = img?.uri || img;
        return cleanPath(uri);
      });

      await Share.open({
        urls: [pdfUrl, ...imageUrls],
        title: "Share Expense Claim",
        failOnCancel: false, // ✅ Prevents error on cancel
      });
    }

  } catch (error: any) {
    console.log("Share failed:", error);
  }
};