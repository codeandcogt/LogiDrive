import { format } from "date-fns";

export const FormatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), "dd MMM yyyy HH:mm");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };