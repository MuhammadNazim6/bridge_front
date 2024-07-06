"use client"
import axios from 'axios'
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from 'react';
import loader from '@/public/anims/loader.json'
import Lottie from 'lottie-react';
import { IToken } from '@/components/interface/stateInterfaces';
import SwapSection from '@/components/SwapSection';
import Image from 'next/image';

//move to bc
const blockchains: { value: string, name: string, chainId: string }[] = [
  { value: "ethereum", name: "Ethereum (ETH)", chainId: '1' },
  { value: "op-mainnet", name: "OP Mainnet (OP)", chainId: '10' },
  { value: "cronos-mainnet", name: "Cronos Mainnet (CRO)", chainId: '25' },
  { value: "BNB-smart-chain-mainnet", name: "BNB Smart Chain (BNB)", chainId: '56' },
  { value: "metis-andromeda-mainnet", name: "Metis Andromeda Mainnet", chainId: '108' },
  { value: "polygon", name: "Polygon (MATIC)", chainId: '137' },
  { value: "x-layer-mainnet", name: "X Layer Mainnet (OKB)", chainId: '196' },
  { value: "kcc-mainnet", name: "KCC Mainnet (OKB)", chainId: '321' },
  { value: "zksync-mainnet", name: "zkSync Mainnet (OKB)", chainId: '324' },
  { value: "astar", name: "Astar (ASTR)", chainId: '592' },
  { value: "polygon-zkevm", name: "Polygon zkEVM (ETH)", chainId: '1101' },
  { value: "moonriver", name: "Moonriver (MOVR)", chainId: '1285' },
  { value: "mantle", name: "Mantle (MNT)", chainId: '5000' },
  { value: "ox-chain", name: "OX Chain (OX)", chainId: '6699' },
  { value: "klaytn-mainnet-cypress", name: "Klaytn Mainnet Cypress(KLAY)", chainId: '8217' },
  { value: "base", name: "Base (ETH)", chainId: '8453' },
  { value: "numbers-mainnet", name: "Numbers Mainnet (NUM)", chainId: '10507' },
  { value: "arbitrum-one", name: "Arbitrum One (ETH)", chainId: '42161' },
  { value: "avalanche", name: "Avalanche (AVAX)", chainId: '43114' },
  { value: "fantom", name: "Fantom (FTM)", chainId: '250' }
];


