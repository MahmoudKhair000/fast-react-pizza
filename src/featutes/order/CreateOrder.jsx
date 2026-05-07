// import { useState } from "react";
import { Form, redirect, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import { useActionData } from 'react-router';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import OrderListItem from './OrderListItem';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);

  return (
    <div className="mx-auto mt-8 max-w-2xl space-y-6 px-4">
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
        <div className="mb-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              id="address"
              required
            />
          </div>
        </div>
        <div className="my-4 flex items-center space-x-3 text-xl">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 accent-yellow-400 outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-1"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/* we add a hidden input for the cart data to be sent to formData */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>

        {cart.length > 0 ? (
          <ul className="mb-1 mt-6 divide-y-2 divide-stone-200 border-y-2 border-stone-200 transition-all duration-500">
            {cart.map((item) => (
              <OrderListItem item={item} key={item.id} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-center text-xl text-stone-500">
            Your cart is empty. Add some pizzas!
          </p>
        )}

        <div className="mt-4">
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
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
    priority: formData.priority === 'on',
    cart: JSON.parse(formData.cart),
    createdAt: new Date().toISOString(),
  };

  // console.log(JSON.parse(formData.cart));

  const errors = {};
  if (!isValidPhone(await newOrderData.phone)) {
    errors.phone =
      'please give us your valid phone number, we might need it to contact you';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(newOrderData);
  return redirect(`/order/${newOrder.id}`);
  // return null;
}

export default CreateOrder;
