import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: "#C4A484",
        }}
      >
        <View style={{ width }}>
          <View style={styles.topContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: SPACING,
                  overflow: "hidden",
                  width: SPACING * 4,
                  height: SPACING * 4,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Ionicons
                    name="menu"
                    size={SPACING * 2.5}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: SPACING * 4,
                  height: SPACING * 4,
                  overflow: "hidden",
                  borderRadius: SPACING,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    padding: SPACING / 2,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: SPACING,
                    }}
                    source={avatar}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: "80%", marginVertical: SPACING * 2 }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 30,
                  fontWeight: "bold",
                  fontFamily:'CedarvilleCursive-Regular',
                  textAlign: "center",
                }}
              >
                Best Coffee in town
              </Text>
            </View>
            <SearchField
              onChangeText={setSearchQuery}
              style={{ marginTop: -SPACING }}
            />
          </View>
          <Image
            style={{ alignSelf: "center" }}
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
              <View key={coffee.id} style={styles.coffeeCard}>
                <View style={{ padding: SPACING, backgroundColor: "#6F4E37" }}>
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
                    <View style={styles.ratingContainer}>
                      <View style={styles.rating}>
                        <Ionicons
                          style={{ marginLeft: SPACING / 2 }}
                          name="star"
                          color={colors.primary}
                          size={SPACING * 1.7}
                        />
                        <Text
                          style={{
                            color: colors.white,
                            marginLeft: SPACING / 2,
                          }}
                        >
                          {coffee.rating}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text numberOfLines={2} style={styles.coffeeName}>
                    {coffee.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.coffeeIncluded}>
                    {coffee.included}
                  </Text>
                  <View style={styles.priceContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.dollarSign}>$</Text>
                      <Text style={styles.price}>{coffee.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Ionicons
                        name="add"
                        size={SPACING * 2}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#6F4E37", // Light brown color
    padding: SPACING,
    borderRadius: SPACING,
  },
  coffeeCard: {
    width: width / 2 - SPACING * 2,
    marginBottom: SPACING,
    borderRadius: SPACING * 2,
    overflow: "hidden",
  },
  ratingContainer: {
    position: "absolute",
    right: 0,
    borderBottomStartRadius: SPACING * 3,
    borderTopEndRadius: SPACING * 2,
    overflow: "hidden",
  },
  rating: {
    flexDirection: "row",
    padding: SPACING - 2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  coffeeName: {
    color: colors.black,
    fontWeight: "600",
    fontSize: SPACING * 1.7,
    marginTop: SPACING,
    marginBottom: SPACING / 2,
  },
  coffeeIncluded: {
    color: colors.secondary,
    fontSize: SPACING * 1.2,
  },
  priceContainer: {
    marginVertical: SPACING / 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dollarSign: {
    color: colors.primary,
    marginRight: SPACING / 2,
    fontSize: SPACING * 1.6,
  },
  price: {
    color: colors.black,
    fontSize: SPACING * 1.6,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: SPACING / 2,
    borderRadius: SPACING,
  },
});
