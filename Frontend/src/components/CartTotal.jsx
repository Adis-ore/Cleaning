import React from 'react'
import { Shopcontext } from '../context/Shopcontext';
import Title from './Title';
import { useContext } from "react";

const CartTotal = () => {
    const { currency, getCartAmount, delivery_fee } = useContext(Shopcontext);
    

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p className='flex items-center '>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p  className='flex items-center ' >{currency} {delivery_fee}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b  className='flex items-center '>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
