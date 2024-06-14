import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { UseGlobalContext } from "@/context/GlobalProvider";

// Get the height of the viewport
const { height: viewportHeight } = Dimensions.get("window");

const Welcome = () => {
  const { isLoading, isLoggedIn } = UseGlobalContext();

  if (!isLoading && isLoggedIn){
    return <Redirect href="/home" />;
  } 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <Image source={images.logo} style={styles.logo} />
          <Image
            source={images.cards}
            style={{ width: "100%", maxWidth: 380, height: 290 }}
          />
          <View style={{ position: "relative", marginTop: 20 }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 36,
                fontWeight: 700,
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={{ color: Colors.secondary[200] }}>Aora</Text>
            </Text>

            <Image
              source={images.path}
              style={{
                width: 136,
                height: 15,
                position: "absolute",
                right: -32,
                bottom: -8,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 28,
              fontSize: 14,
              lineHeight: 20,
              textAlign: "center",
              color: "#F3F4F6",
            }}
          >
            {" "}
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={styles.buttonStyle}
          />
          {/* <Link href="/home" style={{ color: "blue" }}>
            Go Home
          </Link> */}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: "100%",
  },
  mainContainer: {
    width: "100%",
    minHeight: viewportHeight * 0.8, //80vh equivalent
    display: "flex",
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  buttonStyle: {
    width: "100%",
    marginTop: 20,
  },
});

export default Welcome;
