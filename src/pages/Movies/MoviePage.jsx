import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useMovieGenresQuery } from "../../hooks/useMovieGenre";
import {
  languageOptions,
  releaseYearOptions,
} from "../../constants/movieFilterOptions";
import "./MoviePage.style.css";

const ReactPaginateComponent = ReactPaginate?.default ?? ReactPaginate;

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isAdultOnly, setIsAdultOnly] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [releaseYear, setReleaseYear] = useState("");

  const handleSelectMovie = (movieId) => {
    setSelectedMovieId((prevSelectedMovieId) =>
      prevSelectedMovieId === movieId ? null : movieId,
    );
  };

  const { data: genres } = useMovieGenresQuery();

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
            {data?.results.length === 0 ? (
              <div
                style={{
                  margin: "20px auto",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                검색 결과가 없습니다.
              </div>
            ) : (
              <Col lg={9} xs={12}>
                <Row>
                  {data?.results.map((movie, index) => (
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
