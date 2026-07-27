import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  // console.log(ingredients.join(', '));

  return (
    <li className="px-5 py-3">
      <div className="flex items-center justify-between gap-2">
        <p>
          <span className="font-bold">{quantity}&nbsp;&times;</span>&nbsp;{name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <div>
        <p className="ps-2 text-sm italic text-stone-700">
          {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
