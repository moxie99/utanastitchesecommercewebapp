import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react'
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter";
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../redux/basketSlice';
import toast from 'react-hot-toast';

interface Props{
    items: Product[];
    id: string;
}
function CheckoutProduct({id, items}: Props) {
    const dispatch = useDispatch();
    const removeItemFromBasket = ()=> {
        dispatch(removeFromBasket({id}));
        toast.error(`${items[0].title} has been removed from cart`, {position:"bottom-center", style: {width: "600", height: "100px", backgroundColor:"#fff", color: "#61181E", fontSize: 18, fontWeight: "bold"}})
    }
  return (
    <div className="flex flex-col pt-10 pb-10 border-b border-[#E4C9A8] gap-x-6 lg:flex-row lg:items-center transition-all hover:scale-110 duration-150">
        <div className="relative w-64 h-64">
            <Image src={urlFor(items[0].image[0]).url()} layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-end flex-1 lg:items-center">
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col text-xl gap-x-10 lg:flex-row lg:text-2xl">
                        <h4 className="font-bold lg:w-96">
                            {items[0].title}
                        </h4>
                        <p className="flex items-end font-semibold gap-x-2">
                            {items.length}
                            <ChevronDownIcon className="text-[#E4C9A8] w-9 h-9"/>
                        </p>
                    </div>
                    <p className="flex items-end text-[#156556] cursor-pointer hover:text-[#61181E]">
                        Show Product Details
                        <ChevronDownIcon className="text-[#E4C9A8] w-9 h-9"/>
                    </p>

                </div>
                <div className="flex flex-col items-end space-y-4">
                    <h4 className="text-xl font-semibold lg:text-2xl">
                        <Currency quantity={items.reduce((total,item)=> total += item.price, 0)}
                        currency="USD"/>
                    </h4>
                <button onClick={removeItemFromBasket} className="text-[#156556]">
                    Remove Item
                </button>
                </div>
        </div>
    </div>
  )
}

export default CheckoutProduct