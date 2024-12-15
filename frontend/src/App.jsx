import React, { useEffect } from 'react'; 
import Home from './pages/Home'; 
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import AllBooks from "./pages/AllBooks"; 
import LogIn from "./pages/LogIn"; 
import SignUp from "./pages/SignUp"; 
import Cart from "./pages/Cart"; 
import Profile from "./pages/Profile"; 
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './redux/auth';
import Wishlist from './components/Profile/Wishlist';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from "./pages/AllOrders.jsx";
import AddBooks from "./pages/AddBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import Payment from "./pages/Payment.jsx";
import Search from "./pages/Search.jsx";


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div> 
      <Navbar /> 
      <Routes>
        {/* Main Routes */}
        <Route exact path="/" element={<Home />} /> 
        <Route path="/AllBooks" element={<AllBooks />} /> 
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/search" element={<Search />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<Profile />}>
          <Route 
            index 
            element={role === "user" ? <Wishlist /> : <AllOrders />} 
          />
          {role === "admin" && (
            <Route path="add-book" element={<AddBooks />} />
          )}
          <Route path="orderHistory" element={<OrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/LogIn" element={<LogIn />} /> 

        {/* Other Routes */}
        <Route path="/updateBook/:id" element={<UpdateBook />} /> 
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer /> 
    </div>
  );
};

export default App;
