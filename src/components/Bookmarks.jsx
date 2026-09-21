import React from 'react'
import { ArrowLeft, Bookmark } from 'lucide-react'
import NewsCard from './NewsCard'

const Bookmarks = ({ savedArticles, toggleSave, onBack }) => {
  return (
    <div className='min-h-screen bg-[#242424] p-6'>

      <div className='flex justify-between items-center mb-8 bg-[#1a1a1a] p-4 rounded-xl shadow-md'>

        <div className='flex items-center gap-3'>
          <Bookmark
            size={28}
            className='text-[#4d9c9e]'
          />

          <h1 className='text-3xl font-bold text-white'>
            Bookmarks
          </h1>
        </div>

        <button
          onClick={onBack}
          className='flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-lg active:scale-95'
        >
          <ArrowLeft size={20} />
          Back
        </button>

      </div>

      {savedArticles.length === 0 ? (

        <div className='flex flex-col justify-center items-center mt-24 text-center'>

          <Bookmark
            size={55}
            className='text-gray-500 mb-4'
          />

          <h2 className='text-2xl font-bold text-white mb-2'>
            No Bookmarks Yet
          </h2>

          <p className='text-gray-400'>
            Save your favourite news articles and they will appear here.
          </p>

        </div>

      ) : (

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

          {savedArticles.map((article, index) => (
            <NewsCard
              key={article.link || index}
              article={article}
              toggleSave={toggleSave}
              savedArticles={savedArticles}
            />
          ))}

        </div>

      )}

    </div>
  )
}

export default Bookmarks