import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

interface Post {
  title: string;
}

interface VideoCardProps {
  video: any;
}

const VideoCard: React.FC<VideoCardProps> = (video) => {
  // console.log("video", video.video.item.title);

  const [play, setPlay] = useState(false);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        // height:400,
        // flex:1
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 3,
          alignItems: "flex-start",
        }}
      >
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
          <Video 
          source={{uri:video.video.item.video}}
            style={{
              // backgroundColor: 'rgba(255, 255, 255, 0.1)',
              width: "100%",
              aspectRatio:16/12,
              marginHorizontal: 10,
              borderRadius: 12,
              marginTop: 12,
              // elevation: 10,
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status:any)=>{
              if(status.didJustFinish){
                setPlay(false);
              }
  
            }}
          />
      ) : (
        <TouchableOpacity
          style={{
            width: "100%",
            // height: "70%",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            marginTop: 12,
            // borderWidth: 1,
            // borderColor: "red",
          }}
          activeOpacity={0.7}
           onPress={() => {
             setPlay(true);
           }}
        >
          <Image
            source={{ uri: video.video.item.thumbnail }}
            style={{
              width: "100%",
              // height: "100%",
              aspectRatio:16/12,
                // marginTop: 12,
              borderRadius: 12,
              resizeMode: "cover",
            }}
          />
          <Image source={icons.play} style={{
            width:48,
            aspectRatio:1,
            position:"absolute",
            resizeMode:"contain"
          }}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
