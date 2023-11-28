import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../CartContext";

const Product = (props) => { //PASSING PROPS object
  const [isAdding, setIsAdding] = useState(false)
  const { cart, setCart } = useContext(CartContext);
   // Calling useContext method and passing CartContext
  //props.Product
  //console.log(props);
  //we product data inside props So we destructurer the object 
  const { product } = props;  // instead of using props. every where lets destructure it.
  //console.log(product)
  //console.log(product._id.$oid)
  const addToCart = (event, product) => {
    event.preventDefault();
    let _cart = {...cart} //... means cloning //{ items: {} empty object }
    if(!_cart.items) {
        _cart.items = {}
    }
    if(_cart.items[product._id.$oid]){
      _cart.items[product._id.$oid] = _cart.items[product._id.$oid] + 1;
    } else {
      _cart.items[product._id.$oid] = 1;
    }

    if(!_cart.totalItems){
      _cart.totalItems = 0;
    }

    _cart.totalItems += 1;
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
        setIsAdding(false)      
    }, 1000);
    // let cart = {
    //   item: {
    //     '11111111111111':2,
    //     '11111111111112':2
    //   },
    //   totalItems: 5,

    // }
    console.log(product);
  }
  return (
    <Link to={`/products/${product._id.$oid}`}>
      <div>
      <div>
        <img src="/images/peproni.png" alt="pizza" />
        <div className="text-center">
          <h2 className="text-lg font-bold py-2">{product.name}</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
          {product.size}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span>Rs.{product.price}</span>
          <button disabled={isAdding} onClick={(e)=> {addToCart(e, product)}} className={`${ isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>
            ADD{isAdding ? 'ED' : ''}
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Product;
