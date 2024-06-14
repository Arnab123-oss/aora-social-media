import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/apperite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch, loading } = useAppwrite(() => searchPosts(query));


  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={styles.main}>
    
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
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 20,
                  color: "white",
                  fontFamily: "Poppins-Medium",
                }}
              >
                Search Results
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  lineHeight: 32,
                  color: "white",
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {query}
              </Text>

              <SearchInput initialQuery={query} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search queary"
            />
          )}
        />
     
      <Text style={{ color: "white" }}>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary,
    // height: "100%",
    flex: 1,
  },
});

export default Search;
