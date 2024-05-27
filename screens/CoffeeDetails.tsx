import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CoffeeDetailsProps {
  route: {
    params: {
      coffee: {
        img: string;
        title: string;
        price: number;
        description: string;
        ingredients: string;
        rating: number;
      };
    };
  };
  navigation: any;
}

const CoffeeDetails: React.FC<CoffeeDetailsProps> = ({ route, navigation }) => {
  const { coffee } = route.params;

  const handleBuyNow = () => {
    // Navigate to the cart screen
    navigation.navigate("MyCart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: coffee.img }} style={styles.image} />
      <Text style={styles.title}>{coffee.title}</Text>
      <Text style={styles.price}>Price: ${coffee.price}</Text>
      <Text style={styles.description}>{coffee.description}</Text>
      <Text style={styles.ingredients}>Ingredients: {coffee.ingredients}</Text>
      <Text style={styles.rating}>Rating: {coffee.rating}</Text>

      {/* Buy Now button */}
      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
  },
  buyNowButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buyNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CoffeeDetails;
