import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Currency from "react-currency-formatter";
import { GetServerSideProps } from "next";
import { fetchLineItems } from "../utils/fetchLineItems";
import { useSession } from "next-auth/react";

interface Props {
  products: StripeProduct[];
}

function success({ products }: Props) {
  const router = useRouter();
  const { session_id } = router.query;
  const [trackingNumber, setTrackingNumber] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);
  const [showOrderSummary, setShowOrderSummary] = React.useState(false);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  //   google login session
  const { data: session } = useSession();

  React.useEffect(() => {
    setTrackingNumber(uuidv4());
  }, []);

  React.useEffect(() => {
    setMounted(true);
  });

  return (
    <div>
      <Head>
        <title>Thank you - Utana</title>
      </Head>

      <header className="max-w-xl mx-auto">
        <Link href="/">
          {/* lg:hidden */}
          <div className="relative w-10 h-20 ml-4 transition cursor-pointer lg:hidden">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/1Asset_13.png/1599px-1Asset_13.png?20220911113012"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 pb-12 mx-auto max-w-x xl lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-40">
          <Link href="/">
            {/* lg:hidden */}
            <div className="relative w-20 h-40 transition cursor-pointer ml-14 sm:hidden lg:inline-flex">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/1Asset_13.png/1599px-1Asset_13.png?20220911113012"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>
          <div className="flex my-10 ml-5 space-x-4 lg:ml-15 xl:ml-1">
            <div className="flex items-center w-12 h-12 border-2 border-green-400 rounded-full justify center">
              <CheckIcon className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order Number: {session_id?.slice(-5) || "Fetching Id"}
              </p>
              <h4 className="text-lg">
                Thank You{" "}
                {session ? session.user?.name?.split(" ")[0] : "Guest"}
              </h4>
            </div>
          </div>

          <div className="p-4 mx-4 space-x-4 border border-gray-300 divide-y divide-gray-600 rounded-md lg:ml-14">
            <div className="pb-5 space-y-2">
              <p>Your Order has been Confirmed</p>
              <p className="text-sm text-gray-700">
                We are currently working on getting your orders ready and
                shipment to you, you can always check this page for the shipment
                status.
              </p>
            </div>
            <div className="flex pt-3 text-sm">
              <p className="font-medium text-gray-900">
                Other Tracking Number: {"  "}
              </p>
              <p>{trackingNumber}</p>
            </div>
          </div>

          <div className="p-4 mx-4 my-4 space-y-2 border border-gray-400 rounded-md lg:ml-16">
            <p>Order Updates</p>
            <p className="text-sm text-gray-700">
              You'll be getting updates on shipment and delivery through mail
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mx-4 my-10 text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Need Help ? Contact us</p>
            {mounted && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
                width={isTabletOrMobile ? "w-11/12" : "w-6/12"}
                padding="py-8"
              />
            )}
          </div>
        </section>

        {mounted && (
          <section className="overflow-y-scroll bg-gray-100 border-l border-gray-100 border-y lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="flex items-center justify-between max-w-xl px-4 py-6 mx-auto">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-4"
                >
                  <ShoppingCartIcon className="w-6 h-8" />
                  <p>Show Order Summary</p>
                  {showOrderSummary ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </button>
                <p className="text-sm font-medium text-red-900">
                  <Currency quantity={subtotal + subtotal * 0.1} />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className="max-w-xl px-6 py-6 mx-auto border-gray-200 divide-y lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="pb-6 space-y-6">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className="relative flex items-center justify-center w-20 h-20 text-xs bg-gray-100 border border-red-900 rounded-lg text-light-900">
                        <div className="relative w-12 h-12 rounded-lg motion-safe:animate-spin">
                          <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/1Asset_13.png/1599px-1Asset_13.png?20220911113012"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-900 rounded-lg -right-2 -top-2">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description}</p>
                      <p>
                        <Currency
                          quantity={product.price.unit_amount / 100}
                          currency={product.currency}
                        />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="py-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-800">Subtotal</p>
                    <p className="font-medium">
                      <Currency quantity={subtotal} />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-700">Discount</p>
                    <p className="font-medium">
                      <Currency
                        quantity={subtotal > 10000 ? subtotal * 0.0001 : 0}
                        currency="USD"
                      />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-700">Shipping</p>
                    <p className="font-medium">
                      <Currency quantity={subtotal * 0.001} currency="USD" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <p className="font-extrabold text-green-900">Total</p>
                  <p className="flex items-center text-xs text-gray-600 gap-x-2">
                    USD
                    <span className="text-xl font-medium text-gray-900">
                      <Currency
                        quantity={subtotal + subtotal * 0.001}
                        currency="USD"
                      />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default success;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);
  return {
    props: {
      products,
    },
  };
};
