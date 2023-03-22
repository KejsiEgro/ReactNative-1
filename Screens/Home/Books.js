/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  Text,
  Image,
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Share,
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import SharedDataContext from "../../contexts/SharedDataContext";
import { ToastAndroid } from 'react-native';
import BookItem from './../../component/BookItem';
import BookModal from './../../component/BookModal';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f7f7f7;
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
`;

const BookAuthor = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.ScrollView`
  background-color: #fff;
  elevation: 4;
  padding: 20px 20px 0px 20px;
`;

const ModalTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ModalImage = styled.Image`
  width: 100%;
  height: 400px;
  margin-bottom: 10px;
  border-radius: 10px;
  align-self: center;
`;

const ModalText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 10px;
`;

const ModalClose = styled.Text`
  font-size: 22px;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px 20px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [fiberedBooks, setFilteredBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/461c181c-f50a-4874-a064-cc88b13bcd89')
      .then(response => {
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
      });
  }, []);

  const openModal = book => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const renderItem = ({ item }) => (
    <BookItem book={item} onPress={() => openModal(item)} />

  );

  const searchBooks = query => {
    const filteredBooks = books.filter(book => {
      return book.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredBooks(filteredBooks);
    setSearchQuery(query);
  };



  return (
    <Container>
      <TextInput
        placeholder="Search by title"
        value={searchQuery}
        style={{
          margin: 20,
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 5,
        }}
        onChangeText={query => searchBooks(query)}
      />
      {fiberedBooks.length === 0 ?
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No books found</Text>
        :
        <FlatList
          data={fiberedBooks}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
        />
      }
      {selectedBook && (
        <BookModal selectedBook={selectedBook} onClose={closeModal} visible={selectedBook !== null} />
      )}
    </Container>
  );
};
export default BookList;
