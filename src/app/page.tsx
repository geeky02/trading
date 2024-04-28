'use client';
import HomepageHeader from '@/components/templates/homepage-header';
import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { InView } from "react-intersection-observer";
import classes from "./home.module.css";

function SectionWrapper({
  imageUrl,
  backgroundClassName,
  children,
}: {
  imageUrl: string;
  backgroundClassName: string;
  children: React.ReactNode;
}) {

  return (
    <div className='overflow-x-hidden overflow-hidden'>
      <div className="">
        <div className={`
            ${backgroundClassName} flex lg:flex-row flex-col items-center 
            justify-center hover-effect w-[100%] lg:mx-auto 
            dark:bg-gray-900
          `}
        >
          <div className=" flex-none lg:-mr-4 m-10 mt-20">
            <Image
              alt='Image'
              className="w-[200px] h-[200px] duration-300"
              src={imageUrl}
              width={200}
              height={200}
            />
          </div>
          <div className="flex-initial w-full ml-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Home() {

  const [show, setShow] = useState(false);

  return (
    <InView onChange={(inView) => setShow(inView)} className={classNames(classes.main, "flex flex-col relative")}>
      <HomepageHeader />
      
    </InView>
  )
}
