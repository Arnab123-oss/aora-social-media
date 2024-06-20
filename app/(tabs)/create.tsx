import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/apperite";
import { UseGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const { user } = UseGlobalContext();
  const [form, setForm] = useState({
    title: "",
    prompt: "",
    thumbnail: null,
    video: null,
  });
  const [uploading, setUploading] = useState(false);
  const submit = async () => {
    if (
      form.prompt === "" ||
      form.title === "" ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  const openPicker = async (selectType: any) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/*"] : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
    // else {
    //   setTimeout(() => {
    //     Alert.alert("Document picked", JSON.stringify(result, null, 2));
    //   }, 100);
    // }
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, height: "100%" }}>
      <ScrollView style={{ paddingHorizontal: 16, marginVertical: 24 }}>
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins-SemiBold",
            fontSize: 24,
            lineHeight: 32,
          }}
        >
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title...."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={{ marginTop: 40 }}
        />

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#F5F5F5",
              fontFamily: "Poppins-Medium",
            }}
          >
            {" "}
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{
                  width: "100%",
                  height: 250,
                  borderRadius: 16,
                  marginTop: 10,
                }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 140,
                  backgroundColor: "#1E1E2D",
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderWidth: 2,
                    borderColor: Colors.secondary[100],
                    borderStyle: "dashed",
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.upload}
                    style={{
                      resizeMode: "contain",
                      width: "50%",
                      height: "50%",
                    }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#F5F5F5",
              fontFamily: "Poppins-Medium",
            }}
          >
            {" "}
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={{
                  width: "100%",
                  height: 256,
                  resizeMode: "cover",
                  marginTop: 10,
                  borderRadius: 16,
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 60,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  backgroundColor: "#1E1E2D",
                  marginTop: 10,
                }}
              >
                <Image
                  source={icons.upload}
                  style={{
                    resizeMode: "contain",
                    width: "40%",
                    height: "40%",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 20,
                    color: "#F5F5F5",
                    fontFamily: "Poppins-Medium",
                    marginTop: 8,
                  }}
                >
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={{ marginTop: 20 }}
        />

        <CustomButton
          handlePress={submit}
          title="Submit & Publish"
          containerStyles={{ marginTop: 20 }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
