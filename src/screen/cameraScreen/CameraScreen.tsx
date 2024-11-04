import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ButtonBack } from "@/src/components";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface CameraScreenProps {
  onPhotoTaken?: (uri: string) => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({ onPhotoTaken }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<string[]>([]);
  const [isMediaLibraryReady, setIsMediaLibraryReady] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const handleBackPress = () => {
    router.replace("/inspection");
  };

  React.useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then(({ granted }) => {
      setIsMediaLibraryReady(granted);
    });
  }, []);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Cargando permisos de cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos tu permiso para usar la cámara
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.text}>Dar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleGallery = () => {
    setShowGallery(!showGallery);
  };

  const handleClick = () => {
    router.replace("/upload")
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });

      if (!photo) {
        console.error("No se pudo capturar la foto");
        return;
      }

      if (isMediaLibraryReady) {
        try {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
        } catch (error) {
          console.error("Error saving to library:", error);
        }
      }

      setPhotos((prevPhotos) => [...prevPhotos, photo.uri]);

      if (onPhotoTaken) {
        onPhotoTaken(photo.uri);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.roundButton]} 
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.captureButton]}
            onPress={takePicture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.roundButton]} 
            onPress={toggleGallery}
          >
            <Ionicons name="images" size={30} color="white" />
          </TouchableOpacity>
          
        </View>

        {showGallery && (
          <ScrollView
            horizontal
            style={styles.gallery}
            contentContainerStyle={styles.galleryContent}
          >
            {photos.map((photoUri, index) => (
              <Image
                key={`photo-${index}`}
                source={{ uri: photoUri }}
                style={styles.thumbnail}
              />
            ))}
          </ScrollView>
        )}
      </CameraView>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.headerContainer}>
          <ButtonBack onPress={handleBackPress} />
          <TouchableOpacity 
              style={[styles.button, styles.checkButton]} 
              onPress={handleClick}
            >
              <AntDesign name="check" size={20} color="white" />
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    borderColor: 'white',
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    borderColor: 'white',
    marginRight:15,
    marginTop:5
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 4,
    borderColor: 'white',
    padding: 3,
  },
  captureButtonInner: {
    flex: 1,
    width: '100%',
    borderRadius: 35,
    backgroundColor: 'white',
  },
  permissionButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  gallery: {
    position: "absolute",
    bottom: 150,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  galleryContent: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
});