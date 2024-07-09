import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import CoffeeCard from '../components/CoffeeCard';
import Comment from '../components/Comment';
import {useDispatch, useSelector} from 'react-redux';
import {addCommentAPI} from '../redux/actions/commentAction';

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

const DetailsScreen = ({navigation, route}: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const ListRef: any = useRef<FlatList>();
  const [comment, setComment] = useState<string>('');
  const listComment = useSelector((state: any) => state.listComment.listComment);

  const dispatch = useDispatch();

  const addComment = () => {
    if (comment.trim() !== '') {
      let duLieuAdd = {
        user: 'Vinh',
        cmt: comment,
      };
      dispatch(addCommentAPI(duLieuAdd));
      setComment('');
      ToastAndroid.showWithGravity(
        'Comment added successfully',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Please enter a comment',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

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

  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToRecentlyViewed = useStore(
    (state: any) => state.addToRecentlyViewed,
  );
  const recentlyViewedProducts = useStore(
    (state: any) => state.recentlyViewedProducts,
  ); // Sử dụng store để thêm sản phẩm đã xem

  useEffect(() => {
    // Thêm sản phẩm hiện tại vào danh sách sản phẩm đã xem khi màn hình được hiển thị
    addToRecentlyViewed(route.params.id);
  }, []);

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        ItemOfIndex.type == 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}
        />
        {/* Recent Flatlist */}
        <Text style={styles.NewProductText}> Recent Product</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentlyViewedProducts}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const product = CoffeeList.find(
              (coffee: any) => coffee.id === item,
            );
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
          {/* Giao diện nhập bình luận */}
          {/* Comment section */}
          <View style={styles.commentContainer}>
            <Text style={styles.infoTitle}>Comments</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment"
              value={comment}
              onChangeText={text => setComment(text)}
            />
            <Button title="Post Comment" onPress={addComment} />
          </View>
          {/* Display comments */}
          <View style={styles.commentContainer}>
            {listComment.map(( index: any) => (
              <Text key={index.id} style={styles.commentText}>
                {index.user}: {index.cmt}
              </Text>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  NewProductText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_4,
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
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  commentContainer: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  commentText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
    marginBottom: SPACING.space_10,
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_10,
  },
});

export default DetailsScreen;
