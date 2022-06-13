import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../Api/Api";
import styles from "./MoviesPage.module.css";
import Form from "../../components/Form/Form";

export default function MoviesPage() {
  const location = useLocation();

  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  const handleSearch = ({ q }) => {
    setSearchParams({ q });
    if (q.trim() === "") {
      alert("Wpisz tytuł filmu lub wyszukiwaną frazę");
      return
    }
  }
  
  useEffect(() => {
    if (q) {
      fetchSearchMovies(q).then((data) => setMovies(data.results));
    }
  }, [q])

  return (
    <>
      <Form onSubmit={handleSearch} />

      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                className={styles.link}
                state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
