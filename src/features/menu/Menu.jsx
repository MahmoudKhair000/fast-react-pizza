import { useLoaderData } from 'react-router';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // Fetch menu data using the loader of react-router
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <>
      <h1 className="px-4 py-5 text-4xl font-bold">Menu</h1>
      <ul className="divide-y-2 divide-stone-200 px-2">
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </>
  );
}

// Use a React Router loader to fetch menu data before rendering (render-as-you-fetch).
// The loader below returns the data, which this component reads via useLoaderData().
// we could just load the menu data directly in the component, but we want to take advantage of React Router's data loading capabilities.
// With React Router, we can define a loader function that fetches the data before the component is rendered.

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
