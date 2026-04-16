import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = async (id) => {
  return await api.get(`/movie/${id}?language=ko-KR`);
};

export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id),
    select: (response) => response.data,
  });
};
