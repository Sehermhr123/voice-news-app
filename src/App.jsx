import React, { useState } from 'react'
import { useEffect } from 'react'
import NewsCard from './components/NewsCard';
import Nav from './components/Nav';
import Title from './components/Title';
import Bookmarks from './components/Bookmarks';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('top');
  const [title, setTitle] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isListening, setListening] = useState(false);

  // Load saved bookmarks from localStorage
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("savedArticles");
    return saved ? JSON.parse(saved) : [];
  });

  // Remember whether user is on Bookmarks page
  const [showBookmarks, setShowBookmarks] = useState(() => {
    return localStorage.getItem("showBookmarks") === "true";
  });

  // Save bookmarks whenever they change
  useEffect(() => {
    localStorage.setItem(
      "savedArticles",
      JSON.stringify(savedArticles)
    );
  }, [savedArticles]);

  // Remember current page
  useEffect(() => {
    localStorage.setItem("showBookmarks", showBookmarks);
  }, [showBookmarks]);

  useEffect(() => {
    async function fetchData() {
      let url = "";

      if (search.trim() !== "") {
        url = `https://newsdata.io/api/1/latest?apikey=pub_fd6adf0a134741058d5cf50b16bd8616&q=${search}&language=en&country=in`;
      } else {
        url = `https://newsdata.io/api/1/latest?apikey=pub_fd6adf0a134741058d5cf50b16bd8616&category=${category}&language=en&country=in`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setArticles(data.results || []);
      setNextPage(data.nextPage || "");
    }

    fetchData();
  }, [category, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitle(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (title) {
    return <Title />;
  }

  async function nextPageData() {
    setLoading(true);

    const response1 = await fetch(
      `https://newsdata.io/api/1/latest?apikey=pub_fd6adf0a134741058d5cf50b16bd8616&page=${nextPage}`
    );

    const data1 = await response1.json();

    setArticles(prev => [...prev, ...(data1.results || [])]);
    setNextPage(data1.nextPage);

    console.log(data1);

    setLoading(false);
  }

  const toggleSave = (article) => {
    setSavedArticles((prevSaved) => {
      const exists = prevSaved.find(
        (item) => item.link === article.link
      );

      if (exists) {
        return prevSaved.filter(
          (item) => item.link !== article.link
        );
      } else {
        return [...prevSaved, article];
      }
    });
  };

  function speak(text) {
    speechSynthesis.cancel();

    const speaker = new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(speaker);
  }

  function handleVoiceCommands(command) {
    if (command.includes("search for")) {
      let keyword = command.replace("search for", "");

      setSearch(keyword);
      setSearchInput(keyword);

      speak(`Searching for ${keyword}`);
    }

    else if (command.includes("next page") && nextPage) {
      nextPageData();
      speak("Loading next page");
    }

    else if (command.includes("business")) {
      setCategory('business');
      speak("Showing business news");
    }

    else if (command.includes("health")) {
      setCategory('health');
      speak("Showing health news");
    }

    else if (command.includes("entertainment")) {
      setCategory('entertainment');
      speak("Showing entertainment news");
    }

    else if (command.includes("sports")) {
      setCategory('sports');
      speak("Showing sports news");
    }

    else if (command.includes("technology")) {
      setCategory('technology');
      speak("Showing technology news");
    }

    else if (command.includes("latest news")) {
      setCategory('top');
      speak("Showing latest news");
    }
  }

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const command = transcript.toLowerCase();

      recognition.stop();

      setTimeout(() => {
        handleVoiceCommands(command);
      }, 300);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  // Show Bookmarks page
  if (showBookmarks) {
    return (
      <Bookmarks
        savedArticles={savedArticles}
        toggleSave={toggleSave}
        onBack={() => setShowBookmarks(false)}
      />
    );
  }

  return (
    <div className='min-h-screen bg-[#242424] p-6'>

      <Nav
        search={search}
        setSearch={setSearch}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        startListening={startListening}
        isListening={isListening}
        onOpenBookmarks={() => setShowBookmarks(true)}
      />

      <div className='flex justify-start mb-6 items-center gap-4'>

        <button
          onClick={() => setCategory('top')}
          className='px-6 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95 cursor:pointer'
        >
          General
        </button>

        <button
          onClick={() => setCategory('sports')}
          className='px-6 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95 cursor:pointer'
        >
          Sports
        </button>

        <button
          onClick={() => setCategory('technology')}
          className='px-6 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95 cursor:pointer'
        >
          Technology
        </button>

        <button
          onClick={() => setCategory('business')}
          className='px-6 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95 cursor:pointer'
        >
          Business
        </button>

        <button
          onClick={() => setCategory('health')}
          className='px-6 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95 cursor:pointer'
        >
          Health
        </button>

        <button
          onClick={() => setCategory('entertainment')}
          className='px-6 py-2 bg-[#4d9c9e] text-white rounded-lg active:scale-95 cursor:pointer'
        >
          Entertainment
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {Array.isArray(articles) &&
          articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              toggleSave={toggleSave}
              savedArticles={savedArticles}
            />
          ))}

      </div>

      <div className="flex justify-center mt-10">

        {nextPage && (
          <button
            onClick={nextPageData}
            className="px-6 py-2 bg-[#4d9c9e] text-white rounded-lg"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}

      </div>

    </div>
  )
}

export default App