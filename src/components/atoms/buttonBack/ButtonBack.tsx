import React from "react";
import { 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  StatusBar 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface CircularButtonProps {
  onPress: () => void;
  icon?: keyof typeof AntDesign.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
}

export const ButtonBack: React.FC<CircularButtonProps> = ({
  onPress,
  icon = "arrowleft",
  size = 40,
  color = "#011C26",
  style,
  containerStyle,
  iconSize = 24
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
    >
      <View style={[
        styles.buttonContainer, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2 
        },
        containerStyle
      ]}>
        <AntDesign name={icon} size={iconSize} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 16,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 16,
  },
  buttonContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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