import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenres = async () => {
  return await api.get("/genre/movie/list");
};

export const useMovieGenresQuery = () => {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    select: (response) => response.data.genres,
  });
};
