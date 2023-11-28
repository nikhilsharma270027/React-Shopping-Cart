import { useEffect, useState } from 'react';
import { useContext } from 'react'
import { CartContext } from '../CartContext'

// const Cart = () => {
//   const { cart } = useContext(CartContext);
//   useEffect(() => {
//     console.log(cart); // This will reflect the updated cart
//   }, [cart]);
//   useEffect(() => {
//       if(!cart.items){
//         return;
//       }
//       console.log('cart', Object.keys(cart.items))
//   }, []);

const Cart = () => {
  let total = 0;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
      if (!cart.items) {
          return;
      }

      // Read data directly from the local JSON file
      fetch('allProduct.json')  // Adjust the path based on your project structure
          .then(res => res.json())
          .then(allProducts => {
              // Filter products based on the cart items
              const cartProducts = allProducts.filter(product => cart.items[product._id.$oid]);

              // Update the products state
              setProducts(cartProducts);
          })
          .catch(error => {
              console.error('Error reading allProduct.json:', error);
          });
  }, [cart]);

  const getQty =(productId) => {
    return cart.items[productId];
  }

  const increment = (productId) => {
      const existingQty = cart.items[productId];
      const _cart = {...cart};
      _cart.items[productId] = existingQty + 1;
      _cart.totalItems = _cart.totalItems + 1;
      setCart(_cart);

  }

  const decrement = (productId) => {
    const existingQty = cart.items[productId];
    if(existingQty === 1){ // making sure it does not exceed less than 1 
      return;
    }
    const _cart = {...cart};
    _cart.items[productId] = existingQty - 1;
    _cart.totalItems = _cart.totalItems - 1;
    setCart(_cart);
  }

  const getSum = (productId, price) => {
      const sum = price * getQty(productId)
      total += sum; // will add total per product / single row total
      return sum;
  }

  const handleDelete = (productId) => {
      const _cart = {...cart};
      const qty = _cart.items[productId];
      delete _cart.items[productId];
      _cart.totalItems -= qty;
      setCart(_cart);
      const updateProductList = products.filter((product) => product._id.$oid !== productId);
      setProducts(updateProductList)
  }

  const handleOrderNow = () => {
      window.alert('Order Placed Successfully!');
      setProducts([]);
      setCart({});
  }

  return (
    !products.length // If there is now product, show the empty cart img
    ?  <img className='mx-auto w-1/2 mt-12' src='/images/empty-cart.png' alt=''/> 
    :  // or show the product added list
    <div className='container mx-auto lg:w-1/2 w-full pb-24'>
      <h1 className='my-12 font-bold'>Cart Items</h1>
      <ul>
        {
            products.map(product => {
              return (
                <li className='mb-12' key={product._id.$oid}>
          <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img className='h-16' src='/images/peproni.png' alt=''></img>
                <span className='font-bold ml-4 w-48'>{ product.name }</span>
              </div>
              <div className='flex items-center'>
                <button onClick={() => {decrement(product._id.$oid)}} className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>-</button>
                <b className='px-2'>{ getQty(product._id.$oid) }</b>
                <button onClick={() => {increment(product._id.$oid)}} className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>+</button>
              </div>
              <span>₹ { getSum(product._id.$oid, product.price) }</span>
              <button onClick={() => { handleDelete(product._id.$oid) }} className='bg-red-500 px-4 py-2 rounded-full leading-none text-white'>Delete</button>
          </div>
        </li>
              )
            })
        }
        

       
      </ul>
      <hr className='my-6'/>
      <div className='text-right'>
        <b>Grand Total</b> : ₹ { total }
      </div>
      <div className='text-right mt-6'>
        <button onClick={() => { handleOrderNow() }} className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>Order Now</button>
      </div>
    </div>

  )
}

export default Cart


// If you're using a JSON file instead of an API endpoint, you won't need to use the 
// priceFetched state to control the fetching behavior. The condition checking for 
// priceFetched is typically used to prevent unnecessary API calls, especially in scenarios
//  where fetching data is an asynchronous operation.

// If you're loading data from a JSON file locally, it usually involves a synchronous operation,
//  and you won't encounter the same timing issues as with asynchronous API calls. Therefore, 
//  you can simplify your code when working with a local JSON file.