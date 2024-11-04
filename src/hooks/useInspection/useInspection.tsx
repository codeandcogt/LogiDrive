import { Acceptance } from "@/src/interface";
import { get } from "@/src/service";
import { useSessionStore } from "@/src/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";

export const useInspection = () => {
  const { session } = useSessionStore();
  const router = useRouter();

  const fetchInspection = async () => {
    try {
      const response = await get<Acceptance[]>(
        "api/VehicleAssignment",
        session?.token
      );
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data } = useQuery<Acceptance[], Error>({
    queryKey: ["InpectionProps"],
    queryFn: fetchInspection,
    staleTime: 5000,
  });


  const handleCamera = ()=>{
    router.replace("/camera")
  }

  return { data , handleCamera};
};
