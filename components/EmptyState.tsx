import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={images.empty}
        style={{ width: 270, height: 215, resizeMode: "contain" }}
      />
      <Text
        style={{
          fontSize: 16,
          lineHeight: 20,
          color: "white",
          fontFamily: "Poppins-Medium",
        }}
      >
        {subtitle}
      </Text>
      <Text
        style={{
          fontSize: 24,
          lineHeight: 32,
          color: "white",
          fontFamily: "Poppins-SemiBold",
          marginVertical: 8,
        }}
      >
        {title}
      </Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles={{width:"100%"}}
      />
    </View>
  );
};

export default EmptyState;
