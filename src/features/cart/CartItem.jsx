import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
} from './cartSlice';
import QuantityControler from '../../ui/ButtonGroup';

function CartItem({ item }) {
  const { pizzaId, name, quantity, imageUrl, unitPrice, totalPrice } = item;
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      dispatch(increaseItemQuantity(pizzaId));
    }
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity(pizzaId));
    } else {
      dispatch(removeFromCart(pizzaId));
    }
  };

  return (
    <li className="py-2 sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="h-10 w-10 rounded-lg object-cover"
        />
        <p className="mb-1 sm:mb-0">
          {quantity} &times; {name}({formatCurrency(unitPrice)})
        </p>
      </div>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">
          &nbsp; = {formatCurrency(totalPrice)}
        </p>
        <QuantityControler
          decrement={handleDecreaseQuantity}
          increment={handleIncreaseQuantity}
          quantity={quantity}
        />
      </div>
    </li>
  );
}

export default CartItem;
