import React, { Component } from 'react';

import { fetchData } from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchInput: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    showBtn: false,
    showModal: false,
    modalImg: '',
    modalAlt: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchInput !== this.state.searchInput ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });

        const fetchedSearch = await fetchData(
          this.state.searchInput,
          this.state.page
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...fetchedSearch.hits],
          showBtn: this.state.page < Math.ceil(fetchedSearch.totalHits / 12),
        }));

      } catch (error) {
        this.setState({ error: 'Something wrong' });
      
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  formSubmitHandler = newSearchInput => {
    this.setState({ ...newSearchInput, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImgClick = (imgUrl, alt) => {
    this.setState({
      modalImg: imgUrl,
      modalAlt: alt,
      showModal: true,
    });
  };

  render() {
    const { loading, error, images, showBtn, showModal, modalImg, modalAlt } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />
        {loading && <Loader />}
        {error && <div>{error}</div>}
        {images.length > 1 && (
          <ImageGallery searchedArray={images} imgClick={this.handleImgClick} />
        )}
        {showBtn && <Button loadMore={() => this.handleLoadMore()} />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            modalSrc={modalImg}
            modalAlt={modalAlt}
          />
        )}
      </div>
    );
  }
}

export default App;
