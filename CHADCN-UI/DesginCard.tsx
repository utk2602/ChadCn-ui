'use client'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Bug, Clock, Heart, PhoneCall, PlusCircle, Star, Video } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'


const DesignerCard = ({
    name,
    title,
    imageUrl,
    rating,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    Icon5,
}: {
    name: string
    title: string
    imageUrl: string
    rating: string
    Icon1: any
    Icon2: any
    Icon3: any
    Icon4: any
    Icon5: any
}) => {
    const icon1 = <Icon1 className='w-4' />
    const icon2 = <Icon2 className='w-4' />
    const icon3 = <Icon3 className='w-4' />
    const icon4 = <Icon4 className='w-4' />
    const icon5 = <Icon5 className='w-4' />
    const [isClicked, setIsClicked] = useState(false)
    const [isActive, setIsActive] = useState(0);

    const icons = [
        {
            icon: icon1,
        },
        {
            icon: icon2,
        },
        {
            icon: icon3,
        },
        {
            icon: icon4,
        },
        {
            icon: icon5,
        },
    ]
    return (
        <div className='w-[390px] z-10  rounded-[2.2rem] relative group p-3 bg-[#050505] flex flex-col gap-3'>
            <div className="p-2.5 border border-[#4A4A4A] rounded-[1.9rem] flex gap-4 bg-gradient-to-tl from-[#171717] to-[#2b2b2b]">
                <div className="w-[100px] h-[100px]  rounded-3xl overflow-hidden flex-shrink-0 p-px bg-white ">
                    <Image
                        src={imageUrl}
                        alt="idk"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </div>
                <div className=" w-full h-full pt-2 flex flex-col gap-2 pr-2">
                    <div className="">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <h1 className='font-extrabold text-lg leading-6'>{name}</h1>
                                <Image
                                    src={"/assets/verify.svg"}
                                    alt="idk"
                                    width={500}
                                    height={500}
                                    className="w-5 select-none"
                                />
                            </div>
                            <div className="border border-[#4A4A4A] rounded-full w-7 h-7 flex items-center justify-center">
                                <Heart fill={isClicked ? "#f17dae" : "none"} stroke={isClicked ? "#f17dae" : "#fff"} onClick={() => setIsClicked(prev => !prev)} className='w-3.5 cursor-pointer' />
                            </div>
                        </div>

                        <p className='font-light text-neutral-500 text-sm'>{title}</p>
                    </div>
                    <div className="font-light flex items-center gap-1">
                        <Star fill='#fde047' className='w-4 text-yellow-300' />
                        <p>{rating}</p>
                    </div>

                </div>
            </div>
            <div className="flex items-center justify-evenly gap-2">
                {icons.map((ic, i) => <div
                    style={{
                        boxShadow: isActive === i ? '0 4px 3px 0 #FEC5DC inset, 0 -4px 3px 0 #C63777 inset' : '0 4px 3px 0 #3c3c3c inset, 0 -4px 3px 0 #111214 inset'
                    }}
                    onClick={() => setIsActive(i)}
                    className={cn("w-[70px] aspect-[3.3/3] p-4 flex items-center justify-center rounded-[26px] cursor-pointer ", isActive === i ? "bg-[#FA99C0]" : "bg-gradient-to-t from-[#1a1a1a] to-[#292929]")}>
                    {React.cloneElement(ic.icon, {
                        fill: isActive === i ? '#fff' : '#4D4D4D',
                        stroke: isActive === i ? '#fff' : '#4D4D4D',
                        className: cn(
                            'w-full h-full',
                        )
                    })}
                </div>)}
            </div>
        </div>
    )
}

export default DesignerCard