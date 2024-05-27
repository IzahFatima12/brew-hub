import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import COLORS from '../config/colors';
import coffees from '../config/coffees';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const MyCartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(coffees.map(item => ({ ...item, quantity: 1 })));

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  
  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0); // Remove item if quantity becomes 0
    setCartItems(updatedCartItems);
  };

  const handleRemove = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.white, paddingBottom: 7 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.white, paddingBottom: 5, }}>{item.included}</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.white }}>${item.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.white, paddingBottom: 13, }}>{item.quantity}</Text>
          <View style={styles.actionBtn}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)}>
              <Icon name="remove" size={25} color={COLORS.Gingerbread} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIncrement(item.id)}>
              <Icon name="add" size={25} color={COLORS.Gingerbread} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Icon name="delete" size={25} color={COLORS.Gingerbread} />
        </TouchableOpacity>
      </View>
    );
  };

  CartCard.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      included: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    }).isRequired,
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.brown }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white, paddingTop: 20, paddingLeft: 90, fontstyle: 'cursive' }}>My Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.Gingerbread }}>Total Price</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.Gingerbread }}>${totalPrice}</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="CHECKOUT" onPress={() => navigation.navigate('payment')} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: COLORS.Gingerbread,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.Gingerbread,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.Gingerbread,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MyCartScreen;
