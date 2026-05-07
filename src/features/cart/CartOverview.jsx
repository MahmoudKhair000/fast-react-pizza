import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { formatCurrency } from '../../utils/helpers';
import { getTotalCartCount, getTotalCartPrice } from './cartSlice';

function CartOverview() {
  const totalCount = useSelector(getTotalCartCount);
  const totalPrice = useSelector(getTotalCartPrice);

  if (totalCount === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm font-semibold uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalCount} {totalCount === 1 ? 'Pizza' : 'Pizzas'}
        </span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
