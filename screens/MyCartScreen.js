import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import COLORS from '../config/colors';
import coffees from '../config/coffees';
import PrimaryButton from '../components/PrimaryButton';


const MyCartScreen = ({ navigation }) => {
  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.white,paddingBottom:7, }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.white,paddingBottom:5,}}>{item.included}</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.white }}>${item.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.white,paddingBottom: 13, }}>3</Text>
          <View style={styles.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.Gingerbread} />
            <Icon name="add" size={25} color={COLORS.Gingerbread} />
          </View>
        </View>
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

  return (
    //<ImageBackground source={require("../assets/images/cart.jpg")} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} onPress={() => navigation.goBack()} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white,fontFamily:'CedarvilleCursive',}}>My Cart</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={coffees}
          renderItem={({ item }) => <CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          ListFooterComponent={() => (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.Gingerbread }}>Total Price</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.Gingerbread }}>$50</Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <PrimaryButton title="CHECKOUT" onPress={() => navigation.navigate('payment')} style={ styles.button } />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
  //  </ImageBackground>
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
  },
  button:{
    backgroundColor: COLORS.Gingerbread,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
  },
});

export default MyCartScreen;
