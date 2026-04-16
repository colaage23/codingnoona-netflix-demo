import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data: popular, isLoading, error, isError } = useUpcomingMoviesQuery();

  return (
    <div>
      <MovieSlider
        data={popular}
        error={error}
        isError={isError}
        title="Upcoming Movies"
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
