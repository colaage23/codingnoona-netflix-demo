import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = async () => {
  return await api.get("/movie/popular");
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (response) => response.data,
  });
};
