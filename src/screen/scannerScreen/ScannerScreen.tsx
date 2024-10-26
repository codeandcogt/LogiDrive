import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraView, BarcodeScanningResult } from 'expo-camera';
import { MatrixGridIcon } from '@/src/components';

export const ScannerScreens = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string[]>([]);

  React.useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    const newData = scanningResult.data;
    if (!scannedData.includes(newData)) {
      setScannedData(prev => [...prev, newData]);
      alert(`Código escaneado: ${newData}`);
    }
    // Automáticamente permite escanear el siguiente código
    setScanned(false);
  };

  const handleReset = () => {
    setScanned(false);
    setScannedData([]);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Sin acceso a la cámara</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        >
          <Text style={styles.permissionButtonText}>Permitir Cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleReset}
          >
            <MatrixGridIcon stroke='#FFFFFF'/>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  resetButton: {
    position: 'absolute',
    bottom: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F25D27',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  permissionButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  permissionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});