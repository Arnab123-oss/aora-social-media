import { View, Text, ViewStyle, TextStyle } from "react-native";
import React from "react";

interface InfoBoxProps {
  title: any;
  subtitle?: string;
  containerStyles?: ViewStyle | ViewStyle[];
  titleStyles?: TextStyle | TextStyle[];
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View style={containerStyles}>
      <Text
        style={[
          {
            color: "white",
            textAlign: "center",
            fontFamily: "Poppins-SemiBold",
          },
          titleStyles,
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          {
            color: "#F5F5F5",
            textAlign: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 12,
            lineHeight: 20,
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
