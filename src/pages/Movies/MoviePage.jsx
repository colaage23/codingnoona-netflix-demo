import React, { useEffect, useMemo, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useMovieGenresQuery } from "../../hooks/useMovieGenre";
import {
  languageOptions,
  releaseYearOptions,
  sortOptions,
} from "../../constants/movieFilterOptions";
import "./MoviePage.style.css";

const ReactPaginateComponent = ReactPaginate?.default ?? ReactPaginate;
const previewGenreFallback = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
];

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isAdultOnly, setIsAdultOnly] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [releaseYear, setReleaseYear] = useState("");
  const [sort, setSort] = useState(sortOptions[0]);
  const [selectedGenrePreview, setSelectedGenrePreview] = useState(null);

  const handleSelectMovie = (movieId) => {
    setSelectedMovieId((prevSelectedMovieId) =>
      prevSelectedMovieId === movieId ? null : movieId,
    );
  };

  const { data: genres } = useMovieGenresQuery();
  const genrePreviewList = genres?.slice(0, 12) ?? previewGenreFallback;

  const { data, isLoading, error } = useSearchMovieQuery({
    keyword: query.get("q"),
    page,
    language: language?.value ?? "",
    releaseYear,
    isAdultOnly,
  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
  };

  useEffect(() => {
    setPage(1);
  }, [query, language, releaseYear, isAdultOnly]);

  const sortedData = useMemo(() => {
    if (!data?.results) return data;

    const sortedResults = [...data.results].sort((a, b) => {
      if (sort.value === "popularity.desc") {
        return b.popularity - a.popularity;
      }

      if (sort.value === "popularity.asc") {
        return a.popularity - b.popularity;
      }

      return 0;
    });

    if (selectedGenrePreview) {
      const filteredResults = sortedResults.filter((movie) =>
        movie.genre_ids.includes(selectedGenrePreview),
      );
      return { ...data, results: filteredResults };
    }

    return { ...data, results: sortedResults };
  }, [data, sort, selectedGenrePreview]);

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        role="status"
        style={{ display: "block", margin: "300px auto" }}
      />
    );
  }

  if (error) {
    return (
      <div style={{ margin: "20px auto", fontSize: 24, fontWeight: "bold" }}>
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <>
            <Col lg={3} xs={12} className="mb-4">
              <div className="movie-filter-box">
                <h3 className="movie-filter-title">필터</h3>
                {query.get("q") && (
                  <>
                    <div className="movie-filter-group">
                      <div className="movie-filter-label">언어</div>
                      <Form.Select
                        className="movie-filter-select"
                        value={language?.value ?? ""}
                        onChange={(e) => {
                          const selectedLanguage = languageOptions.find(
                            (option) => option.value === e.target.value,
                          );
                          setLanguage(selectedLanguage ?? languageOptions[0]);
                        }}
                      >
                        {languageOptions.map((option) => (
                          <option
                            key={option.value || "all-languages"}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    <div className="movie-filter-group">
                      <div className="movie-filter-label">출시년도</div>
                      <Form.Select
                        className="movie-filter-select"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                      >
                        {releaseYearOptions.map((year) => (
                          <option key={year.value || "all-years"}>
                            {year.label}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </>
                )}
                <div className="movie-filter-group">
                  <div className="movie-filter-label">정렬</div>
                  <Form.Select
                    className="movie-filter-select"
                    value={sort?.value ?? ""}
                    onChange={(e) => {
                      const selectedSort = sortOptions.find(
                        (option) => option.value === e.target.value,
                      );
                      setSort(selectedSort ?? sortOptions[0]);
                    }}
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option.value || "all-sorts"}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <div className="movie-filter-group">
                  <div className="movie-filter-label movie-filter-label-center">
                    장르
                  </div>
                  <div className="movie-filter-genre-list">
                    {genrePreviewList.map((genre) => (
                      <button
                        key={genre.id}
                        type="button"
                        className={`movie-filter-genre-chip ${
                          selectedGenrePreview === genre.id ? "active" : ""
                        }`}
                        onClick={() =>
                          setSelectedGenrePreview((prev) =>
                            prev === genre.id ? null : genre.id,
                          )
                        }
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="movie-filter-group movie-filter-group-bottom">
                  <Form.Check
                    type="switch"
                    id="adult-filter-switch"
                    className="movie-filter-switch"
                    label={isAdultOnly ? "Adult" : "All audiences"}
                    checked={isAdultOnly}
                    onChange={() => setIsAdultOnly((prev) => !prev)}
                  />
                </div>
              </div>
            </Col>
            {sortedData?.results.length === 0 ? (
              <Col lg={9} xs={12}>
                <div
                  style={{
                    margin: "20px auto",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  검색 결과가 없습니다.
                </div>
              </Col>
            ) : (
              <Col lg={9} xs={12}>
                <Row>
                  {sortedData?.results.map((movie, index) => (
                    <Col
                      key={movie.id}
                      lg={3}
                      xs={12}
                      style={{ marginBottom: 60 }}
                    >
                      <MovieCard
                        movie={movie}
                        key={movie?.id ?? index}
                        isActive={selectedMovieId === movie?.id}
                        onSelect={handleSelectMovie}
                        genres={genres}
                      />
                    </Col>
                  ))}
                </Row>
                <div className="movie-pagination-wrapper">
                  <ReactPaginateComponent
                    previousLabel="<"
                    nextLabel=">"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={data?.total_pages || 0}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="pagination movie-pagination"
                    activeClassName="active"
                    forcePage={page - 1}
                  />
                </div>
              </Col>
            )}
          </>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
