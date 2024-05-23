import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser, selectUser } from './reducers/userSlice.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Profile from './components/User/Profile.jsx';
import Home from './Home/Home.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import SpecificProduct from './components/Product/SpecificProduct.jsx';
import UserOptions from './components/User/UserOptions.jsx'; 
import ProtectedRoute from './Home/ProtectedRoute.jsx';
import UpdateProfile from './components/User/UpdateProfile.jsx'
import UpdatePassword from './components/User/UpdatePassword.jsx'
import Cart from './components/Product/Cart.jsx'
import Shipping from './components/Product/Shipping.jsx'
import ConfirmOrder from './components/Product/ConfirmOrder.jsx'
import Orders from './components/Product/Orders.jsx'
import Dashboard from './components/Admin/Dashboard.jsx'
import ProductList from './components/Admin/ProductList.jsx'
import NewProduct from './components/Admin/NewProduct.jsx';
import UpdateProduct from './components/Admin/UpdateProduct.jsx'
import OrderList from './components/Admin/OrderList.jsx'
import ProcessOrder from './components/Admin/ProcessOrder.jsx';
import UserList from './components/Admin/UserList.jsx'



const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Use useSelector to get the user from the state

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
   
  }, [dispatch]);

  return (
    <Router>
      <Header user={user}/>
      {user && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/search" element={<SpecificProduct />} />
        <Route 
          path="/login" 
          element={
              <ProtectedRoute isAuthenticated={!user}>
                <Login/>
              </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Profile />
              </ProtectedRoute>
          } 
        />
         <Route 
          path="/me/update" 
          element={
              <ProtectedRoute isAuthenticated={!!user}>
                <UpdateProfile/>
              </ProtectedRoute>
          } 
        />
        <Route 
          path="/password/update" 
          element={
              <ProtectedRoute isAuthenticated={!!user}>
                <UpdatePassword/>
              </ProtectedRoute>
          } 
        />
        <Route path="/cart" element={<Cart/>} />
        <Route 
          path="/shipping" 
          element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Shipping/>
              </ProtectedRoute>
          } 
        />
        <Route path='/order/confirm' element={<ConfirmOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route 
          path="/admin/dashboard" 
          element={
              <ProtectedRoute isAuthenticated={!!user} adminOnly={true}
              admin={user?.role === "admin" ? true : false}>
                <Dashboard/>
              </ProtectedRoute>
          } 
        />
         <Route 
          path="/admin/products" 
          element={
              <ProtectedRoute isAuthenticated={!!user} adminOnly={true}
              admin={user?.role === "admin" ? true : false}>
                <ProductList/>
              </ProtectedRoute>
          } 
        />
         {/* <Route 
          path="/admin/product" 
          element={
              <ProtectedRoute isAuthenticated={!!user} adminOnly={true}
              admin={user?.role === "admin" ? true : false}>
                <NewProduct/>
              </ProtectedRoute>
          } 
        /> */}
        <Route path="/admin/product" element={<NewProduct/>} />
        <Route path="/admin/product/:id" element={<UpdateProduct/>} />
        <Route path="/admin/orders" element={<OrderList/>} />
        <Route path="/admin/order/:id" element={<ProcessOrder/>} />
        <Route path="/admin/users" element={<UserList/>}/>



      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
