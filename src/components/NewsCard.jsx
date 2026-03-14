import {Bookmark} from 'lucide-react'
const NewsCard = ({ article, toggleSave, savedArticles }) => {
  const isSaved = savedArticles.some(item => item.link === article.link);
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer"
    className="bg-white rounded-xl relative shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">
      <div onClick={(e)=>{
        e.preventDefault();
        toggleSave(article);
      }}
       className='absolute top-3 right-3 bg-white/30 backdrop-blur-sm p-2 rounded-full transition hover:bg-white/50'>
        {isSaved ? <Bookmark fill="black" /> : <Bookmark />}
        

      </div>
      {article.image_url && (
        <img
          src={article.image_url}
          alt="news"
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          {article.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {article.description}
        </p>
        <button className="mt-4 px-4 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95">Read More</button>
      </div>
    </a>
  );
};

export default NewsCard;