import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import Currency from "react-currency-formatter";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Stripe } from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripe";

function Checkout() {
  const [loading, setLoading] = React.useState(false);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = React.useState(
    {} as { [key: string]: Product[] }
  );

  // useEffect to group items added to cart
  React.useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);
    // checkout session
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      { items: items }
    );
    //internal server error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // redirect to checkout session page

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);

    setLoading(false);
  };
  return (
    <div className="min-h-screen overflow-hidden bg-[#808080]">
      <Head>
        <title>UtanaStitches - Bag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto pb-25">
        <div className="px-5 py-5 text-center">
          <h1 className="my-4 text-3xl text-red-900 fotn-semibold lg:text-4xl">
            {items.length > 0
              ? `Thanks for shopping with us, you have ${items.length} products in your bag`
              : "Your bag has no products, please, visit the store and shop"}
          </h1>
          <p className="my-4 text-4xl text-[#156556]">
            We Deliver Anywhere in the world
          </p>

          {items.length === 0 && (
            <Button
              title="Shop For Products"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-6 md:mx-10">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} id={key} items={items} />
            ))}
            <div className="max-w-3xl my-12 mt-6 ml-auto">
              <div className="divide-y divide-gray-300">
                <div className="pb-5">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>
                      {basketTotal > 100000 ? (
                        "FREE"
                      ) : (
                        <Currency quantity={basketTotal * 0.1} currency="USD" />
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{" "}
                      <p className="flex cursor-pointer items-center text-red-300 hover:text-[#61181E]">
                        Enter zip code
                        <ChevronDownIcon className="h-9 w-9 text-[#E4C9A8]" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal * 0.1} currency="USD" />
                  </h4>
                </div>
              </div>
              <div className="my-20 space-y-5">
                <h4 className="text-xl font-semibold">
                  How would you love to checkout?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-col items-center flex-1 order-2 p-8 py-12 text-center bg-gray-100 rounded-xl">
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>With Zella Card</span>
                      <span>
                        $283.29/mo. at 0% APR<sup className="top-1"></sup>
                      </span>
                    </h4>
                    <Button title="Check out with Zella for Monthly Installments" />
                    <p className="mt-3 max-w-[300px] text-[16px]">
                      First 30 percent to be paid as down payments of the total
                      amount.
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1 p-8 space-y-8 bg-gray-100 rounded-xl py-14 md:order-2">
                    <h4 className="flex flex-col mb-4 text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal * 0.1} currency="USD" />
                      </span>
                    </h4>
                    <Button
                      noIcon
                      loading={loading}
                      title="CheckOut"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
