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
    title?: string;
    value?: string;
    placeholder?: string;
    handleChangeText?: (text: string) => void;
    otherStyles?: any;
    [key: string]: any;
  }
  
  const SearchInput: React.FC<FormFieldProps> = ({
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
     
        <View style={[styles.formContainer, isFocused && styles.focusedInput]}>
          <TextInput
            style={styles.textInputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            placeholder="Search for a video topic"
            placeholderTextColor="#E0E0E0"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
          />
  
         <TouchableOpacity>
            <Image source={icons.search} style={{width:22,height:22}} resizeMode="contain"/>
         </TouchableOpacity>
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
      backgroundColor: "#616161",
      opacity:0.5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#232533",
      marginTop:5,
      
    },
    focusedInput: {
      borderColor: Colors.secondary[100],
    },
    textInputStyle: {
      display: "flex",
      color: "white",
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      lineHeight: 24,
      width: "100%",
      height: "100%",
    },
  });
  
  export default SearchInput;
  