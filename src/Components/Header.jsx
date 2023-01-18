import { FaSearch } from 'react-icons/fa'

export default function Header({category, handleSearch}) {

    return (
        <header className="sticky top-0 z-30 w-full flex items-center justify-between bg-black pt-6 pb-4 pl-12 pr-12 border-b border-gray-700">
            <h1 className="font-mono font-bold text-orange-400">
                Lightning News
            </h1>
            <form className='flex flex-row' onSubmit={handleSearch}>
                <input className='bg-slate-700 pr-4 border border-black rounded-xl text-white font-mono px-4 focus:outline-none' type='text' id="textBox"></input>
                <input className='text-white border border-black cursor-pointer hover:text-orange-400 rounded-xl py-1 px-3 pl-4 pr-4' type='submit' value='Search'></input>
            </form>
        </header>
    )
}