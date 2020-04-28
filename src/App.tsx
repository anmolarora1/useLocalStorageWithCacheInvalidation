import React, { FC } from 'react';
import './App.css';
import useLocalStorageWithCacheInvalidation, { configType } from './useLocalStorageWithCacheInvalidation';
import NewsArticle from './components/NewsArticle/NewsArticle';
import Footer from './components/Footer/Footer';


interface DataObj {
  [key: string]: boolean;
}

const cacheInvalidatorFunction = (data: DataObj): boolean => data && data.invalidateCache;

const config: configType = {
  key: 'data',
  dataURL: 'http://newsapi.org/v2/top-headlines?country=us&apiKey=1830bfd7657f4a30928648ffbcce0269',
  streamURL: 'http://localhost:3001/stream',
  initialValue: null,
  cacheInvalidatorFunction,
};

type newsType = {
  title: string;
  description: string;
  url: string;
};


const App: FC = () => {
  const { storedItem, isLoading } = useLocalStorageWithCacheInvalidation(config);
  console.log(storedItem, isLoading);
  return (
    <main>
      {(storedItem)
        ? (storedItem.articles || []).map((news: newsType) => (<NewsArticle key={news.url} article={news} />)) : 'Fetching News...'}
      {storedItem && <Footer />}
    </main>
  );
};

export default App;
