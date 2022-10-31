import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  addItemToCart,
  addItemToCartWithQuantity,
} from '../../store/cart/cart.action';

import { CategoryItem } from '../../store/categories/category.types';
import Spinner from '../../components/spinner/spinner.component';
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';

import {
  ProductDetailContainer,
  Description,
  DetailsContainer,
  Price,
  ProductImage,
  Title,
  Category,
  Quantity,
  QuantityButton,
  PriceContainer,
} from './product-detail.styles';

type ProductDetailParams = {
  id: string;
  category: string;
};

const ProductDetail = () => {
  const { id } = useParams<keyof ProductDetailParams>() as ProductDetailParams;
  const { category } = useParams<
    keyof ProductDetailParams
  >() as ProductDetailParams;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => {
    if (quantity === 1) {
      dispatch(addItemToCart(cartItems, product));
    } else {
      dispatch(addItemToCartWithQuantity(cartItems, product, quantity));
    }
  };

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);
  const [product, setProduct] = useState({
    id: 0,
    imageUrl: '',
    name: 'Oops! This product does not exist',
    price: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);

  const getProduct = (productId: string, products: CategoryItem[]) => {
    return products.find((product) => product.id.toString() === productId);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  useEffect(() => {
    if (products) {
      const product = getProduct(id, products);
      if (product) {
        setProduct(product);
      }
    }
  }, [product, id, products]);

  useEffect(() => {
    setPrice(quantity * product.price);
  }, [quantity, product.price]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <ProductDetailContainer>
          <ProductImage src={product.imageUrl} />
          <DetailsContainer>
            <Category to={`/shop/${category}`}>{category}</Category>
            <Title>{product.name}</Title>
            <Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              sapiente deserunt fugit cupiditate expedita labore illum.
              Voluptatibus aspernatur earum ea vitae perspiciatis dolorum
              necessitatibus. Unde, quis accusamus. Consequatur, deleniti
              possimus!
            </Description>
            <PriceContainer>
              <Price>${price}.00</Price>
              <Quantity>
                <QuantityButton onClick={decrease}>&#8722;</QuantityButton>
                <span>{quantity}</span>
                <QuantityButton onClick={increase}>&#43;</QuantityButton>
              </Quantity>
            </PriceContainer>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.base}
              onClick={addProductToCart}
              disabled={product.id === 0}
            >
              Add to cart
            </Button>
          </DetailsContainer>
        </ProductDetailContainer>
      )}
    </Fragment>
  );
};

export default ProductDetail;
