import Product from "../components/Product";
import { useState, useEffect } from "react";
//import { CartContext } from '../CartContext'
const Products = () => {
  //const { name } = useContext(CartContext)
  const [products, setProducts] = useState([]);
  //useState is a () ,returns array/ destructrimg
  useEffect(() => {
    fetch("allProduct.json")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        // Assuming your JSON contains an array of products, update the state with the data
        setProducts(data);
      });
  }, []); //dependency array
  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-8">Products </h1>
      <div className="grid grid-cols-5 my-8 gap-24 ">
        {
          products.map((product) => (
            <Product key={product._id.$oid} product={product} />
          ))
          //it's used to iterate over each product in the products array
          //product={product} is a props ,we pass property frm one component to other component
          //product: This prop is used to pass the individual product data to the Product component
          //so that it can render the product's details.
        }
      </div>
    </div>
  );
};

export default Products;
