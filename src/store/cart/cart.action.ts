import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

import Swal from 'sweetalert2';

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const addCartItemWithQuantity = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
  quantityToAdd: number
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: quantityToAdd }];
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${productToAdd.name}`,
    text: 'has been added to your cart.',
    showConfirmButton: false,
    timer: 1000,
  });
  return setCartItems(newCartItems);
};

export const addItemToCartWithQuantity = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
  quantityToAdd: number
) => {
  const newCartItems = addCartItemWithQuantity(
    cartItems,
    productToAdd,
    quantityToAdd
  );
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${productToAdd.name}`,
    text: 'has been added to your cart.',
    showConfirmButton: false,
    timer: 1000,
  });
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};
