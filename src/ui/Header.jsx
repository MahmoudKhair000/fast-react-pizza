import { Link } from 'react-router';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/Username';

function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-stone-800 bg-yellow-400 px-4 py-3 uppercase">
      <Link to="/" className="tracking-wider">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
