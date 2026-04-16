import React, { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import "./Homepage.style.css";
import { Spinner } from "react-bootstrap";

const Homepage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <Spinner
            animation="border"
            role="status"
            style={{ display: "block", margin: "300px auto" }}
          />
        }
      >
        <Banner />
        <div className="slide-div">
          <PopularMovieSlide />
          <TopRatedMovieSlide />
          <UpcomingMovieSlide />
        </div>
      </Suspense>
    </div>
  );
};

export default Homepage;
