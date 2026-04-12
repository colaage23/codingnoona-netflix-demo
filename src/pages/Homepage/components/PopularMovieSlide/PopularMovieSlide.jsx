import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";
import { useMovieGenresQuery } from "../../../../hooks/useMovieGenre";

const CarouselComponent = Carousel?.default ?? Carousel;

const PopularMovieSlide = () => {
  const { data: popular, isLoading, error, isError } = usePopularMoviesQuery();
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1800 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1800, min: 800 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <h3 style={{ marginTop: 15, fontWeight: "bold" }}>Popular Movies</h3>
      <CarouselComponent
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {popular?.results.map((movie, index) => {
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

export default PopularMovieSlide;
