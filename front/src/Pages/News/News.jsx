import axios from "axios";
import React, { useEffect, useState } from "react";
import "./news.css";

const News = () => {
  // c4a5b084f0d340359362caf7166170ec

  const [news, setNews] = useState([]);

  useEffect(() => {
    let date = new Date();
    date.setDate(date.getDate() - 5);
    let jour = date.getDate();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    let dateFormatee = jour + '-' + mois + '-' + annee;
    axios
      .get(
        `https://newsapi.org/v2/everything?q=crypto&from=${dateFormatee}&sortBy=publishedAt&apiKey=a3cad12d113e439aade0824483111318`
      )
      .then((res) => {
        setNews(res.data.articles);
        console.log(res)
      });
  }, []);
  return (
    <div className="news">
      {news.slice(0, 4).map((data) => {
        return (
          <a href={data.url} style={{ textDecoration: 'none' }}>
          <div className="box">
            <div className="imgs">
                <img src={data.urlToImage} alt="" />
            </div>
            <h5 > {data.title} </h5>
            <p> {data.description} </p>
          </div>
          </a>
        );
      })}
    </div>
  );
};

export default News;