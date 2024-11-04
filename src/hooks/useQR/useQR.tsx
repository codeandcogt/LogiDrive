import { DataScanner, ValuesReturn } from "@/src/interface";
import { patch, post } from "@/src/service";
import { useAcceptanceStore, useSessionStore } from "@/src/store";
import { useRouter } from "expo-router";

export const useQR = () => {
  const { trip, acceptance, setData } = useAcceptanceStore();
  const router = useRouter();
  const { session } = useSessionStore();

  const handleBack = () => {
    router.replace("/map");
  };

  const handleBackScanner = () => {
    router.replace("/scanner");
  };

  const handleAccept = () => {
    if (trip === null) return;
    createTrip(trip);
  };

  const createTrip = async (data: DataScanner) => {
    try {
      const response = await post<ValuesReturn>("api/LogTrip", data, session?.token);
      if (response.code === 200) {
        console.log(response, "response trip");
        setData(response.data)
        changeStatus();
        router.replace("/scanner");
      }
    } catch (error) {}
  };

  const changeStatus = async () => {
    try {
      const response = await patch<any>(
        `api/VehicleAssignment/StatusTrip/${acceptance?.idVehicleAssignment}/${!acceptance?.statusTrip}`,
        session?.token
      );
      console.log(response, "changes status");
    } catch (error) {
      throw Error;
    }
  };

  return { handleBack, handleBackScanner, handleAccept };
};
