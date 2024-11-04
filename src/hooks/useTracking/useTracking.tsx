import { Acceptance } from "@/src/interface";
import { get } from "@/src/service";
import { useAcceptanceStore, useSessionStore } from "@/src/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useTracking = () => {
  const { session } = useSessionStore();
  const { setAcceptance, setScanner } = useAcceptanceStore();
  const router = useRouter();

  const fetchAcceptance = async () => {
    try {
      const response = await get<Acceptance[]>(
        `api/VehicleAssignment/ByUserWithDetails/${session?.nameidentifier}/${2}`,
        session?.nameidentifier
      );
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery<
    Acceptance[],
    Error
  >({
    queryKey: ["VehicleAssignment-ByUserWithDetails"],
    queryFn: fetchAcceptance,
    staleTime: 5000,
  });

  const handleAccepte = (data: Acceptance) => {
    setAcceptance(data);
    setScanner(false);
    router.replace("/map");
  };

  return { refetch, data, isLoading, isError, error, handleAccepte };
};
