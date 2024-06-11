import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle | ViewStyle[];
  textStyles?: TextStyle | TextStyle[];
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false,
}) => {
  
  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: Colors.secondary.DEFAULT,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 62,
      borderRadius: 10,
      opacity: isLoading ? 0.5 : 1,
    },
    textStyle: {
      color: Colors.primary,
      fontFamily: "Poppins-SemiBold",
      fontSize: 18,
      lineHeight: 28,
    },
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.buttonContainer, containerStyles]}
      disabled={isLoading}
    >
      <Text style={[styles.textStyle,textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
