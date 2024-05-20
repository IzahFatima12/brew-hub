import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../config/SPACING";
import colors from "../config/colors";
import SearchField from "../components/SearchField";
import Categories from "../components/Categories";
import coffees from "../config/coffees";

const avatar = require("../assets/avatar.jpg");
const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (id) => {
    setActiveCategoryId(id);
  };

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesCategory =
      activeCategoryId === null || coffee.categoryId === activeCategoryId;
    const matchesSearch = coffee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: SPACING }}>
        <View style={styles.topContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: SPACING,
                overflow: "hidden",
                width: SPACING * 4,
                height: SPACING * 4,
              }}
            >
              <BlurView
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="menu"
                  size={SPACING * 2.5}
                  color={colors.secondary}
                />
              </BlurView>
            </TouchableOpacity>
            <View
              style={{
                width: SPACING * 4,
                height: SPACING * 4,
                overflow: "hidden",
                borderRadius: SPACING,
              }}
            >
              <BlurView style={{ height: "100%", padding: SPACING / 2 }}>
                <Image
                  style={{ height: "100%", width: "100%", borderRadius: SPACING }}
                  source={avatar}
                />
              </BlurView>
            </View>
          </View>
          <View style={{ width: "80%", marginVertical: SPACING * 2 }}>
            <Text
              style={{
                color: colors.brown,
                fontSize: 23,
                fontWeight: "bold",
              }}
            >
              Best Coffee in town
            </Text>
          </View>
          <SearchField onChangeText={setSearchQuery} style={{ marginTop: -SPACING }} />
        </View>
        <Image
          style={{
            alignSelf: "center",
          }} 
          source={require("../assets/images/Banner.png")}
        />
        <Categories onChange={handleCategoryChange} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {filteredCoffees.map((coffee) => (
            <View
              key={coffee.id}
              style={{
                width: width / 2 - SPACING * 2,
                marginBottom: SPACING,
                borderRadius: SPACING * 2,
                overflow: "hidden",
              }}
            >
              <BlurView tint="dark" intensity={95} style={{ padding: SPACING, backgroundColor: 'rgba(196, 164, 132,0.6)' }}>
                <TouchableOpacity
                  style={{ height: 150, width: "100%" }}
                  onPress={() =>
                    navigation.navigate("CoffeeDetails", { coffee })
                  }
                >
                  <Image
                    source={coffee.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: SPACING * 2,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      borderBottomStartRadius: SPACING * 3,
                      borderTopEndRadius: SPACING * 2,
                      overflow: "hidden",
                    }}
                  >
                    <BlurView
                     // tint="dark"
                      intensity={70}
                      style={{ flexDirection: "row", padding: SPACING - 2 }}
                    >
                      <Ionicons
                        style={{ marginLeft: SPACING / 2 }}
                        name="star"
                        color={colors.primary}
                        size={SPACING * 1.7}
                      />
                      <Text
                        style={{ color: colors.white, marginLeft: SPACING / 2 }}
                      >
                        {coffee.rating}
                      </Text>
                    </BlurView>
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.white,
                    fontWeight: "600",
                    fontSize: SPACING * 1.7,
                    marginTop: SPACING,
                    marginBottom: SPACING / 2,
                  }}
                >
                  {coffee.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.secondary, fontSize: SPACING * 1.2 }}
                >
                  {coffee.included}
                </Text>
                <View
                  style={{
                    marginVertical: SPACING / 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: colors.primary,
                        marginRight: SPACING / 2,
                        fontSize: SPACING * 1.6,
                      }}
                    >
                      $
                    </Text>
                    <Text
                      style={{ color: colors.white, fontSize: SPACING * 1.6 }}
                    >
                      {coffee.price}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      padding: SPACING / 2,
                      borderRadius: SPACING,
                    }}
                  >
                    <Ionicons
                      name="add"
                      size={SPACING * 2}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'rgba(196, 164, 132, 0.6)', // Light brown color
    padding: SPACING,
    borderRadius: SPACING,
  },
});
