import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";

interface NavbarProps {
  path: any;
}

export const Navbar: React.FC<NavbarProps> = ({ path }) => {
  const router = useRouter();
  
  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace(path)}
      >
        <AntDesign name="arrowleft" size={24} color="#011C26" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#011C26',
    marginLeft: 4,
    fontWeight: '500',
  },
});