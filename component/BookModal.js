/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Share,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import { ToastAndroid } from 'react-native';
import SharedDataContext from './../contexts/SharedDataContext';

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
  color: #535353;
`;

const ModalImage = styled.Image`
width: 100%;
height: 500px;
margin-bottom: 10px;
border-radius: 10px;
object-fit: contain;
`;

const ModalText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 10px;
`;

const ModalClose = styled.Text`
  font-size: 22px;
  margin-bottom: 15px;
  padding: 10px 20px;
  background-color: #ddd;
  border-radius: 5px;
  text-align: center;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const BookModal = ({ selectedBook, visible, onClose }) => {
  const { setBookData } = useContext(SharedDataContext);

  const handleUpdateBookData = () => {
    setBookData((books) => {
      if (books === null) {
        ToastAndroid.show(
          `${selectedBook.title} has been added to favorites`,
          ToastAndroid.SHORT
        );
        return [selectedBook];
      } else {
        const bookExists = books.some(
          (book) => book.title === selectedBook.title
        );
        if (!bookExists) {
          const updatedBooks = [...books, selectedBook];
          ToastAndroid.show(
            `${selectedBook.title} has been added to favorites`,
            ToastAndroid.SHORT
          );
          return updatedBooks;
        } else {
          ToastAndroid.show(
            `${selectedBook.title} already been added to favorites`,
            ToastAndroid.SHORT
          );
          return books;
        }
      }
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this book: ${selectedBook.title} by ${selectedBook.author}
\n ${selectedBook.link}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <Modal visible={visible} animationType="slide">
      <ModalContainer>
        <ModalContent>
          <ModalTitle>{selectedBook.title}</ModalTitle>
          <ModalImage source={{ uri: selectedBook.image }} />
          <ScrollView>
            <ModalText>{selectedBook.description}</ModalText>
            <ModalText>
              <Bold>Author: </Bold> {selectedBook.author}
            </ModalText>
            <ModalText>
              <Bold>Rate: </Bold> {selectedBook.rate}
            </ModalText>
            <ModalText>
              <Bold>Genre: </Bold>
              {selectedBook.genre}
            </ModalText>
            <ModalText>
              <Bold>Publishing Date: </Bold>
              {selectedBook.publishing_date}
            </ModalText>
            <TouchableOpacity onPress={onShare}>
              <ModalClose style={{ color: 'blue' }}>Share</ModalClose>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdateBookData}>
              <ModalClose style={{ color: 'green' }}>Add to favorites</ModalClose>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <ModalClose style={{ color: 'red', marginBottom: 40 }}>Close</ModalClose>
            </TouchableOpacity>
          </ScrollView>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default BookModal;
