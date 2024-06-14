import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

interface TrendingFieldProps {
  posts: any;
}

const zoomIn = {
  from: {
    scale: 0.8,
  },
  to: {
    scale: 1,
  },
};

const zoomOut = {
  from: {
    scale: 1,
  },
  to: {
    scale: 0.8,
  },
};

type ItemProps = { activeItem: any; item: any; playingItem: string | null; setPlayingItem: (id: string | null) => void; };

const TrendingItem = ({ activeItem, item, playingItem, setPlayingItem }: ItemProps) => {
  const play = playingItem === item.$id;

  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video 
          source={{ uri: item.video }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            width: 210,
            height: 350,
            marginHorizontal: 10,
            borderRadius: 35,
            // elevation: 10,
          }}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlayingItem(null);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => setPlayingItem(item.$id)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
              width: 210,
              height: 350,
              overflow: "hidden",
              marginHorizontal: 10,
              borderRadius: 35,
              elevation: 10,
            }}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={{
              width: 48,
              aspectRatio: 1,
              position: "absolute",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingFieldProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} playingItem={playingItem} setPlayingItem={setPlayingItem} />
      )}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;
