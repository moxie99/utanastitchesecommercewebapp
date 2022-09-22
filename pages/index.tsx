import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import { Tab } from '@headlessui/react'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from '../utils/fetchProducts'
import Product from '../components/Product'
import Cart from '../components/Cart'

interface Props{ 
  categories: Category[];
  products: Product[];
}
const Home = ({categories, products}: Props) => {
  
  const showProducts = (category: number)=>{
    return products.filter((product)=> product.category._ref === categories[category]._id)
    .map((product)=> <Product product={product} key={product._id}/>);
    //filter product by categoryPrincipal Web Applications Developer
    // map the product
  }
  return (
    <div className="">
      <Head>
        <title>UtanaStitches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header/>
      
      <Cart/>
      <main className="relative -h-[200vh] bg-[#ffffff]">
        <HeroSection/>
        <section className="relative z-40 mt-[100vh] min-h-screen bg-[#61181E]">
          <div className="py-20 space-y-10 ">
            <h1 className="text-4xl font-medium tracking-wide text-center text-[#18615B] md:text-5xl">
            Available In Store
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {
                categories.map((category) => (
                  <Tab
                  key={category._id}
                  id={category._id}
                  className={({selected}) => 
                  `whitespace-nowrap rounded-t-lg py-3 px-3 text-sm font-light
                  outline-none md:py-4 md:px-6 md:text-base ${
                    selected
                    ? "borderGradient bg-[#18615b] text-[#120302]"
                    : "border-b-2 border-[#120302] text-[#d4af37]"
                  }
                  `
                }
                  >
                      {category.title}
                  </Tab>
                ))
              }
            </Tab.List>
            <Tab.Panels className="mx-auto pt-15 pb-25 max-w-fit sm:px-4">
              <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

// fetching from server 
export const getServerSideProps: GetServerSideProps<Props>= async ()=>{
  const categories = await fetchCategories();
  const products = await fetchProducts();
  return {
    props:{
      categories,
      products,
    },
  }
}

