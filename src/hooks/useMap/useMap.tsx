import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { patch, put } from "@/src/service";
import { tracking } from "@/src/interface";
import { useAcceptanceStore, useSessionStore } from "@/src/store";

export const useMap = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const {data}= useAcceptanceStore()
  const {session}= useSessionStore()

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
  
      const watchOptions = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 30000, 
        distanceInterval: 0, 
      };
  
      const subscription = await Location.watchPositionAsync(
        watchOptions,
        async (location) => {
          setLocation(location);
          
          // Crear objeto tracking con los datos de ubicación
          const trackingData: tracking = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
  
          // Enviar datos al servidor
          try {
            await fetchTrip(trackingData);
          } catch (error) {
            console.error("Error sending tracking data:", error);
          }
        }
      );
  
      return () => {
        subscription.remove();
      };
    })();
  }, []);

  const fetchTrip = async(trip: tracking)=>{
    try{
      if(data === null) return;
      const response = await put<any>(`api/LogTracking/${data.idTracking}`, trip, session?.token)
      console.log(response, "response de tracking")
    }catch(error){
      throw Error
    }
  }

  const handleBackPress = () => {
    router.replace("/tracking");
  };

  const handleDetail = () => {
    router.replace("/qr");
  };

  return { handleBackPress, location, errorMsg , handleDetail};
};
