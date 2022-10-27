import { ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../redux/basketSlice'
import { urlFor } from '../sanity'
import toast from 'react-hot-toast';

interface Props{
    product: Product
}

function Product({product}: Props) {
  const dispatch = useDispatch();
  const addItemToCart = ()=> {
    dispatch(addToBasket(product));
    toast.success(`${product.title} added to cart`, {position: "bottom-center", style: {width: "320px", height: "100px", backgroundColor:"#fff", color: "#61181E", fontSize: 18, fontWeight: "bold"},icon: '👏',duration: 3000,iconTheme: {
    primary: '#000',
    secondary: '#61181E',
    
  },})
}
  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#120302] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative w-full h-64 md:h-72">
        <Image src={urlFor(product.image[0]).url()} layout="fill" objectFit="contain"/>
      </div>

      <div className="flex items-center justify-between flex-1 space-x-4">
        <div className="space-y-2 text-xl text-white md:text-2xl">
        <p>
            {product.title}
        </p>
        <p>
            {product.price}
        </p>
      </div>

      <div className="shoppingCart" onClick={addItemToCart}>
        <ShoppingCartIcon className="w-8 h-8 text-white"/>  
      </div>
      </div>

      
    </div>
  )
}

export default Product
