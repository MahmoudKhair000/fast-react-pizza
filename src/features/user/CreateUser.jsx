import { useState } from 'react';
import Button from '../../ui/Button';

import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';

function CreateUser() {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-stone-800 sm:text-sm">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-3 w-72 overflow-hidden rounded-md"
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
