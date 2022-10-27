import React from 'react';
import {ShoppingCartIcon} from "@heroicons/react/outline";
import Link from 'next/link';
import { useSelector } from "react-redux";
import { selectBasketItems } from '../redux/basketSlice';



function Cart() {
    const items = useSelector(selectBasketItems);
    if(items.length === 0) return null
  return (
    <Link href="/checkout">
        <div className="shoppingCartLink">
            {
                (items.length > 0 ) && (
                    <span className="shoppingCartLinkIcon">
                        {items.length}
                    </span>
                )}
        
        <ShoppingCartIcon className="w-10 h-10 headerIcon"/>
        </div>
    </Link>
  );
}

export default Cart;
