import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useMap = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

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
        (location) => {
          setLocation(location);
        }
      );

      return () => {
        subscription.remove();
      };
    })();
  }, []);

  const handleBackPress = () => {
    router.replace("/tracking");
  };

  const handleDetail = () => {
    router.replace("/qr");
  };

  return { handleBackPress, location, errorMsg , handleDetail};
};
