import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Error from './ui/Error';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './featutes/menu/Menu';
import Cart from './featutes/cart/Cart';
import Order, { loader as orderLoader } from './featutes/order/Order';
import CreateOrder, { action as createOrderAction } from './featutes/order/CreateOrder';
import AppLayout from './ui/AppLayout';

/* 
  Using react-router v6.4+ data router APIs: createBrowserRouter accepts a tree
  of route objects instead of the older JSX-based <BrowserRouter>/<Routes>/<Route>
  setup. This lets you declare nested routes and index routes as plain objects and
  attach route-specific behavior such as loaders (data fetching), actions (form
  submissions), and errorElement (per-route error UI).

  Pass the created router into <RouterProvider router={router} /> to enable routing.
  Advantages:
  - Centralized, easier-to-read route configuration
  - Built-in data-loading and mutation hooks scoped to routes
  - Per-route error handling and better nested UI composition via children arrays
  - Cleaner migration path for apps that need server-like data patterns on the client

  If you prefer the simpler JSX approach and don't need the data APIs, the old
  <BrowserRouter>/<Routes>/<Route> composition remains available, but createBrowserRouter
  is recommended for feature-rich apps.
*/
const router = createBrowserRouter([
  {
    // The root route that has no path, 
    // it's called the index route or layout route 
    // as it renders the main layout that doesn't change,
    // and nests all other routes inside it.
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      // Define the routes for the main content area
      // These routes will be rendered inside the Outlet in AppLayout 
      // using <Outlet /> component
      { path: '/', index: true, element: <Home />, },
      // Define the imported loader for the menu route,
      // then use it in the menu component with 'useLoaderData()'
      // with no arguments, because it's already defined in the route.
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart />, },
      {
        path: '/order/new',
        element: <CreateOrder />,
        errorElement: <Error />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />
      },
    ]
  },
  // A not found route
  // no need to specify error path, cause it's already handled by the layout route with errorElement.
  // { path: '*', element: <Error />, },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
