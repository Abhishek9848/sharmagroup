import toast from "react-hot-toast";

const preview = async (data: string, fileName: string) => {
  try {
    if (!data) {
      toast.error("Failed to load invoice file");
      return;
    }

    // Convert Base64 to Blob
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create URL
    const fileURL = URL.createObjectURL(blob);

    // Open PDF in a new tab
    const newWindow = window.open(fileURL, "_blank");
    if (newWindow) {
      // Wait briefly and set the title
      setTimeout(() => {
        newWindow.document.title = fileName.endsWith(".pdf")
          ? fileName
          : `${fileName}.pdf`;
      }, 500);
    } else {
      toast.error("Popup blocked — please allow popups for this site");
    }
  } catch (error: any) {
    const message = error.response?.data?.message || "Internal server error";
    toast.error(message);
  }
};

export default preview;
