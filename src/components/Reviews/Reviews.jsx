import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../Api/Api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetchMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId])

  const rev = reviews.map((review) => (
    <li key={review.author_details.username}>
      <h3>Author:{review.author}</h3>
      <p>{review.content}</p>
    </li>
  ))

  return (
    <>
      <div>
        {reviews?.length > 0 ? (
          <ul>{reviews && rev}</ul>
        ) : (
          <p>Nobody has written a review yet.</p>
        )}
      </div>
    </>
  )
}
