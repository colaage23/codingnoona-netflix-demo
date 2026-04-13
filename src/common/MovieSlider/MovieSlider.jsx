import React, { useState } from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import { Alert } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import { useMovieGenresQuery } from "../../hooks/useMovieGenre";
import "react-multi-carousel/lib/styles.css";

const CarouselComponent = Carousel?.default ?? Carousel;

const MovieSlider = ({
  data,
  isLoading,
  error,
  isError,
  title,
  responsive,
}) => {
  const { data: genres } = useMovieGenresQuery();
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSelectMovie = (movieId) => {
    setSelectedMovieId((prevSelectedMovieId) =>
      prevSelectedMovieId === movieId ? null : movieId,
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <h3 style={{ marginTop: 15, fontWeight: "bold" }}>{title}</h3>
      <CarouselComponent
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data?.results.map((movie, index) => {
          return (
            <MovieCard
              movie={movie}
              key={movie?.id ?? index}
              isActive={selectedMovieId === movie?.id}
              onSelect={handleSelectMovie}
              genres={genres}
            />
          );
        })}
      </CarouselComponent>
    </div>
  );
};

export default MovieSlider;
