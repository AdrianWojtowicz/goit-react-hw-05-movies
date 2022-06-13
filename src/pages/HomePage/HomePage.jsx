import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovie } from "../../Api/Api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./HomePage.module.css";

const TrendingMovie = () => {
  const [data, setData] = useState({
    posts: [],
    loading: false,
    error: null,
  })

  const location = useLocation();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const newData = await fetchTrendingMovie();
        setData(() => {
          return {
            posts: newData.results,
            loading: false,
            error: null,
          };
        })
      } catch (error) {
        setData((prevState) => {
          return {
            ...prevState,
            loading: false,
            error: Notify.failure("Error Page"),
          }
        })
      }
    }
    fetchMovies();
  }, [])

  const movieName = data.posts.map((item) => {
    return (
      <li key={item.id} className={styles.link__item}>
        <Link
          to={`movies/${item.id}`}
          className={styles.link}
          state={{ from: location }}>
          <p>{item.original_title}</p>
        </Link>
      </li>
    )
  })

  return (
    <>
      <p className={styles.title}>Trending Today</p>
      <ul className={styles.movie_list}>{movieName}</ul>
    </>
  )
}

export default TrendingMovie;
