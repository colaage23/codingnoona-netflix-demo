import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies copy";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data: popular, isLoading, error, isError } = useTopRatedMoviesQuery();

  return (
    <div>
      <MovieSlider
        data={popular}
        isLoading={isLoading}
        error={error}
        isError={isError}
        title="TopRated Movies"
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
