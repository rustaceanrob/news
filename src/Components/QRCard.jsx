import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

export default function QRCard({invoice, quote, lnInvoice, checkStatus}) {
    const [expired, setExpired] = useState(false);

    return (
        <div className='container mx-auto max-w-screen-sm items-center pt-10 bg-slate-900 border-xl rounded'>
            {!expired && 
            <>
                <div className='container mx-auto items-center pt-10 pl-5 pr-5 border-xl rounded'>
                    <h1 className='flex flex-col items-center text-white font-mono pb-5'>Please pay this Lighting Network invoice to continue</h1>
                    <p className='flex flex-col items-center text-white text-sm font-mono'> Payable through most LN wallets and the Strike App</p>
                    <div className='flex flex-col items-center pt-10 pb-10'>
                        <QRCode className='items-center' value={lnInvoice}/>
                    </div>
                </div>
            </>
            }
        </div>
    )
}
