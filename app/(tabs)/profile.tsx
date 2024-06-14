import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/apperite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { UseGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = UseGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  // console.log(user.avatar);

  const logOut = async() => {

     await signOut()
     setUser(null)
     setIsLoggedIn(false)
     router.replace('/sign-in')
  };

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={posts}
        renderItem={(item) => <VideoCard video={item} />}
        keyExtractor={(item: any) => item.$id}
        ListHeaderComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              marginBottom: 48,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 40,
              }}
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: 120,
                height: 120,
                borderWidth: 2,
                borderColor: Colors.secondary[200],
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: user?.avatar }}
                style={{
                  width: "90%",
                  height: "90%",
                  resizeMode: "contain",
                  borderRadius: 100,
                }}
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles={{ marginTop: 20 }}
              titleStyles={{ fontSize: 18, lineHeight: 28 }}
              />

            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <InfoBox
                title={posts.length||0}
                subtitle="Posts"
                containerStyles={{ marginRight: 40 }}
                titleStyles={{ fontSize: 20, lineHeight: 28 }}
              />
              <InfoBox
                title="102K"
                 subtitle="Followers"
                titleStyles={{ fontSize: 20, lineHeight: 28 }}
              />
            </View>
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

export default Profile;
