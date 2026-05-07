import { useState } from 'react';
import { useNavigate } from 'react-router';

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function handleSearchOrder(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSearchOrder}>
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-800 focus:ring focus:ring-yellow-500 focus:ring-opacity-40 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
