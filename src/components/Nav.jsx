import React from 'react'
import { Search, Mic, Bookmark } from 'lucide-react'

const Nav = ({ searchInput, setSearchInput, setSearch, startListening, isListening, savedArticles }) => {
  return (
    <div className='flex justify-between items-center mb-8 bg-[#1a1a1a] p-4 rounded-xl shadow-md'>

      {/* Logo */}
      <h1 className='text-4xl font-bold text-white'>
        Vox<span className='text-[#4d9c9e]'>News</span>
      </h1>

      {/* Right Section */}
      <div className='flex items-center gap-4 w-1/2'>

        {/* Search Box */}
        <div className='relative w-full'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

          <Mic
            onClick={startListening}
            className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'
              }`}
          />

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearch(searchInput)
                setSearchInput("")
              }
            }}
            placeholder="Search news..."
            className='pl-10 pr-10 py-2 w-full rounded-lg bg-[#333333] text-white focus:outline-none focus:ring-2 focus:ring-[#4d9c9e]'
          />
        </div>
        <div className="relative block cursor-pointer">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-lg active:scale-95">
            <span>Bookmarks</span>
            <Bookmark size={20} className="text-white" />
          </button>
        </div>


        {/* Badge Example */}
        {/* <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
            3
          </span> */}
      </div>

    </div>

  )
}

export default Nav