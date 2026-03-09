import {  ArrowRight, Zap } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type HeroSectionDictionary = {
    home :{
        title:String
        subtitle:String
        sylogan:String
    }
}
type HeroSectionProps = {
    dict:HeroSectionDictionary
}

const HeroSection = ({dict}:HeroSectionProps) => {

  return (
    <section className="py-10 px-5 md:px-16 lg:px-30 bg-[#fff0e7] dark:bg-background ">
        <div className='grid md:grid-cols-2'>
            <div className='flex flex-col justify-center gap-5'>
                <div className='inline-flex md:flex-start  w-fit py-1 rounded-lg text-white items-center gap-2 px-3 dark:bg-[#ff7500]/20 bg-[#ff7500]'>
                    <Zap size={18}/>
                    <p className='text-xs'>{dict.home.sylogan}</p>
                </div>
                <h1 className="md:text-6xl text-4xl  font-semibold tracking-tight">
                {dict.home.title}
                </h1>
                <p className='text-muted-foreground'>{dict.home.subtitle}</p> 
                <div className='mt-5 flex gap-5'>
                    <Link className='bg-[#ff7500] px-5 py-3 text-white rounded-full flex items-center gap-2' href='/signin'>
                        <p>Get started</p>
                        <ArrowRight/>
                    </Link>
                    <Link className='border border-[#ff7500] px-5 py-3 text-[#ff7500] hover:bg-[#ff7500] hover:text-white duration-100 rounded-full flex items-center gap-2' href='/signin'>
                        <p>Brouse courses</p>
                        <ArrowRight/>
                    </Link>
                    
                </div> 
            </div>
            <div className='hidden md:flex justify-end'>
                <div className='overflow-hidden h-150 flex  '>
                <Image className='h-150 object-cover' src='/images/teacher1.png' alt='student1' width={400} height={400}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection