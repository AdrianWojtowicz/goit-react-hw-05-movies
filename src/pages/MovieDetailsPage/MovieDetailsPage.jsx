import React, { useEffect, useState } from "react";
import { Link, useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import { fetchMovieId } from "../../Api/Api";

import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({
    movie: [],
    genres: [],
    error: null,
  });
  const location = useLocation();
  const history = useNavigate();
  const { movieId } = useParams();
  const from = location.state?.from || "/";
  const goBack = () => history(from);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieInfo = await fetchMovieId(movieId);
        setMovie((prevState) => {
          return {
            ...prevState,
            movie: movieInfo,
            genres: movieInfo.genres,
            overview: movieInfo.overview,
            original_title: movieInfo.original_title,
            poster_path: movieInfo.poster_path,
            vote_average: movieInfo.vote_average,
          }
        })
      } catch (err) {
        setMovie((prevState) => {
          return {
            ...prevState,
            error: err.message,
          }
        })
      }
    }
    
    fetchMovie();
  }, [movieId])
  const genres = movie.genres.map((item) => {
    return <li key={item.name}>{item.name}</li>;
  })

  return (
    <>
      {location.pathname === "/" ? (
        ""
      ) : (
        <button className={styles.btn} onClick={goBack}>
          Go back
        </button>
      )}
      {movie.error && <p>Ooopsie...</p>}
      <div className={styles.movieCard}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : ""
          }
          alt={movie.original_title}
          className={styles.movieCardImg}/>
        <div className={styles.movieCardInfo}>
          <h2>{movie.original_title}</h2>
          <p>User Score: {movie.vote_average}</p>
          <p>{movie.overview}</p>
          <ul className={styles.genresList}>
            <h2>Genres:</h2>
            {genres}
          </ul>
        </div>
      </div>

      <div className={styles.container}>
        <Link to="cast" className={styles.cast}>
          cast
        </Link>
        <Link to="reviews" className={styles.reviews}>
          review
        </Link>
      </div>
      <Outlet />
    </>
  )
}

