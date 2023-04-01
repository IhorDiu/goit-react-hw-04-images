import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import { toastErrorMessage, toastInfoMessage } from '../../serviceAPI/toast';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { AppBox } from './App.styled';
import { fetchImages, PER_PAGE } from '../../serviceAPI/Api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    gallery: [],
    isVisible: false,
    loading: false,
    currentPerPage: null,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  };

  getImages = async (query, page) => {
    this.setState({ loading: true });
    try {
      const { hits, totalHits } = await fetchImages(query, page);

      if (totalHits === 0) {
        return toastErrorMessage();
      }

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...hits],
        isVisible: page < Math.ceil(totalHits / PER_PAGE),
        currentPerPage: hits.length < PER_PAGE,
      }));
      if (page === 1) {
        toastInfoMessage(`Found ${totalHits} images`);
      }

      if (hits.length < PER_PAGE) {
        toastInfoMessage('All images have been loaded!');
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  searchQuery = inputValue => {
    if (this.state.query === inputValue) {
      return toastInfoMessage('You made the same request');
    }
    this.setState({
      query: inputValue,
      page: 1,
      gallery: [],
      isVisible: false,
      loading: false,
      currentPerPage: null,
      error: null,
      largeImageURL: '',
    });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL });
  };

  render() {
    const {
      gallery,
      isVisible,
      loading,
      currentPerPage,
      error,
      showModal,
      largeImageURL,
    } = this.state;

    return (
      <AppBox>
        <Searchbar searchQuery={this.searchQuery} />

        <ImageGallery
          gallery={gallery}
          showModal={this.toggleModal}
          getLargeImageURL={this.getLargeImageURL}
        />

        {isVisible &&
          (loading ? <Loader /> : <Button loadMore={this.loadMoreBtn} />)}

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
          <Modal closeModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}

        <ToastContainer />
      </AppBox>
    );
  }
}
