"use client"
import Providers from "@/app/provider";
import Loading from "@/components/loading/loding";
import NavigationBar from '@/components/navbar/navigation-bar';
import Head from '@/components/templates/head';
import ThemeProvider from '@/context/toggle-theme-provider';
import { store } from "@/store/index";
import "@fontsource/source-code-pro";
import { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reactflow/dist/style.css';

import './globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <html lang="en">

      <Head />
      
      <body>
        {
          isLoading ?
            <Loading />
            :
                <>
                <Providers>
                  <Provider store={store}>
                    <ThemeProvider>
                      <NavigationBar />
                      {children}
                    </ThemeProvider>
                  </Provider>
                </Providers>
                <ToastContainer />
                </>
        }
      </body>
    </html>
  );
}
