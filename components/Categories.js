import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import categories from "../config/categories";
import colors from "../config/colors";
import SPACING from "../config/SPACING";

const Categories = ({ onChange }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handlePress = (id) => {
    setActiveCategoryId(id);
    onChange(id);
  };

  return (
    <FlatList
      horizontal={true}
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ marginVertical: SPACING }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          style={{ marginRight: SPACING * 2, alignItems: "center" }}
        >
          <Text
            style={[
              { color: colors.secondary, fontSize: SPACING * 2 },
              activeCategoryId === item.id && { color: colors.primary },
            ]}
          >
            {item.name}
          </Text>
          {activeCategoryId === item.id && (
            <View
              style={{
                height: SPACING,
                width: SPACING,
                backgroundColor: colors.primary,
                borderRadius: SPACING / 2,
                marginTop: SPACING / 2,
              }}
            />
          )}
        </TouchableOpacity>
      )}
    />
  );
};
Categories.propTypes = {
  onChange: PropTypes.func.isRequired, // Add PropTypes validation
};

export default Categories;


