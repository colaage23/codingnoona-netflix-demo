import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data: popular, isLoading, error, isError } = usePopularMoviesQuery();

  return (
    <div>
      <MovieSlider
        data={popular}
        error={error}
        isError={isError}
        title="Popular Movies"
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
