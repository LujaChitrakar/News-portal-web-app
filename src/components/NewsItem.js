import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text ">
            <small className="text-body-secondary ">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toUTCString()}
            </small>
          </p>
          <a
            rel="noref"
            href={newsUrl}
            target="blank"
            className="btn btn-primary "
          >
            Read more
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              right: "0",
            }}
          >
            <span
              className="position-absolute top-0  badge rounded-pill bg-light"
              style={{ zIndex: "1", color: "black" }}
            >
              {source}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
