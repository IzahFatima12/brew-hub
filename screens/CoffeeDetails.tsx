import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../config/SPACING";
import colors from "../config/colors";
import { database } from "../config/firebase";
import { getStorage } from "firebase/storage";
import {  onValue } from "firebase/database";
import { ref, set } from "firebase/database";

import { BlurView } from "expo-blur";

const { height, width } = Dimensions.get("window");

const CoffeeDetails = ({ route, navigation }) => {
  const { coffee } = route.params;
  const [recommendedCoffees, setRecommendedCoffees] = useState([]);

  useEffect(() => {
    const dbRefCoffees = ref(database, "coffees");
    onValue(dbRefCoffees, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const coffeesArray = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((item) => item.id !== coffee.id); // Exclude current coffee
        setRecommendedCoffees(coffeesArray);
      }
    });
  }, [coffee.id]);

  const handleBuyNow = async (item) => {
    try {
      // Generate a unique ID for the cart item
      const uniqueItemId = `uniqueItemId${Date.now()}`;
  
      // Add the selected item to the cart with the unique ID
      const cartItemRef = ref(database, `cartItems/${uniqueItemId}`);
      await set(cartItemRef, { ...item, quantity: 1 }); // Set quantity as 1 when adding to cart
  
      // Navigate to the cart screen
      navigation.navigate('MyCart', { item }); // Pass the selected item to the cart screen
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{ uri: coffee.img }}
          style={styles.imageBackground}
          imageStyle={styles.imageBackgroundImage}
        >
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" color={colors.light} size={SPACING * 2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="heart" color={colors.light} size={SPACING * 2} />
            </TouchableOpacity>
          </View>
          <View style={styles.blurViewContainer}>
            <BlurView intensity={80} tint="dark" style={styles.blurView}>
              <View>
                <Text style={styles.coffeeTitle}>{coffee.title}</Text>
                <Text style={styles.coffeeIngredients}>{coffee.ingredients}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={SPACING * 1.5} color={colors.primary} />
                  <Text style={styles.ratingText}>{coffee.rating}</Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="cafe" size={SPACING * 2} color={colors.primary} />
                  <Text style={styles.iconText}>Coffee</Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Ionicons name="water" size={SPACING * 2} color={colors.primary} />
                  <Text style={styles.iconText}>Milk</Text>
                </View>
                <View style={styles.roastTypeWrapper}>
                  <Text style={styles.roastTypeText}>Medium roasted</Text>
                </View>
              </View>
            </BlurView>
          </View>
        </ImageBackground>
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>You may also like</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recommendedCoffees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.recommendationCard}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CoffeeDetails", { coffee: item })}
                >
                  <ImageBackground
                    source={{ uri: item.img }}
                    style={styles.recommendationImage}
                    imageStyle={styles.recommendationImageStyle}
                  >
                    <BlurView intensity={30} tint="dark" style={styles.recommendationBlur}>
                      <Text style={styles.recommendationText}>{item.title}</Text>
                    </BlurView>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <SafeAreaView style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <View style={styles.priceValueContainer}>
            <Text style={styles.priceCurrency}>$</Text>
            <Text style={styles.priceValue}>{coffee.price}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buyNowButton} onPress={() => handleBuyNow(coffee)}>
  <Text style={styles.buyNowButtonText}>Buy Now</Text>
</TouchableOpacity>



      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C4A484",
  },
  imageBackground: {
    height: height / 2 + SPACING * 2,
    justifyContent: "space-between",
  },
  imageBackgroundImage: {
    borderRadius: SPACING * 3,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING * 2,
  },
  headerButton: {
    backgroundColor: colors.dark,
    padding: SPACING,
    borderRadius: SPACING * 1.5,
  },
  blurViewContainer: {
    borderRadius: SPACING * 3,
    overflow: "hidden",
  },
  blurView: {
    padding: SPACING * 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coffeeTitle: {
    fontSize: SPACING * 2,
    color: colors.black,
    fontWeight: "600",
    marginBottom: SPACING,
  },
  coffeeIngredients: {
    fontSize: SPACING * 1.8,
    color: colors.black,
    fontWeight: "500",
    marginBottom: SPACING,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: SPACING,
  },
  ratingText: {
    color: colors.black,
    marginLeft: SPACING,
  },
  iconContainer: {
    width: "35%",
    justifyContent: "space-between",
  },
  iconWrapper: {
    padding: SPACING / 2,
    width: SPACING * 5,
    height: SPACING * 5,
    backgroundColor: colors.dark,
    borderRadius: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: colors["white-smoke"],
    fontSize: SPACING,
  },
  roastTypeWrapper: {
    backgroundColor: colors.dark,
    padding: SPACING / 2,
    borderRadius: SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  roastTypeText: {
    color: colors["white-smoke"],
    fontSize: SPACING * 1.3,
  },
  detailsContainer: {
    padding: SPACING,
  },
  sectionTitle: {
    color: colors["dark-brown"],
    fontSize: SPACING * 1.7,
    marginBottom: SPACING,
  },
  description: {
    color: colors.black,
  },
  recommendationCard: {
    marginRight: SPACING,
  },
  recommendationImage: {
    width: width / 2,
    height: width / 2,
    justifyContent: "flex-end",
  },
  recommendationImageStyle: {
    borderRadius: SPACING,
  },
  recommendationBlur: {
    padding: SPACING,
    borderBottomLeftRadius: SPACING,
    borderBottomRightRadius: SPACING,
  },
  recommendationText: {
    color: colors.white,
    fontSize: SPACING * 1.7,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: SPACING,
    marginBottom: SPACING * 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    padding: SPACING,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: SPACING * 3,
  },
  priceLabel: {
    color: colors.black,
    fontSize: SPACING * 1.5,
    fontWeight: "600",
  },
  priceValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceCurrency: {
    color: colors.black,
    fontSize: SPACING * 1.5,
  },
  priceValue: {
    color: colors.black,
    fontSize: SPACING * 2.5,
    fontWeight: "600",
  },
  buyNowButton: {
    backgroundColor: colors.primary,
    padding: SPACING * 1.5,
    borderRadius: SPACING * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowButtonText: {
    color: colors.white,
    fontSize: SPACING * 1.7,
    fontWeight: "600",
  },
});

export default CoffeeDetails;
