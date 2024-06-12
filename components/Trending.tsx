import { View, Text, FlatList } from "react-native";
import React from "react";
interface Post {
    id: string; // Assuming each post has an id property
    title: string;
    // Add other properties if needed
  }

interface TrendingFieldProps {
  posts:Post[];
}

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View>
    <Text style={{color:"white",fontSize:20}}>{title}</Text>
  </View>
);

const Trending: React.FC<TrendingFieldProps> = ({ posts }) => {
  return <FlatList 
  data={posts}
  renderItem={({ item }) => <Item title={item.title} />}
  keyExtractor={(item) => item.id}
  horizontal
  />
};

export default Trending;
