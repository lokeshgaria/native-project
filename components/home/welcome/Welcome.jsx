import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
 
const Welcome = ({searcTerm,setSearch,handleClick}) => {
  const router = useRouter();
  const data = ["Full-time", "Part-time", "Contractor"];

  const [activeJobType, setactiveJobType] = useState("Full-time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello User</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searcTerm}
            onChangeText={(text) => setSearch(text)}
            placeholder="What are you looking for?"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={()=>{
              setactiveJobType(item);
              router.push(`/search/${item}`)
            }}
            style={styles.tab(activeJobType, item)}>
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap:SIZES.small}}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