function Home() {

  const [srcTokenSelected, setSrcTokenSelected] = useState<IToken>()
  const [destTokenSelected, setDestTokenSelected] = useState<IToken>()
  const [srcTokens, setSrcTokens] = useState<IToken[]>([]);
  const [destTokens, setDestTokens] = useState<IToken[]>([]);
  const [srcTokensLoading, setSrcTokensLoading] = useState(false)
  const [destTokensLoading, setDestTokensLoading] = useState(false)



  const handleFetchSrcTokens = async (chainId: string) => {
    setSrcTokens([])
    setSrcTokenSelected(undefined)
    setSrcTokensLoading(true)
    try {
      const res = await axios.get(`https://bridge-back.onrender.com/api/getTokens/${chainId}`)
      const fetchedTokens: IToken[] = res.data.data
      setSrcTokens(fetchedTokens);
    } catch (error) {
      console.log(error);
    }
    setSrcTokensLoading(false)
  }

  const handleFetchDestTokens = async (chainId: string) => {
    setDestTokens([])
    setDestTokenSelected(undefined)
    setDestTokensLoading(true)
    try {
      const res = await axios.get(`https://bridge-back.onrender.com/api/getTokens/${chainId}`)
      const fetchedTokens: IToken[] = res.data.data
      setDestTokens(fetchedTokens);
    } catch (error) {
      console.log(error);
    }
    setDestTokensLoading(false)
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
      }}
      className='w-full px-4 md:px-0'>
      <div className="md:flex">
        <div className='flex justify-center items-center flex-col space-y-5 w-full'>

          <p className="md:text-lg text-sm text-white text-center">
            Select source chain
          </p>
          <Select onValueChange={handleFetchSrcTokens}>
            <SelectTrigger className="md:w-[500px] w-full bg-black text-accent md:p-6">
              <SelectValue placeholder="Open list" className='' />
            </SelectTrigger>
            <SelectContent className='bg-black'>
              {blockchains.map((x) => (
                <SelectItem key={x.chainId} value={x.chainId} className='cursor-pointer text-accent flex justify-between'>
                  <p> {x.name}</p>
                  <p> {x.chainId}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {srcTokensLoading && (<Lottie animationData={loader} className='h-20 md:h-40' />)}


          {srcTokens.length ? (
            <div className="max-h-64 w-full md:w-[500px] overflow-y-auto bg-gray-800 p-4 rounded-md custom-scrollbar">
              <div className="p-2 border-b border-gray-700 flex justify-between w-full">
                <p className='text-white w-1/4'>Logo</p>
                <p className='text-white w-1/4'>Name</p>
                <p className='text-white w-1/4'>Chain Id</p>
                <p className='text-white w-1/4'>Decimals</p>
              </div>
              {srcTokens.map((token) => (
                <>
                  <div
                    onClick={() => setSrcTokenSelected(token)}
                    key={token.address} className={`p-2 border-b border-gray-700 flex justify-between w-full cursor-pointer text-sm h-16 items-center ${srcTokenSelected?.name === token.name && 'bg-slate-950/35 p-3 rounded-lg'}`}>
                    <p className='w-1/4'>
                      <img src={token.logoURI} alt='' className='h-8 w-8'/>
                    </p>
                    <p className='text-white/60 w-1/4'>{token.name}</p>
                    <p className='text-white/60 w-1/4'>{token.chainId}</p>
                    <p className='text-white/60 w-1/4'>{token.decimals}</p>
                  </div>
                </>
              ))}
            </div>
          ) : (
            null
          )}
        </div>


        <div className='flex justify-center items-center flex-col space-y-5 w-full'>
          <p className="md:text-lg text-sm mt-10 md:mt-0 text-white text-center">
            Select destination chain
          </p>
          <Select onValueChange={handleFetchDestTokens}>
            <SelectTrigger className="md:w-[500px] w-full m-10 bg-black text-accent md:p-6">
              <SelectValue placeholder="Open list" className='' />
            </SelectTrigger>
            <SelectContent className='bg-black'>
              {blockchains.map((x) => (
                <SelectItem key={x.chainId} value={x.chainId} className='cursor-pointer text-accent flex justify-between'>
                  <p> {x.name}</p>
                  <p> {x.chainId}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {destTokensLoading && (<Lottie animationData={loader} className='h-20 md:h-40' />)}

          {destTokens.length ? (
            <div className="max-h-64 w-full md:w-[500px] overflow-y-auto bg-gray-800 p-4 rounded-md custom-scrollbar">
              <div className="p-2 border-b border-gray-700 flex justify-between w-full">
                <p className='text-white w-1/4'>Logo</p>
                <p className='text-white w-1/4'>Name</p>
                <p className='text-white w-1/4'>Chain Id</p>
                <p className='text-white w-1/4'>Decimals</p>
              </div>
              {destTokens.map((token) => (
                <>
                  <div
                    onClick={() => setDestTokenSelected(token)}
                    key={token.address} className={`p-2 border-b border-gray-700 flex justify-between w-full cursor-pointer text-sm h-16 items-center ${destTokenSelected?.name === token.name && 'bg-slate-950/35 p-3 rounded-lg'}`}>
                    <p className='w-1/4'>
                      <img src={token.logoURI} alt='' className='h-8 w-8'/>
                    </p>
                    <p className='text-white/60 w-1/4'>{token.name}</p>
                    <p className='text-white/60 w-1/4'>{token.chainId}</p>
                    <p className='text-white/60 w-1/4'>{token.decimals}</p>
                  </div>
                </>
              ))}
            </div>
          ) : (
            null
          )}
        </div>
      </div>
      <SwapSection srcToken={srcTokenSelected} destToken={destTokenSelected} />
    </motion.div>

  )
}
export default Home