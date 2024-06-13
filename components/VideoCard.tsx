import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { icons } from "@/constants";

interface VideoCardProps {
  video: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: video.video.item.creator.avatar }}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {video.video.item.title}
            </Text>
            <Text style={styles.username} numberOfLines={1}>
              {video.video.item.creator.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <Image
            source={icons.menu}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.thumbnailContainer}
        onPress={() => setPlay(!play)}
      >
        <Image
          source={{ uri: video.video.item.thumbnail }}
          style={styles.thumbnail}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.secondary.DEFAULT,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 3,
    alignItems: "flex-start",
    width: '100%',
    justifyContent: "space-between",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 8,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  title: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 18,
  },
  username: {
    color: "#F5F5F5",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 16,
  },
  menuIcon: {
    paddingTop: 8,
  },
  thumbnailContainer: {
    width: "100%",
    height: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 12,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
});

export default VideoCard;
