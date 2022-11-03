import { Link } from 'react-router-dom';

import './slideshow-item.styles.scss';

const SlideshowItem = (props) => {
  const { textContent, shopLink } = props;

  return (
    <div className="content-container">
      <div className="text-content">{textContent}</div>
      <Link to={shopLink} className="shop-link">
        SHOP NOW
      </Link>
    </div>
  );
};

export default SlideshowItem;
