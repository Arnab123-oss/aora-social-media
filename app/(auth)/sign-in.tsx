import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

// Get the height of the viewport
const { height: viewportHeight } = Dimensions.get("window");

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmmitting, setIsSubmmitting] = useState(false);

  const Submit = () => {
    console.warn("Log IN");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.textStyle}>Log in to Aora</Text>
          <FormField
            title="Email"
            // placeholder="Please Enter a valid email address"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formStyle}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            // placeholder="Please Enter a valid password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formStyle}
          />
          <CustomButton
            title="Sign in"
            handlePress={Submit}
            containerStyles={styles.buttonStyle}
            isLoading={isSubmmitting}
          />

          <View style={styles.lastSection}>
            <Text
              style={{
                fontSize: 18,
                color: "#CDCDE0",
                lineHeight: 28,
                fontFamily: "Poppins-Regular",
              }}
            >
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={{
                fontSize: 18,
                color: Colors.secondary.DEFAULT,
                lineHeight: 28,
                fontFamily: "Poppins-Regular",
              }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: "100%",
  },
  mainContainer: {
    display: "flex",
    paddingRight: 16,
    paddingLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    width: "100%",
    minHeight: viewportHeight * 0.9,
    height: "100%",
  },
  logo: {
    width: 115,
    height: 35,
    resizeMode: "contain",
  },
  textStyle: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Poppins-SemiBold",
    marginTop: 40,
    color: "#ffffff",
  },
  formStyle: {
    marginTop: 28,
  },
  buttonStyle: {
    marginTop: 20,
  },
  lastSection: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    gap: 8,
    justifyContent: "center",
  },
});

export default SignIn;
