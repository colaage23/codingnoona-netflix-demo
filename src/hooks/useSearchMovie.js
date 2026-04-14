import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = async ({
  keyword,
  page,
  language,
  releaseYear,
  isAdultOnly,
}) => {
  return (await keyword)
    ? api.get(
        `/search/movie?query=${keyword}&page=${page}&include_adult=${isAdultOnly}&language=${language}&primary_release_year=${releaseYear}`,
      )
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({
  keyword,
  page,
  language,
  releaseYear,
  isAdultOnly,
}) => {
  return useQuery({
    queryKey: [
      "movie-search",
      keyword,
      page,
      language,
      releaseYear,
      isAdultOnly,
    ],
    queryFn: () =>
      fetchSearchMovie({ keyword, page, language, releaseYear, isAdultOnly }),
    select: (response) => response.data,
  });
};
