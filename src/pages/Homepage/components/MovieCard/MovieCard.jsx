import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (-1 / 5) * x + 20;
    const rotateX = (4 / 30) * y - 20;

    e.currentTarget.style.transform = `perspective(500px) scale(1.2) translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const overlay2 = e.currentTarget.querySelector(".overlay2");
    if (overlay2) {
      const bgPos = x / 5 + y / 5;
      overlay2.style.backgroundPosition = `${bgPos - 20}%`;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
    const overlay2 = e.currentTarget.querySelector(".overlay2");
    if (overlay2) {
      overlay2.style.backgroundPosition = "";
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.poster_path}` +
          ")",
      }}
      className="movie-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overlay2" />
      <div className="overlay">
        <h1>{movie?.title}</h1>
        {(movie?.genre_ids ?? []).map((id) => {
          return (
            <Badge bg="danger" style={{ marginRight: 5 }} key={id}>
              {id}
            </Badge>
          );
        })}
        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "Adult" : "Not Adult"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
