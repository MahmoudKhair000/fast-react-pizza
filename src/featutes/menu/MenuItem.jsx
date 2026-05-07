import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
} from '../cart/cartSlice';

import Button from '../../ui/Button';
import QuantityControler from '../../ui/ButtonGroup';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const cartIds = useSelector((state) =>
    state.cart.cart.map((item) => item.pizzaId),
  );

  const isInCart = cartIds.includes(id);

  const cartQuantity = useSelector((state) => {
    const item = state.cart.cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 1; // Default to 1 if item is not in cart
  });

  const [quantity, setQuantity] = useState(cartQuantity);

  // console.log(cartIds);

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity,
      unitPrice,
      imageUrl,
      totalPrice: unitPrice * quantity,
    };
    dispatch(addToCart(newItem));
  };
  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      dispatch(increaseItemQuantity(id));
      setQuantity((prev) => prev + 1);
    }
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity(id));
      setQuantity((prev) => prev - 1);
    } else {
      dispatch(removeFromCart(id));
      setQuantity(1);
      // set quantity back to 1 when item is removed from cart,
      // so that if user adds it again, it starts from 1.
    }
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between text-sm font-medium uppercase">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          {isInCart ? (
            <QuantityControler
              decrement={handleDecreaseQuantity}
              increment={handleIncreaseQuantity}
              quantity={quantity}
            />
          ) : (
            <Button
              disabled={soldOut}
              onClick={handleAddToCart}
              className={` ${soldOut ? 'opacity-50 grayscale' : ''}`}
              type="small"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
