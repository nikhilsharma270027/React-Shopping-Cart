import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import About from "./pages/About";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Navigation from "./components/Navigation";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import { getCart, storeCart } from "./helpers";


//const App = () => {  arrow function
const App = () => {
  const [cart,setCart] = useState({});
  //fetch cart from local storage3
  useEffect(() => {
    getCart().then(cart => {
      setCart(JSON.parse(cart));
    });
  }, []);
  
  // Save cart to local storage when it changes
  useEffect(() => {
    storeCart(JSON.stringify(cart));
}, [cart]);


  return (
    //component{home} is like render
    
      <Router>
        <CartContext.Provider value={{ cart, setCart }}> 
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} end></Route>
              {/* <Route path="/about" element={<About />}></Route> */}
              <Route path="/products" element={<ProductsPage />}></Route>
              <Route path="/products/:_id" element={<SingleProduct />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
            </Routes>
        </CartContext.Provider>
      </Router>
    
  );
}

export default App;

/* <a href="/">Home</a> //achor tag will reload whole page
        <a href="/About">About</a> */