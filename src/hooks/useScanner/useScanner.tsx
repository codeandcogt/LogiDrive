import { Acceptance, DataScanner } from '@/src/interface';
import { get, post } from '@/src/service';
import { useAcceptanceStore, useSessionStore } from '@/src/store';
import { useQuery } from '@tanstack/react-query';
import { BarcodeScanningResult, Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'

export const useScanner = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const { session } = useSessionStore()
    const [qrData, setQrData] = useState<DataScanner | null>(null);
    const {setAcceptance, setScanner, setTrip}= useAcceptanceStore()
    const router = useRouter();


    React.useEffect(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
      if (scanned) return;
      setScanned(true);
      
      try {
        const parsedData: DataScanner = JSON.parse(data);
        alert(`Código escaneado: ${parsedData.activityType} - ${parsedData.idVehicleAssignment}`);
        setQrData(parsedData);
      } catch (error) {
        alert('Error al leer el QR');
        console.error(error);
      }
    };
  
    const handleReset = () => {
      setScanned(false);
    };

    const { data: acceptance, isLoading, error } = useQuery({
      queryKey: ['acceptance', qrData?.idVehicleAssignment],
      queryFn: async () => {
        if (!qrData?.idVehicleAssignment) return null;
        
        const response = await get<Acceptance>(
          `api/VehicleAssignment/${qrData.idVehicleAssignment}`, 
          session?.token
        );

        // Si la respuesta es exitosa, llamamos a handleDetail
        if (response && response.code === 200) {
          handleDetail(response.data);
        }

        return response;
      },
      enabled: !!qrData?.idVehicleAssignment && !!session?.token,
    });


    const handleDetail=(item: Acceptance)=>{
      console.log(item)
      setAcceptance(item)
      setScanner(true)
      setTrip(qrData)
      router.replace("/qr")
    }

    return {
      handleReset, 
      handleBarCodeScanned, 
      scanned, 
      hasPermission,
      setHasPermission,
      acceptance,
      isLoading,
      error
    }
}