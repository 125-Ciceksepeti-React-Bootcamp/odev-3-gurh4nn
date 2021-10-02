import React from "react";
import "Style/card.scss";
import { Link } from "react-router-dom";
function BlogCard({ blogs }) {
  return (
    <div className="blog-list">
      {blogs.map((data) => (
        <div className="card" key={data.id}>
          <img
            className="card--thumb"
            loading="lazy"
            src={data.img}
            alt={data.title}
          />
          <div className="card__data">
            <Link to={data.slug} className="card__data--title">
              {data.title}
            </Link>
            <div className="card__data__info">
              <span className="card__data__info--author">{data.author}</span>
              <span className="card__data__info--date">{data.date}</span>
            </div>
            <p className="card__data--desc">
              {data.description.slice(0, 200)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogCard;
