// /* eslint-disable no-unused-vars */
// import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { getUserName } from '../user/userSlice';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUserName);

  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-2xl font-semibold">Your cart, {username}</h2>

      {cart.length > 0 ? (
        <ul className="mb-1 mt-6 divide-y-2 divide-stone-200 border-y-2 transition-all duration-500">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-center text-2xl text-stone-500">
          Your cart is empty. Add some pizzas!
        </p>
      )}

      <div>
        <h3 className="mb-6 ps-4 pt-2 text-lg font-semibold">
          Total:{' '}
          {formatCurrency(
            cart.reduce((sum, item) => {
              return sum + item.totalPrice;
            }, 0),
          )}
        </h3>
      </div>

      <div className="space-x-3">
        <Button
          to={
            username && cart.length > 0
              ? '/order/new'
              : username && cart.length === 0
                ? '/menu'
                : '/'
          }
        >
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
