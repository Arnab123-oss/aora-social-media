import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts } from "@/lib/apperite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View>
    <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
  </View>
);

const Home = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  const { data: posts, refetch, loading } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    console.warn("fuch");

    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  // console.log(posts.length);
  // const posts = [];

  

  return (
    <SafeAreaView style={styles.main}>
      <View style={{ flex:1}}>
        <FlatList
          data={posts}
          renderItem={(item) => <VideoCard video={item} />}
          keyExtractor={(item: any) => item.$id}
          ListHeaderComponent={() => (
            <View
              style={{
                display: "flex",
                paddingLeft: 16,
                paddingRight: 16,
                marginTop: 24,
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 24,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 20,
                      color: "white",
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Welcome Back
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      lineHeight: 32,
                      color: "white",
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Arnab
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall}
                    style={{ width: 32, height: 40 }}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />
              <View style={{ width: "100%", flex: 1, paddingVertical: 22 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontFamily: "Poppins-Regular",
                    marginBottom: 12,
                  }}
                >
                  Latest Videos
                </Text>

                <Trending posts={DATA ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to upload a video"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <Text style={{ color: "white" }}>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary,
    height: "100%",
    flex:1
  },
});

export default Home;
