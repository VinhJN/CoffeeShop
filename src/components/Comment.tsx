// components/Comment.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const Comment = ({ productId }: any) => {
  const user = useSelector((state: any) => state.user?.user);
  const comment = useSelector((state: any) => state.comment?.comment);

  const productComments = comment.filter((comment: any) => comment.productId === productId);

  return (
    <View style={styles.container}>
      {productComments.map((comment: any) => (
        <Text key={comment.id} style={styles.commentText}>
          {comment.user}: {comment.text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_20,
    marginTop: SPACING.space_10,
  },
  commentText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_10,
  },
});

export default Comment;
