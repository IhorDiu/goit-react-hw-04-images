import React, { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { toastErrorMessage, toastInfoMessage } from '../../serviceAPI/toast';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { AppBox } from './App.styled';
import { fetchImages, PER_PAGE } from '../../serviceAPI/Api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPerPage, setCurrentPerPage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(query, page);

        if (totalHits === 0) {
          return toastErrorMessage();
        }

        setGallery(prevGallery => [...prevGallery, ...hits]);
        setIsVisible(page < Math.ceil(totalHits / PER_PAGE));
        setCurrentPerPage(hits.length < PER_PAGE);

        if (page === 1) {
          toastInfoMessage(`Found ${totalHits} images`);
        }

        if (hits.length < PER_PAGE) {
          toastInfoMessage('All images have been loaded!');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const searchQuery = inputValue => {
    if (query === inputValue) {
      return toastInfoMessage('You made the same request');
    }

    setQuery(inputValue);
    setPage(1);
    setGallery([]);
    setIsVisible(false);
    setLoading(false);
    setCurrentPerPage(null);
    setError(null);
    setLargeImageURL('');
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImageURL = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  return (
    <AppBox>
      <Searchbar inputValue={searchQuery} />

      <ImageGallery
        gallery={gallery}
        showModal={toggleModal}
        getLargeImageURL={getLargeImageURL}
      />

      {isVisible && (loading ? <Loader /> : <Button loadMore={loadMoreBtn} />)}

      {currentPerPage && (
        <p style={{ textAlign: 'center' }}>
          Sorry. There are no more images ...
        </p>
      )}

      {error && (
        <p style={{ textAlign: 'center' }}>
          Something went wrong. Try again later.
        </p>
      )}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}

      <ToastContainer />
    </AppBox>
  );
};
