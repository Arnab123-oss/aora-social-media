import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: any;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={[{ marginTop: 8 }, otherStyles]}>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          color: "#F3F4F6",
          fontFamily: "Poppins-Medium",
          paddingLeft:10
        }}
      >
        {title}
      </Text>
      <View style={[styles.formContainer, isFocused && styles.focusedInput]}>
        <TextInput
          style={styles.textInputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 24, height: 24, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    height: 64,
    display: "flex",
    flexDirection:"row",
    paddingHorizontal: 20,
    backgroundColor: "#1E1E2D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232533",
    marginTop:5
  },
  focusedInput: {
    borderColor: Colors.secondary[100],
  },
  textInputStyle: {
    display: "flex",
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 24,
    // backgroundColor:"red",
    width: "100%",
    // position:"absolute",
    height: "100%",
  },
});

export default FormField;
