import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  CompassIcon,
  DocumentEditIcon,
  HomeIcon,
  MailIcon,
  MatrixGridIcon,
} from "../../atoms";
import { useSessionStore } from "@/src/store";

interface TabBarIconProps {
  props: {
    state: {
      index: number;
      routeNames: string[];
    };
    navigation: any;
  };
}

export function TabBar({ props }: TabBarIconProps) {
  const { state, navigation } = props;
  const {session}= useSessionStore()

  const icons = [
    {
      name: "home",
      icon: () => <HomeIcon fill={state.index === 0 ? "#000000" : "#FFFFFF"} />,
      label: "Home",
    },
    {
      name: "scanner",
      icon: () => (
        <MatrixGridIcon stroke={state.index === 1 ? "#000000" : "#FFFFFF"} />
      ),
      label: "Scanner",
    },
    {
      name: "inspection",
      icon: () => (
        <DocumentEditIcon fill={state.index === 2 ? "#000000" : "#FFFFFF"} />
      ),
      label: "Inspection",
    },
    {
      name: "tracking",
      icon: () => (
        <CompassIcon fill={state.index === 3 ? "#000000" : "#FFFFFF"} />
      ),
      label: "Tracking",
    },
    {
      name: "booking",
      icon: () => <MailIcon stroke={state.index === 4 ? "#000000" : "#FFFFFF"} />,
      label: "Booking",
    },
  ];

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {icons.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = state.index === index;

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.tab}
              onPress={() => navigation.navigate(item.name)}
            >
              <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
                <IconComponent />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop:12
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#000000",
    borderRadius: 40,
    height: 54,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  activeIconWrapper: {
    backgroundColor: 'white',
    borderRadius: 50
  },
  scanButtonWrapper: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -27 }],
    top: -20, 
  },
  scanButton: {
    backgroundColor: "#FF9500",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});