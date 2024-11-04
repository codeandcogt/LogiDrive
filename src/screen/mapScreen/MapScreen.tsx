import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ButtonBack, DateCard } from "@/src/components";
import { useMap } from "@/src/hooks";
import { useAcceptanceStore } from "@/src/store";
import { FormatDate } from "@/src/lib";

export const MapScreen = () => {
  const { errorMsg, location, handleBackPress, handleDetail } = useMap();
  const { acceptance } = useAcceptanceStore();

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            description="Estoy aquí"
          />
        </MapView>
      )}

      <SafeAreaView style={styles.overlay}>
        <ButtonBack onPress={handleBackPress} />
      </SafeAreaView>

      {/* Card en la parte inferior */}
      <View style={styles.drawer}>
        <DateCard
          title="Detalles de tu Viaje – ¡Buen Viaje!"
          startDate={FormatDate(acceptance?.startDate || "")}
          endDate={FormatDate(acceptance?.endDate || "")}
          onButtonPress={handleDetail}
          statusTrip={acceptance?.statusTrip}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderColor: "#676f6f",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    alignItems: "stretch",
  },
});
