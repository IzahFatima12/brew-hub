import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SPACING from "../config/SPACING";
import colors from "../config/colors";

const Categories = ({ categories, onChange }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.categoryId}
          style={styles.categoryButton}
          onPress={() => onChange(category.categoryId)}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: SPACING,
  },
  categoryButton: {
    backgroundColor: colors.primary,
    borderRadius: SPACING,
    padding: SPACING,
    margin: SPACING / 2,
  },
  categoryText: {
    color: colors.white,
    fontSize: SPACING * 1.5,
  },
});

export default Categories;
