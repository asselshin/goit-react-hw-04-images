import React, {useState, useEffect } from 'react';

import { fetchData } from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (searchInput === '') {
      return;
    }
    async function fetchImage() {
      try {
        setLoading(true);
        const fetchedSearch = await fetchData(searchInput, page);
        setImages(prevState => [...prevState, ...fetchedSearch.hits]);        
        setShowBtn(page < Math.ceil(fetchedSearch.totalHits / 12));        
      } catch (error) {
        setError('Something wrong');      
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [page, searchInput]);


  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const formSubmitHandler = newSearchInput => {
    setSearchInput(newSearchInput);
    setImages([]);
    setPage(1);
  };
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImgClick = (imgUrl, alt) => {
    setModalImg(imgUrl);
    setModalAlt(alt);
    setShowModal(true);
  };

  return (
      <div className="App">
        <Searchbar onSubmit={formSubmitHandler} />
        {loading && <Loader />}
        {error && <div>{error}</div>}
        {images.length > 1 && (
          <ImageGallery searchedArray={images} imgClick={handleImgClick} />
        )}
        {showBtn && <Button loadMore={() => handleLoadMore()} />}
        {showModal && (
          <Modal
            onClose={toggleModal}
            modalSrc={modalImg}
            modalAlt={modalAlt}
          />
        )}
      </div>
    );  
};