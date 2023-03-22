/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import styled from 'styled-components/native';


const BookItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: {
    width: 0,
    height: 2,
  };
  shadow-opacity: 0.23;
  shadow-radius: 2.62;
  elevation: 4;
`;

const BookImage = styled.Image`
  width: 80px;
  height: 120px;
  margin-right: 15px;
  border-radius: 5px;
`;

const BookDetails = styled.View`
  flex: 1;
`;

const BookTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #535353;
`;

const BookAuthor = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const BookItem = ({ book, onPress }) => (
  <BookItemContainer onPress={onPress}>
    <BookImage source={{ uri: book.image }} />
    <BookDetails>
      <BookTitle>{book.title}</BookTitle>
      <BookAuthor>{book.author}</BookAuthor>
      <Text>
        Rate:
        {book.rate}
      </Text>
      <Text>Genre: {book.genre}</Text>
      <Text>Publishing Date: {book.publishing_date}</Text>
    </BookDetails>
  </BookItemContainer>
);

export default BookItem;