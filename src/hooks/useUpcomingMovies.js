import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = async () => {
  return await api.get("/movie/upcoming");
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (response) => response.data,
  });
};
