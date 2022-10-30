import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

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
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);
  const [product, setProduct] = useState({
    id: 0,
    imageUrl: '',
    name: '',
    price: 0,
  });

  const getProduct = (productId: string, products: CategoryItem[]) => {
    return products.find((product) => product.id.toString() === productId);
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

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <ProductDetailContainer>
          <ProductImage src={product.imageUrl} />
          <DetailsContainer>
            <Category>{category}</Category>
            <Title>{product.name}</Title>
            <Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              sapiente deserunt fugit cupiditate expedita labore illum.
              Voluptatibus aspernatur earum ea vitae perspiciatis dolorum
              necessitatibus. Unde, quis accusamus. Consequatur, deleniti
              possimus!
            </Description>
            <Price>${product.price}.00</Price>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.base}
              onClick={addProductToCart}
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
