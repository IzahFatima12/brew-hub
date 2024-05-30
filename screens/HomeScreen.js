// HomeScreen.jsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SPACING from "../config/SPACING";
import colors from "../config/colors";
import SearchField from "../components/SearchField";
import Categories from "../components/Categories";
import { useNavigation } from '@react-navigation/native';

const avatar = require("../assets/avatar.jpg");
const { width } = Dimensions.get("window");

const HomeScreen = ({ imageUri }) => {
  const navigation = useNavigation();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [coffees, setCoffees] = useState([]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategoryId(categoryId);
    console.log("Category changed to:", categoryId); // Debug log
  };

  useEffect(() => {
    // Your existing logic to fetch coffee data
  }, []);

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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {/* Render the menu icon */}
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
              {/* Render the user's profile picture */}
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
                    source={imageUri ? { uri: imageUri } : avatar} // Display user's profile picture if available, otherwise use the default avatar
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
                  fontFamily: "CedarvilleCursive-Regular",
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
          {/* Render the rest of your components */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#6F4E37",
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
    color: colors.black,
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