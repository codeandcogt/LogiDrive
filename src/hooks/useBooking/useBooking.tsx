import { BookingDetail } from "@/src/interface";
import { get } from "@/src/service";
import { useSessionStore } from "@/src/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useBooking = () => {
  const router = useRouter();
  const { session } = useSessionStore();

  const handleAdd = () => {
    router.replace("/formBooking");
  };

  const fetchBooking = async () => {
    try {
      const response = await get<BookingDetail[]>(
        `api/LogReservation/user/${session?.nameidentifier}`,
        session?.token
      );

      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isLoading, isError, error } = useQuery<BookingDetail[], Error>({
    queryKey: ["booking-user"],
    queryFn: fetchBooking,
    staleTime: 5000,
  });

  return { handleAdd, data, isLoading, isError, error };
};
