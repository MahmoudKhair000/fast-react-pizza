import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="px-5 py-3">
      <div className="flex items-center justify-between gap-2">
        <p>
          <span className="font-bold">{quantity}&nbsp;&times;</span>&nbsp;{name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
