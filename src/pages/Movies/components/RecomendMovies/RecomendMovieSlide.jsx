import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useRecommendMoviesQuery } from "../../../../hooks/useRecommendMovies";

const RecommendMovieSlide = ({ id }) => {
  const {
    data: recommendations,
    isLoading,
    error,
    isError,
  } = useRecommendMoviesQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MovieSlider
        data={recommendations}
        error={error}
        isError={isError}
        title="Recommended Movies"
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendMovieSlide;
