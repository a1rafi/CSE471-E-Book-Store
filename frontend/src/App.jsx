import React, { useEffect } from 'react'; 
import Home from './pages/Home'; 
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import {Routes,Route} from "react-router-dom";
import AllBooks from"./pages/AllBooks"; 
import LogIn from"./pages/LogIn"; 
import SignUp from"./pages/SignUp"; 
import Cart from"./pages/Cart"; 
import Profile from"./pages/Profile"; 
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './redux/auth';
import Wishlist from './components/Profile/Wishlist';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from "./pages/AllOrders.jsx";
import AddBooks from "./pages/AddBook.jsx";


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div> 
      
        <Navbar /> 
        <Routes>
          < Route exact path="/" element={<Home />}/> 
          <Route  path="/AllBooks" element={<AllBooks/>}/> 
          
          <Route  path="/cart" element={<Cart />}/> 
          <Route  path="/profile" element={<Profile />}> 

            {/* <Route index element = {<Wishlist />}/> */}
            {role === "user"?  (<Route index element={<Wishlist/>}/>):(<Route index element={<AllOrders/>}/>)}
            {role === "admin" &&(<Route path = "/profile/add-book" element = {<AddBooks/>}/>)}

            <Route path='/profile/orderHistory' element={<OrderHistory />}/>
            <Route path='/profile/settings' element={<Settings />}/>

          </Route>
          <Route  path="/SignUp" element={<SignUp />}/> 
          <Route  path="/LogIn" element={<LogIn/>}/> 
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
        <Footer /> 
        

     
      
      
    </div>
  );
};

export default App;

  // return (
  //   <div>
      
  //     <Navbar />
  //   <Routes>
  //     <Route exact path ="/" element = {<Home /> }/>
  //     <Route  path="/AllBooks" element={<AllBooks/>}/>
  //     <Route  path="/SignUp" element={<SignUp />}/> 
  //     <Route  path="/LogIn" element={<LogIn/>}/> 
  //     <Route  path = "/cart" element = {<Cart/> }/>
  //     <Route  path = "/profile" element = {<Profile/> }>
      
  //   {role === "user"?  <Route index element={<Wishlist/>}/>:<Route index element={<AllOrders/>}/>}
  //   {role === "admin" &&(
  //     <Route path = "/profile/add-book" element = {<AddBook/>}
  //     />
  //   )}
  //     <Route path="/profile/orderHistory" element={<OrderHistory/>}/>
  //     <Route path="/profile/settings" element={<Settings/>}/>
  //     </Route> {/*by default this profile pagfe will be here */}
  //     <Route path="view-book-details/:id" element={<ViewBookDetails/>}/>
  //     <Route  path = "/updateBook/:id" element = {<UpdateBook/> }/>
  //     </Routes>
  //     <Footer /> 
  //   </div>
  // );
  // };

  // export default App;
