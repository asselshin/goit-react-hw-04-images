import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore} className={s.Button}>
      Load more
    </button>
  );
};

Button.propType = { loadMore: PropTypes.func };

export default Button;
