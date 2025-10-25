import toast from "react-hot-toast";

const preview = async (data: string, fileName: string) => {
    try {
      if (data) {
        // Convert Base64 to Blob
        const byteCharacters = atob(data);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type:'application/pdf' });
  
        // Create URL and open in new tab
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, fileName);
      } else {
        toast.error("Failed to load invoice file");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Internal server error";
      toast.error(message);
    }
  };

  export default preview