// Test ID: XZD9G1

import { useFetcher, useLoaderData } from 'react-router';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from '../order/OrderItem';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher = useFetcher();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      // We use fetcher to load the menu from the menu loader. useFetcher is a hook that allows us to load data from a loader without navigating to a new page.
      // This is useful for loading data that is needed for the current page, but is not part of the current route. In this case, we need to load the menu to get the ingredients for each pizza in the order.
      fetcher.load('/menu');
    }
    // console.log(fetcher.data?.at(1).ingredients);
  }, [fetcher]);

  return (
    <div className="space-y-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>
        <div className="flex items-center justify-end space-x-3">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y-2 divide-stone-200 border-y-2">
        {cart.map((cartItem) => (
          <OrderItem
            key={cartItem.pizzaId}
            item={cartItem}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find(
                (menuItem) => menuItem.id === cartItem.pizzaId,
              ).ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 rounded-lg bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            priority Price: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
