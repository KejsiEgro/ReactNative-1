/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

import BookItem from './../../component/BookItem';
import BookModal from './../../component/BookModal';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f7f7f7;
`;

const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: "#bbb"
})`
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  color: black;
  border: 1px solid #bbb;
`;


const NoBooksText = styled.Text`
text-align: center;
margin-top: 20px;
color: black;
`

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
      <SearchInput
        placeholder="Search by title"
        value={searchQuery}
        onChangeText={query => searchBooks(query)}
      />
      {fiberedBooks.length === 0 ?
        <NoBooksText>No books found</NoBooksText>
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
