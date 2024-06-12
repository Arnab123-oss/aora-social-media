import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { icons } from "@/constants";

interface Post {
  title: string;
}

interface VideoCardProps {
  video: any;
}

const VideoCard: React.FC<VideoCardProps> = (video) => {
    console.log("video",video.video.item.title);

  const [play, setPlay] = useState(false);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        // marginBottom: "100%",
      }}
    >
      <View style={{ flexDirection: "row", gap: 3, alignItems: "flex-start",borderWidth:1,
            borderColor:"red" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors.secondary.DEFAULT,
            }}
          >
            <Image
              source={{ uri: video.video.item.creator.avatar }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                resizeMode: "cover",
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginLeft: 12,
              rowGap: 4,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins-SemiBold",
                fontSize: 14,
                lineHeight: 18,
              }}
              numberOfLines={1}
            >
              {video.video.item.title}
            </Text>
            <Text
              style={{
                color: "#F5F5F5",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                lineHeight: 16,
              }}
              numberOfLines={1}
            >
              {video.video.item.creator.username}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 8 }}>
          <Image
            source={icons.menu}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
        </View>
      </View>
      
      {play ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          style={{
            width: "100%",
            height: "60%",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            borderRadius:12,
            marginTop:12,
            borderWidth:1,
            borderColor:"red"
          }}
        >
          <Image
            source={{ uri: video.video.item.thumbnail }}
            style={{
              width: "100%",
              height: "100%",
            //   marginTop: 12,
              borderRadius: 12,
              resizeMode: "cover",
            }}
          />
          
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
