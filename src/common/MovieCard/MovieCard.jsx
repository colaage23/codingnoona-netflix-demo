import React, { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, genres, isActive, onSelect }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px), (pointer: coarse)",
    );
    const updateIsMobileView = () => setIsMobileView(mediaQuery.matches);

    updateIsMobileView();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateIsMobileView);
      return () => mediaQuery.removeEventListener("change", updateIsMobileView);
    }

    mediaQuery.addListener(updateIsMobileView);
    return () => mediaQuery.removeListener(updateIsMobileView);
  }, []);

  useEffect(() => {
    const slideItem = cardRef.current?.closest(".movie-slider");

    if (!slideItem) {
      return;
    }

    slideItem.style.zIndex = isActive ? "300" : "1";
  }, [isActive]);

  const handleMouseMove = (e) => {
    if (isMobileView) {
      return;
    }

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

  const handleCardClick = () => {
    navigate(`/movies/${movie?.id}`);
  };

  return (
    <div
      ref={cardRef}
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.poster_path}` +
          ")",
      }}
      className={`movie-card${isMobileView && isActive ? " is-active" : ""}`}
      onMouseMove={isMobileView ? undefined : handleMouseMove}
      onMouseLeave={isMobileView ? undefined : handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="overlay2" />
      <div className="overlay">
        <h2
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie?.title}
        </h2>
        <div>
          {(movie?.genre_ids ?? []).map((id) => {
            return (
              <Badge bg="danger" style={{ marginRight: 5 }} key={id}>
                {genres?.find((genre) => genre.id === id)?.name ?? "Unknown"}
              </Badge>
            );
          })}
        </div>
        <div>
          <div>평점 : {movie.vote_average?.toFixed(2)}</div>
          <div>인기도 : {movie.popularity?.toFixed(2)}</div>
          <div style={{ color: "firebrick", fontSize: 12 }}>
            {movie.adult ? "Only Adult" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
