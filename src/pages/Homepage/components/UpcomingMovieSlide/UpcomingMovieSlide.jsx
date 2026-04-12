import React, { useState } from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./UpcomingMovieSlide.style.css";
import { useMovieGenresQuery } from "../../../../hooks/useMovieGenre";

const CarouselComponent = Carousel?.default ?? Carousel;

const UpcomingMovieSlide = () => {
  const { data: popular, isLoading, error, isError } = useUpcomingMoviesQuery();
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
      breakpoint: { max: 3000, min: 2100 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 2100, min: 800 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <h3 style={{ marginTop: 15, fontWeight: "bold" }}>Upcoming Movies</h3>
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

export default UpcomingMovieSlide;
