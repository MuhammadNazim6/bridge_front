"use client";

import { Button } from '@/components/ui/button';
import { IToken } from '@/components/interface/stateInterfaces';
import { useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useRef } from "react"
import loader from '@/public/anims/loader.json'
import Lottie from 'lottie-react';

function SwapSection({ srcToken, destToken }: { srcToken: IToken | undefined, destToken: IToken | undefined }) {

  const [quotes, setQuotes] = useState([])
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  const [quotesLoading, setQuotesLoading] = useState(false)
  const openDrawerRef = useRef<HTMLButtonElement>(null);
  
  const handleGetQuote = async () => {
    try {
      setQuotesLoading(true)
      const res = await axios.get(`https://bridge-back.onrender.com/api/getQuote`, {
        params: {
          srcToken, destToken, amount
        }
      })
      if (res.data.data.success) {
        const fetchedQuotes = res.data.data.routes
        console.log(fetchedQuotes);

        setQuotes(fetchedQuotes)
        openDrawerRef?.current?.click()
      } else {
        setError(res.data.data.errorMsg)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuotesLoading(false)
    }
  }

  return (
    <>
      <div className='flex justify-center'>
        {(srcToken?.name && destToken?.name) &&
          (
            <div className="mt-8">
              <Input onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type='number' className='bg-black text-accent' placeholder='Enter amount here' />
              {!quotesLoading ? (<Button
                onClick={handleGetQuote}
                variant='outline'
                size="default"
                className='uppercase flex items-center gap-2 mt-5 rounded-md w-full md:w-[500px]'>
                <span>Get quote</span>
              </Button>) : (<Lottie animationData={loader} className='h-20 md:h-40' />)}
            </div>
          )}
      </div>
      <div className="flex justify-center mt-5">
        <Drawer>
          <DrawerTrigger ref={openDrawerRef}>{quotes.length != 0 && 'View latest quotes'}</DrawerTrigger>
          <DrawerContent className="bg-black">
            <DrawerHeader className="h-96">
              <DrawerTitle className="text-center">Available quotes</DrawerTitle>
              <div className="md:flex items-center overflow-x-auto custom-scrollbar">
                {quotes?.length && quotes.map((quote, index) => {
                  return (
                    <div key={index} className="h-52 shadow-lg bg-accent/55 w-1/4 rounded-r-lg min-w-[250px] active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out p-6 m-1 cursor-pointer text-xs">
                      <p className='flex justify-between m-2'><span className='text-slate-400'>Est. gas:</span><span className=''> {quote.estimatedGas}</span></p>
                      <p className='flex justify-between m-2'><span className='text-slate-400'>Est. transfer time: </span><span className=''>{quote.estimatedTransferTime}</span></p>
                      <p className='flex justify-between m-2'><span className='text-slate-400'>Src quote usd:</span> <span className=''>{quote.srcQuoteTokenUsdValue}</span></p>
                      <p className='flex justify-between m-2'><span className='text-slate-400'>Dest quote usd:</span><span className=''> {quote.dstQuoteTokenUsdValue}</span></p>
                      <p className='flex justify-between m-2'><span className='text-slate-400'>Min receive amt:</span> <span className=''>{quote.minReceiveAmount}</span></p>
                      <p className='flex justify-between m-2'><span className='text-slate-400'>Dest quote amt:</span> <span className=''>{quote.dstQuoteTokenAmount}</span></p>
                    </div>
                  )
                })}
                {/* bg-accent/65  */}
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export default SwapSection