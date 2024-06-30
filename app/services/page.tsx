"use client"
import axios from 'axios'
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import loader from '@/public/anims/loader.json'
import Lottie from 'lottie-react';

const blockchains = [
  { value: "bitcoin", name: "Bitcoin (BTC)" },
  { value: "ethereum", name: "Ethereum (ETH)" },
  { value: "binance-smart-chain", name: "Binance Smart Chain (BSC)" },
  { value: "polygon", name: "Polygon (MATIC)" },
  { value: "solana", name: "Solana (SOL)" },
  { value: "cardano", name: "Cardano (ADA)" },
  { value: "avalanche", name: "Avalanche (AVAX)" },
  { value: "polkadot", name: "Polkadot (DOT)" },
  { value: "tezos", name: "Tezos (XTZ)" },
  { value: "cosmos", name: "Cosmos (ATOM)" },
  { value: "tron", name: "Tron (TRX)" },
  { value: "eos", name: "EOS (EOS)" },
  { value: "algorand", name: "Algorand (ALGO)" },
  { value: "near-protocol", name: "Near Protocol (NEAR)" },
  { value: "fantom", name: "Fantom (FTM)" }
];

function Services() {

  const [selectedBlockchain, setSelectedBlockchain] = useState('')
  const [tokens, setTokens] = useState([])
  const [tokensLoading, setTokensLoading] = useState(false)

  const handleFetchTokens = async () => {
    if (!selectedBlockchain) return
    setTokensLoading(true)
    try {
      const res = await axios.get(`http://localhost:3000/api/tokens?blockchain=${selectedBlockchain}`);
      setTokens(res.data);
    } catch (error) {
      alert(error);
    }
    setTokensLoading(false)
  }

  const handleBlockchainChange = (bcValue: string) => {
    setSelectedBlockchain(bcValue);
  }

  return (
    <section className=''>

      <motion.div initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
        }}
        className='flex justify-center items-center space-y-10'
      >
        <div className="flex-col space-y-10">
          <p className="text-2xl text-white mt-20 text-center">
            Select a blockchain
          </p>
          <Select onValueChange={handleBlockchainChange}>
            <SelectTrigger className="md:w-[500px] bg-black text-accent p-6">
              <SelectValue placeholder="Open list" className='' />
            </SelectTrigger>
            <SelectContent className='bg-black'>
              {
                blockchains.map((x) => {
                  return (
                    <SelectItem value={x.value} className='cursor-pointer text-accent'>{x.name}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
          {tokensLoading ?
            (<Lottie animationData={loader} className='h-40' />)
            :
            (<Button onClick={handleFetchTokens} variant='outline' size="default" className='uppercase flex items-center gap-2 p-4 rounded-md md:w-[500px]'>
              <span>Fetch tokens</span>
            </Button>)
          }
        </div>
      </motion.div>
    </section>
  )
}
export default Services