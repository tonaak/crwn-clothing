import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateEffect } from 'react-use';
import useClickTracker from '../../shared/useClickTracker';

import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();

  const actionArea = useRef(null);
  let dropDownVisible = useClickTracker(actionArea);

  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  }, []);

  useUpdateEffect(() => {
    if (!dropDownVisible) {
      dispatch(setIsCartOpen(false));
    }
  }, [dropDownVisible]);

  return (
    <CartDropDownContainer ref={actionArea}>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
