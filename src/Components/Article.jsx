import React from 'react'
import moment from 'moment'

export default function Article({publisher, title, description, publishedAt, link}) {
    //    author (publisher), title, description, published time, link
    return (
        <div className="flex flex-grow flex-col border-b border-l border-r border-gray-700 hover:bg-gray-900 duration-200 cursor-default pt-12 pb-6 pl-6 pr-6">
            <div className="">
                <div className="flex flex-row justify-between items-center pb-6 pl-6 pr-6">
                        <a href={link} className="text-white font-bold font-mono cursor-pointer hover:text-orange-400">{publisher}</a>
                        <h1 className='flex flex-row text-white pl-6'>{moment(publishedAt).format("LT")} UTC</h1>
                </div> 
            </div>
            <div className="">
                <div className="flex flex-row items-center justify-between pl-6 pb-6 pr-6">
                    <div className="text-orange-400 font-mono font-bold">{title}</div>
                </div>
                <div className="flex flex-row  pl-6 pb-6 pr-6">
                    <div className="text-white">{description}</div>
                </div>  
            </div>
        </div>
    )
}
