/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { Button, FlatList, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import SharedDataContext from "../../contexts/SharedDataContext";
import { Text } from 'react-native';





const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
`;

const Book = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BookImage = styled.Image`
  width: 100px;
  height: 150px;
  margin-right: 20px;
  margin-top: 30px;
`;

const BookInfo = styled.View`
  flex: 1;
`;

const BookTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #535353;
`;

const BookDetails = styled.Text`
  font-size: 14px;
  color: #666;
`;

const NoFavorites = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #535353;
`;

const Remove = styled.Text`
font-size: 18px;
color: red;
align-self: flex-start;
margin-top: 30px
`;



const Favorites = () => {

  const { bookData, setBookData } = useContext(SharedDataContext);

  const removeBookFromFavorites = (bookTitle) => {
    const filteredData = bookData.filter((item) => item.title !== bookTitle);
    setBookData(filteredData);
  };

  const renderItem = ({ item }) => (
    <Book>

      <BookImage source={{ uri: item?.image }} />
      <BookInfo>
        <BookTitle>{item?.title}</BookTitle>
        <BookDetails>{item?.genre} | {item?.publishingDate}</BookDetails>
        <TouchableOpacity onPress={() => removeBookFromFavorites(item.title)}>
          <Remove>Remove from favorites</Remove>
        </TouchableOpacity>
      </BookInfo>
    </Book>
  );


  return (

    <Container>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 110, color: '#535353' }}>Your Favorites</Text>
      </View>

      {(bookData == null || bookData?.length == 0) ?
        <NoFavorites>You don't have any favorite books yet!</NoFavorites>
        :
        <FlatList
          data={bookData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      }
    </Container>

  );
};

export default Favorites;