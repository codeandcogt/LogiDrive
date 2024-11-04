import { ListVehicle } from "@/src/interface";
import { post } from "@/src/service";
import { useSessionStore } from "@/src/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";

export const useHomeGarita = () => {
  const { session } = useSessionStore();
  const router = useRouter();

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };

  const fetchData = async () => {
    try {
      const response = await post<ListVehicle[]>(
        "api/VehicleAssignment/ByDateWithStatusUpdate",
        getCurrentDate(),
        session?.token
      );
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery<
    ListVehicle[],
    Error
  >({
    queryKey: ["list-vehicle"],
    queryFn: fetchData,
    staleTime: 5000,
  });

  const handleClick = () => {
    router.replace("/tracking");
  };

  return { data, isError, isLoading, error, session, refetch, handleClick };
};
