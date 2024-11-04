import { CameraScreen } from '@/src/screen/cameraScreen/CameraScreen';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Camera() {
  const handlePhotoTaken = (uri: string) => {
    console.log('Foto tomada:', uri);
    // Aquí puedes hacer algo con la URI de la foto
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CameraScreen onPhotoTaken={handlePhotoTaken} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});