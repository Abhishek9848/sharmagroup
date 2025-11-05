import toast from "react-hot-toast";

const download = async (data: string, fileName: string) => {
    try {
        const base64Data = data.replace(/^data:application\/pdf;base64,/, "");
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "invoice.pdf";
      link.click();
      URL.revokeObjectURL(link.href);
      } catch (error: any) {
        console.error("Error while downloading invoice:", error);
        const message = error.response?.data?.message || "Internal server error";
        toast.error(message);
      }
    };

  export default download