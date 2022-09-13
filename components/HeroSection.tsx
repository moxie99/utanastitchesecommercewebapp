import Image from 'next/image'
import React from 'react'
import Button from './Button'

function HeroSection() {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="space-y-3 text-3xl font-semibold tracking-wider lg:text-6xl xl:text-7xl">
            <span className="block text-transparent bg-gradient-to-r from-pink-800 to-red-100 bg-clip-text">
                Designed
            </span>
            <span className="block">
                By Creativity
            </span>
            <span className="block">
                Crafted Into Quality
            </span>
        </h1>
        <div className="space-x-8">
            <Button title="BUY NOW"/>
            
            <a className="link">Check Store</a>
        </div>
      </div>
      <div className="relative hidden h-[450px] w-[450px transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Avatarforwebsite.jpg" layout="fill" objectFit="contain"/>
      </div>
    </section>
  )
}

export default HeroSection
