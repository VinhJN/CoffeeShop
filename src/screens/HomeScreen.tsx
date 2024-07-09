import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {FlatList} from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import {Dimensions} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

const HomeScreen = ({navigation}: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const recentlyViewedProducts = useStore((state: any) => state.recentlyViewedProducts); // Sử dụng store để lấy danh sách sản phẩm đã xem
  const hotProducts = useStore((state: any) => state.hotProducts);
  
  
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const ListRef: any = useRef<FlatList>();



  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.ScreenContainer,  { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      <StatusBar backgroundColor={theme===COLORS.primaryBlackHex?COLORS.primaryWhiteHex: COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />

        <Image
          style={{
            height: 300,
            width: '100%',
            backgroundColor: 'white',
            marginBottom: SPACING.space_15,
          }}
          source={require('../assets/app_images/coffeeshop.jpg')}
        />
        {/* Search Input */}

        {/* Category Scroller */}

        <Text style={[styles.NewProductText, { color: theme === 'light' ? '#000000' : '#ffffff' }]}> New Product</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? {color: COLORS.primaryOrangeHex}
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* Hot Deal */}
        <Text style={styles.HotDealText}> Hot Deal</Text>

        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={hotProducts.map((productId: any) => CoffeeList.find((coffee: { id: any; }) => coffee.id === productId))}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}
            >
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          );
        }}
      />
        {/* Recent Flatlist */}
        <Text style={[styles.NewProductText, { color: theme === 'light' ? '#000000' : '#ffffff' }]}> Recent Product</Text>

        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentlyViewedProducts}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const product = CoffeeList.find((coffee: any) => coffee.id === item);
          if (product) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: product.index,
                    id: product.id,
                    type: product.type,
                  });
                }}>
                <CoffeeCard
                  id={product.id}
                  index={product.index}
                  type={product.type}
                  roasted={product.roasted}
                  imagelink_square={product.imagelink_square}
                  name={product.name}
                  special_ingredient={product.special_ingredient}
                  average_rating={product.average_rating}
                  price={product.prices[2]}
                  // Thêm vào giỏ hàng
                  buttonPressHandler={(cartItem: any) => {
                    addToCart(cartItem);
                    calculateCartPrice();
                    ToastAndroid.showWithGravity(
                      `${cartItem.name} is Added to Cart`,
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                  }}
                />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        }}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  NewProductText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_4,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  HotDealText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryRedHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
