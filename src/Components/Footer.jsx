import React from 'react'
import { GrFormPrevious } from 'react-icons/gr'

export default function Footer({togglePage, page, numberOfPages}) {
  return (
    <footer className='p-4 bg-black rounded-lg shadow md:px-6 md:py-8'>
        <div className='flex flex-row items-center justify-center'>
            <button className='text-white text-sm hover:text-orange-400' onClick={togglePage} id="prev">Previous</button>
            <span className='text-orange-400 text-sm pl-2 pr-2'>{page} / {numberOfPages}</span>
            <button className='text-white text-sm hover:text-orange-400' onClick={togglePage} id="next">Next</button>
            <GrFormPrevious className='text-white pl-6'/>
        </div>
    </footer>
  )
}
