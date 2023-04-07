import { useState, useReducer, useEffect, Suspense } from "react";

import ArticleCard from "../components/ArticleCard";

const reducerFn = (state, action) => {
  if (action.type === "pushArticle") {
    return [...state, action.payload];
  }
};

function Index() {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, dispatchNewsArticles] = useReducer(reducerFn, []);
  const [newsIds, setNewsIds] = useState([]);

  // initial fetching of news ids
  useEffect(() => {
    const controller = new AbortController();

    // console.log("initial");

    const fetchData = async () => {
      //
      const req = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );

      const res = await req.json();

      // console.log(res);
      setNewsIds(res.slice(10));

      res.slice(0, 10).map(async (id) => {
        const req = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const res = await req.json();

        dispatchNewsArticles({ type: "pushArticle", payload: res });
      });
    };

    fetchData();

    setIsLoading(false);

    return () => {
      controller.abort();
    };
  }, []);

  // console.log(newsIds);

  const debounce = (func, timeout = 300) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, timeout);
    };
  };
  const handleScroll = () => {
    // console.log("firing scroll handler");

    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 100
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const processChange = debounce(() => handleScroll());

  // Scroll Event Handler
  useEffect(() => {
    window.addEventListener("scroll", processChange);
    return () => {
      window.removeEventListener("scroll", processChange);
    };
  }, []);

  // display  10 ids on scroll
  useEffect(() => {
    //
    const nextIds = newsIds.slice(0, 10);

    nextIds.map(async (id) => {
      const req = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      const res = await req.json();

      dispatchNewsArticles({ type: "pushArticle", payload: res });
      setNewsIds((prev) => prev.slice(10));
    });
    //
  }, [currentPage]);

  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-2xl my-4">Latest Articles</h2>
          <Suspense fallback={<p className="text-2xl">Loading...</p>}>
            <ul className="bg-green-500 rounded-xl px-6 py-4 flex flex-wrap justify-around items-baseline">
              {newsArticles.map((obj, i) => (
                <ArticleCard key={i} data={obj} />
              ))}
            </ul>
          </Suspense>
        </div>
      )}
    </main>
  );
}

export default Index;
