"use client"

import CryptoDetails from "@/components/CryptoDetails"
import { useParams } from "next/navigation"

const Crypto = () => {

    const params = useParams()

    const coinId = params?.id as string;
    

    return (
        <>
            <CryptoDetails coinId={coinId}/>
        </>
    )
}

export default Crypto
