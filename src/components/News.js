import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e652b55780ed4825a12fc0873f9994da&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let ParsedData = await data.json();
    props.setProgress(70);
    setArticles(ParsedData.articles);
    setTotalResults(ParsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}`;

    updateNews();
  }, []);

  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  const handlePrevClick = async () => {
    setPage(page - 1);

    updateNews();
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=e652b55780ed4825a12fc0873f9994da&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    let data = await fetch(url);
    let ParsedData = await data.json();
    setArticles(articles.concat(ParsedData.articles));
    setTotalResults(ParsedData.totalResults);
  };

  return (
    <>
      <h2
        className="text-center"
        style={{ margin: "30px 0px", marginTop: "60px" }}
      >
        Newzz - Top Headlines from {capitalizeFirstLetter(props.category)}
      </h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url ? element.url : ""}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = { country: "us", pageSize: 9, category: "General" };
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
