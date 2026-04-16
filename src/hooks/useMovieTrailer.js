import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailer = async (id) => {
  return await api.get(`/movie/${id}/videos?language=ko-KR`);
};

export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: () => fetchMovieTrailer(id),
    select: (response) => {
      const results = response.data?.results || [];

      return (
        results.find(
          (video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser"),
        ) ||
        results.find((video) => video.site === "YouTube") ||
        null
      );
    },
  });
};
