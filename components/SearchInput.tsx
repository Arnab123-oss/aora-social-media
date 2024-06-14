import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = (initialQuery: any) => {
  // const [showPassword, setShowPassword] = useState(false);
  // console.log(initialQuery)
  
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || " ");
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
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="white"
        onChangeText={(e) => setQuery(e)}
        // secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query","Please input something to search results across database")
          }
          if(pathname.startsWith('/search')) router.setParams({query})

          else router.push(`/search/${query}`) 
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 22, height: 22 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    height: 64,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#616161",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232533",
    marginTop: 5,
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
