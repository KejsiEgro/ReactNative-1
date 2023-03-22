/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import BookItem from '../../component/BookItem';
import BookModal from '../../component/BookModal';



const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  background-color: white;
  max-width: 500px;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 15px
  color: #535353;
`;


const GenreItem = styled.TouchableOpacity`
  background-color: #535353;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;


const GenreText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #f7f7f7;
`;

const BackButton = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  padding: 18px;
  margin: 18px;
  color: #535353;
`;



const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/461c181c-f50a-4874-a064-cc88b13bcd89')
      .then((response) => {
        setBooks(response.data.books);

        const uniqueGenres = new Set(response.data.books.map((book) => book.genre));
        setGenres(Array.from(uniqueGenres));
      });
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const filtered = books.filter(
        (book) => book.genre.toLowerCase() === selectedGenre.toLowerCase(),
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [selectedGenre, books]);

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const renderItem = ({ item }) => (
    <GenreItem onPress={() => selectGenre(item)}>
      <GenreText>{item}</GenreText>
    </GenreItem>
  );

  const renderBookItem = ({ item }) => (
    <BookItem book={item} onPress={() => openModal(item)} />
  );

  const openModal = book => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <Container>
      {!selectedGenre && (
        <>
          <Title>Genres</Title>
          <FlatList
            data={genres}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={1}
            marginTop={30}
          />
        </>
      )}
      {selectedGenre && (
        <TouchableOpacity onPress={() => {
          console.log('back to genres');
          setSelectedGenre(null)
        }}>
          <BackButton>Back to genres</BackButton>
        </TouchableOpacity>
      )}


      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />

      {selectedBook && (
        <BookModal selectedBook={selectedBook} onClose={closeModal} visible={selectedBook !== null} />
      )}
    </Container>
  );
};

export default HomePage;

