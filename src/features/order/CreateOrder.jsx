// import { useState } from "react";
import { Form, redirect, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import { useActionData } from 'react-router';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import OrderCartItem from './OrderListItem';
import LinkButton from '../../ui/LinkButton';
import store from '../../store';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { addOrder, fetchAddress } from '../user/userSlice';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const {
    username,
    error: addressError,
    status: addressStatus,
    position,
    address,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = 0.2 * totalCartPrice;
  const totalOrderPrice = withPriority
    ? totalCartPrice + priorityPrice
    : totalCartPrice;

  return (
    <div className="mx-auto mt-8 max-w-2xl space-y-6 px-4">
      <LinkButton to="/cart">&larr; Back to cart</LinkButton>

      <h2 className="mb-8 text-3xl">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="ms-5">
        <div className="mb-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            Customer Name
          </label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              id="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>
        <div className="mb-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              className="input"
              type="tel"
              name="phone"
              id="phone"
              required
            />
          </div>
        </div>
        <>
          {formErrors?.phone && (
            <p className="mb-8 rounded-md border border-red-300 bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </>
        <div className="relative mb-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="relative grow items-center">
            <input
              className="input"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              id="address"
              required
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute right-2 top-1.5 z-50 md:right-3 md:top-2.5">
                <Button
                  type="xsmall"
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <>
          {addressStatus === 'error' && (
            <p className="mb-8 rounded-md border border-red-300 bg-red-100 p-2 text-xs text-red-700">
              {addressError}
            </p>
          )}
        </>

        <div className="my-4 flex items-center space-x-3 text-xl">
          <input
            className="h-5 w-5 accent-yellow-400 outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => {
              setWithPriority(e.target.checked);
            }}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/* we add a hidden input for the cart data to be sent to formData */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
        </div>

        {cart.length > 0 ? (
          <ul className="mb-1 mt-6 divide-y-2 divide-stone-200 border-y-2 border-stone-200 transition-all duration-500">
            {cart.map((item) => (
              <OrderCartItem item={item} key={item.pizzaId} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-center text-xl text-stone-500">
            Your cart is empty. Add some pizzas!
          </p>
        )}

        <>
          {formErrors?.cart && (
            <p className="mb-8 rounded-md border border-red-300 bg-red-100 p-2 text-xs text-red-700">
              {formErrors.cart}
            </p>
          )}
        </>

        <div className="mt-4">
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalOrderPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const newOrderData = {
    ...formData,
    priority: formData.priority === 'true',
    cart: JSON.parse(formData.cart),
    createdAt: new Date().toISOString(),
  };

  // // log to the console, because I forgot API don't accept 'id' as a property.
  // // and we have to use other name like 'pizzaId'.
  // // I really have to review nodeJs and make some back-end projects.
  // console.log(JSON.parse(formData.cart));

  const errors = {};
  if (!isValidPhone(await newOrderData.phone)) {
    errors.phone =
      'Please give us your valid phone number, we might need it to contact you';
  }
  if ((await newOrderData.cart.length) === 0) {
    errors.cart = 'Your cart is empty, add some pizzas!';
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(newOrderData);
  // Update the client-side Redux state after the API call,
  // but note that dispatching from this action function is a side effect
  // , that is better handled elsewhere
  // console.log(newOrder.id);
  store.dispatch(addOrder(newOrder.id));
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
