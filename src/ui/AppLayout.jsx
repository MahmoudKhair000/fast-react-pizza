import { Outlet, useNavigation } from 'react-router';
import CartOverview from '../features/cart/CartOverview';
// import Footer from "./Footer"
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  // console.log(navigation.state);
  // useNavigation(); returns a navigation object with the current state and other important properties that we can use throughout the entire application.

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="overflow-y-scroll">
          <main className="mx-auto max-w-3xl">
            <Outlet />
            {/* To render nested routes in AppLayout */}
          </main>
        </div>
      )}
      <CartOverview />
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
