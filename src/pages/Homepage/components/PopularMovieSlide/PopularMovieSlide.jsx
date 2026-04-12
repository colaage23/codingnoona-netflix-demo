import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";

const CarouselComponent = Carousel?.default ?? Carousel;

const PopularMovieSlide = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();

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
      <h3 style={{ marginTop: 15 }}>Popular Movies</h3>
      <CarouselComponent
        infinite={true}
        centerMode={true}
        itemClass="movie-silder p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data?.results.map((movie, index) => {
          return <MovieCard movie={movie} key={index} />;
        })}
      </CarouselComponent>
    </div>
  );
};

export default PopularMovieSlide;
