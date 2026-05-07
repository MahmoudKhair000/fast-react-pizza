import { formatCurrency } from '../../utils/helpers';

function OrderListItem({ item }) {
  const { name, quantity, imageUrl, unitPrice, totalPrice } = item;

  return (
    <li className="px-8 py-2 sm:flex sm:items-center sm:justify-between">
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
      <div className="flex items-center justify-end sm:gap-6">
        <p className="text-sm font-bold">
          &nbsp; = {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderListItem;
