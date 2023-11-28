import { useEffect, useState } from "react" //hook
import { useParams, useNavigate } from "react-router-dom"
// params is used when  to access the dynamic parameters in 
//the URL of the current route. This is useful when we need to 
//display different content or perform different actions depending on 
//the route that the user is on.
//when we want to take id from the url request on the server for the id

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  // const navigateToAnotherPage = () => {
  //   navigate('/'); // Navigate to another page
  // };  
  //console.log(params)
  // useEffect(() => {
  //     fetch("allProduct.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  // },[])
  useEffect(() => {
    fetch("allProduct.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the product with the matching _id in the JSON data
        const foundProduct = data.find((product) => product._id.$oid === params._id);
        setProduct(foundProduct);
        console.log(foundProduct);
      });
  }, [params._id]);
 

  return (
    <div className="container mx-auto mt-12">
      <button className="mb-12 font-bold" onClick={ ()=> {navigate('/')} }>Back</button>
      <div className="flex">
        <img src="/images/peproni.png" alt="pizza"/>
        <div className="ml-16">
          <h1 className="text-xl font-bold" >{product.name}</h1>
          <div className="text-sm">{product.size}</div>
          <div className="font-bold mt-2">$499</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add</button>
        </div>
      </div>
        
    </div>
  )
}

export default SingleProduct
