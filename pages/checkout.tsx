import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectBasketItems } from '../redux/basketSlice';

function Checkout() {
    const items = useSelector(selectBasketItems);
    const router = useRouter();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = React.useState({} as {[key: string]: Product[]})

// useEffect to group items added to cart
    React.useEffect(() =>{
      const groupedItems = items.reduce((results, item)=> {
        (results[item._id] = results[item._id] || []).push(item);
        return results;
      }, {} as {[key: string]: Product[]}
      ) 
      setGroupedItemsInBasket(groupedItems);
    }, [items]);
    
  return (
    <div className="min-h-screen overflow-hidden bg-[#808080]">
        <Head>
        <title>UtanaStitches - Bag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className="max-w-6xl mx-auto pb-25">
        <div className="px-5 py-5 text-center">
            <h1 className="my-4 text-3xl text-red-900 fotn-semibold lg:text-4xl">
                {items.length > 0 ? `Thanks for shopping with us, you have ${items.length} products in your bag`: "Your bag has no products, please, visit the store and shop"}
            </h1>
            <p className="my-4 text-4xl text-[#156556]">We Deliver Anywhere in the world</p>

            {
              items.length === 0 && 
              <Button title="Shop For Products" onClick={()=> router.push("/")}/>
            }
        </div>

        {
          items.length > 0 && (
            <div className="mx-6 md:mx-10">
              {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <CheckoutProduct key={key} id={key} items={items}/>
              ))}
            </div>
          )
        }
        
      </main>
    </div>
  )
}

export default Checkout