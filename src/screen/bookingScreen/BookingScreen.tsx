import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useBooking } from "@/src/hooks";
import { ReservationCard } from "@/src/components";

export const BookingScreen = () => {
  const { handleAdd, isError, isLoading, data } = useBooking();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {data?.map((item, index) => (
          <ReservationCard
            key={`${item.idLogReservation}-${index}`}
            data={item}
          />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={handleAdd}
        activeOpacity={0.7}
      >
        <Icon 
          as={MaterialIcons}
          name="add"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#011C26",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
