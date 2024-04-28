"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';

const words: string[] = [
  "developers.",
  "designers.",
  "creators.",
  "everyone.",
  "<END>",
];
const colour: string[] = [
  "text-[#00000]",
  "text-[#ffb4ed] dark:text-[#FFD6F5]",
  "text-[#FF8F8F]  dark:text-[#FF8F8F]",
  "text-[#ffef40] dark:text-[#FFF7A1]",
];

const TITLE = "Welcome to Commnuce Trading Bot";



export default function HomepageHeader() {

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('-----------This is the loginstatus--------', isLoggedIn)
  const [metamaskAddress, setMetamaskAddress] = useState<string | undefined>('')
  const [scrollPosition] = useState(0);
  console.log('-------------This is the scrollPosition------------', scrollPosition)
  const headerRef = useRef<any>(null);
  const [headerHeight, setHeaderHeight] = useState(20);
  console.log('---------------This is teh headerHeight------------', headerHeight)
  useEffect(() => {
    if (index === words.length) return; // if end of words, return
    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }
    if (index === words.length - 1)
      setIndex(() => 0)
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
      75, 25));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);


  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 250);
    if (index === words.length) return;

    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (headerRef?.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);


  useEffect(() => {
    if (metamaskAddress) {
      console.log('-', metamaskAddress);
      toast.success(`You are logged in with ${metamaskAddress}`, { autoClose: 2000 });
    }
  }, [metamaskAddress])

  return (
    <header
      ref={headerRef}
      className={`
        relative 
        z-10 
        h-[100vh]
        dark:bg-gray-900 
        
        text-center 
        overflow-hidden 
        duration-500
        `}
    >

      <div className="px-0 py-15 m-auto">
        <img src="back4.jpg" alt="Background" className="w-screen h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className='flex lg:flex-row flex-col mt-[100px]'>
            <div className='m-auto w-full lg:w-1/2 flex flex-col items-center justify-center'>
              <div className='w-auto sm:w-[710px] sm:h-[250px]'>
                <h1 className="text-4xl sm:text-6xl sm:pb-3 dark:text-white">{TITLE}</h1>
                <div className='hidden sm:block'>
                  <p className="hero__subtitle text-xl sm:text-4xl dark:text-white">
                    <Link href={"/dashboard"} className="underline">Start Trading Bot</Link>
                    <br />
                    <span
                      className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}
                    >
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className='lg:block w-full lg:w-1/2 h-full lg:-mr-44 '>
              <Image src="/back1.jpg" width={700} height={700} alt=" Logo" className='bg-opacity-50' style={{ opacity: '50%' }} />
            </div>
          </div>
        </div>
        <div className='lg:block w-full lg:w-1/2 h-full lg:-mr-44 '>
          <Image src="/back4.jpg" width={700} height={700} alt="Logo" className='bg-opacity-50' style={{ opacity: '50%' }} />
        </div>
      </div>
    </header>
  );
}

export const getHeaderClasses = (position: number, height: number) => {
  if (position > height / 2) {
    return "rounded-b-lg shadow-lg mx-5";
  }
  return "";
};
