import { useEffect, useState, useRef } from 'react';

import SlideshowItem from '../slideshow-item/slideshow-item.component';

import './slideshow.styles.scss';

const images = [
  {
    url: 'https://res.cloudinary.com/ddhcdehae/image/upload/v1667461131/my%20image/slider-08_cc8wmb.jpg',
    text: 'Get your fashion style',
    shopLink: '/shop',
  },
  {
    url: 'https://res.cloudinary.com/ddhcdehae/image/upload/v1667461131/my%20image/slider-09_yatpmp.jpg',
    text: 'Street fashion not only for the street',
    shopLink: '/shop/mens',
  },
  {
    url: 'https://res.cloudinary.com/ddhcdehae/image/upload/v1667461132/my%20image/slider-15_euwn1o.jpg',
    text: 'Making someone feel pretty is an art',
    shopLink: '/shop/womens',
  },
  {
    url: 'https://res.cloudinary.com/ddhcdehae/image/upload/v1667461131/my%20image/slider1_agk84d.jpg',
    text: 'Summer collection 2022',
    shopLink: '/shop/womens',
  },
];
const delay = 3500;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundImage: `url(${image.url})` }}
          >
            <SlideshowItem textContent={image.text} shopLink={image.shopLink} />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? ' active' : ''}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
