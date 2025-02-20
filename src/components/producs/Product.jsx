import React from 'react'
import { NavLink } from 'react-router-dom'

const Product = ({item}) => {

  const {
    cart,
    wishlist,
    purchase,
    addToCart,
    addToWishlist,
    addToParchase,
    descendingProductList,
    sortedProduct,
  } = CartContext()
  return (
  <div className="card bg-base-100 w-[100%] md:w-[45%] lg:w-[30%] shadow-xl p-3 " key={item?.product_id}>
      <figure className=" my-1 pt-1">
        <img
          src={item?.product_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkA6AqvKiCfu8HTMpbCSpa-W2uKiehcy66Pg&s"}
          alt="Shoes"
          className="rounded-xl h-[150px]  w-full border" />
      </figure>
      <div className="">
        <h2 className="card-title">{item?.product_title.slice(0, 15)}...</h2>
        <p>Price:{item?.price}</p>
        <div className="card-actions flex justify-start items-center mt-3">
          <NavLink to={`/details/${item?.product_id}`} className="border-blue border-[1px] rounded-[20px] px-5 py-1 my-1 hover:bg-blue hover:text-[white]">View Details</NavLink >
          <div className='flex justify-center items-center gap-3'>
            <button className=' w-[80%]  text-blue ' onClick={() => addToCart(item)}>  <i className="fa-solid fa-cart-arrow-down "></i></button>
            <button onClick={() => addToWishlist(item)}> <i className="fa-regular fa-heart text-xl  hover:text-[crimson]"></i></button>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Product