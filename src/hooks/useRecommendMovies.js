import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendMovies = async (id) => {
  return await api.get(`/movie/${id}/recommendations`);
};

export const useRecommendMoviesQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommendations", id],
    queryFn: () => fetchRecommendMovies(id),
    select: (response) => response.data,
  });
};
