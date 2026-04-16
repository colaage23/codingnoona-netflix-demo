import React, { useState } from "react";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useParams } from "react-router-dom";
import { Badge, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./MovieDetailPage.css";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import RecommendMovieSlide from "../Movies/components/RecomendMovies/RecomendMovieSlide";
import TrailerModal from "../Movies/components/Modal/TrailerModal";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const formatRuntime = (minutes) => {
  if (!minutes) return "Runtime unknown";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
};

const formatMoney = (amount) => {
  if (!amount) return "TBA";
  return `$${amount.toLocaleString()}`;
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const { data: detail, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: reviews } = useMovieReviewsQuery(id);

  if (isLoading) {
    return (
      <div className="movie-detail-loading">
        <Spinner animation="border" variant="danger" role="status" />
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className="movie-detail-loading movie-detail-error">
        <h2>Unable to load this title</h2>
        <p>{error?.message || "Please try again in a moment."}</p>
      </div>
    );
  }

  const backdropUrl = detail.backdrop_path
    ? `${IMAGE_BASE_URL}${detail.backdrop_path}`
    : "";
  const posterUrl = detail.poster_path
    ? `${IMAGE_BASE_URL}${detail.poster_path}`
    : "";
  const releaseYear = detail.release_date?.split("-")[0] || "Coming soon";
  const genreItems = detail.genres || [];
  const genres =
    genreItems.map((genre) => genre.name).join(" • ") || "Genre unavailable";
  const languages =
    detail.spoken_languages
      ?.map((language) => language.english_name)
      .join(", ") || "Unknown";
  const countries =
    detail.production_countries?.map((country) => country.name).join(", ") ||
    "Unknown";
  const shouldShowOverviewToggle = (detail.overview || "").length > 180;
  const reviewItems = reviews?.results?.slice(0, 4) || [];

  const toggleReview = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  return (
    <section className="movie-detail-page">
      <div
        className="movie-detail-hero"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="movie-detail-hero__overlay">
          <Container>
            <Row className="movie-detail-hero__content align-items-end">
              <Col lg={4} className="mb-4 mb-lg-0">
                <div className="movie-detail-poster-wrap">
                  <img
                    src={posterUrl}
                    alt={detail.title}
                    className="movie-detail-poster"
                  />
                </div>
              </Col>

              <Col lg={8}>
                <div className="movie-detail-copy">
                  <div className="movie-detail-copy__chips">
                    <span>{releaseYear}</span>
                    <span>{formatRuntime(detail.runtime)}</span>
                  </div>

                  <h1>{detail.title}</h1>
                  {detail.tagline && (
                    <p className="movie-detail-tagline">“{detail.tagline}”</p>
                  )}

                  <div className="movie-detail-stats">
                    <div>
                      <strong>{detail.vote_average?.toFixed(1)}</strong>
                      <span>TMDB Rating</span>
                    </div>
                    <div>
                      <strong>{detail.vote_count}</strong>
                      <span>Votes</span>
                    </div>
                    <div>
                      <strong>{Math.round(detail.popularity)}</strong>
                      <span>Popularity</span>
                    </div>
                  </div>

                  <div className="movie-detail-overview-wrap">
                    <p
                      className={`movie-detail-overview ${
                        isOverviewExpanded ? "expanded" : "collapsed"
                      }`}
                    >
                      {detail.overview}
                    </p>
                    {shouldShowOverviewToggle && (
                      <button
                        type="button"
                        className="movie-detail-overview-toggle"
                        onClick={() =>
                          setIsOverviewExpanded(!isOverviewExpanded)
                        }
                      >
                        {isOverviewExpanded ? "접기" : "더보기"}
                      </button>
                    )}
                  </div>

                  <div className="movie-detail-actions">
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => setShowTrailerModal(true)}
                    >
                      Play Trailer
                    </Button>
                    <Button variant="outline-light" size="lg">
                      + My List
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="movie-detail-body">
        <div className="movie-detail-panel movie-detail-info-panel">
          <Row className="g-4 align-items-start">
            <Col lg={4}>
              <div className="movie-detail-info-block">
                <h3>Genres</h3>
                <div className="movie-detail-genre-list">
                  {genreItems.length ? (
                    genreItems.map((genre) => (
                      <span key={genre.id} className="movie-detail-genre-pill">
                        {genre.name}
                      </span>
                    ))
                  ) : (
                    <p>{genres}</p>
                  )}
                </div>
              </div>
            </Col>

            <Col lg={8}>
              <div className="movie-detail-info-block">
                <h3>Details</h3>
                <div className="movie-detail-detail-grid">
                  <div className="movie-detail-detail-item">
                    <span>Original title</span>
                    <strong>{detail.original_title}</strong>
                  </div>
                  <div className="movie-detail-detail-item">
                    <span>Language</span>
                    <strong>{languages}</strong>
                  </div>
                  <div className="movie-detail-detail-item">
                    <span>Country</span>
                    <strong>{countries}</strong>
                  </div>
                  <div className="movie-detail-detail-item">
                    <span>Budget</span>
                    <strong>{formatMoney(detail.budget)}</strong>
                  </div>
                  <div className="movie-detail-detail-item">
                    <span>Revenue</span>
                    <strong>{formatMoney(detail.revenue)}</strong>
                  </div>
                  <div className="movie-detail-detail-item">
                    <span>Status</span>
                    <strong>{detail.status}</strong>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {!!detail.production_companies?.length && (
          <div className="movie-detail-panel movie-detail-companies">
            <h3>Production</h3>
            <div className="movie-detail-company-list">
              {detail.production_companies.map((company) => (
                <span key={company.id} className="movie-detail-company-pill">
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="movie-detail-panel movie-detail-reviews">
          <h3>Reviews</h3>
          {reviewItems.length ? (
            <div className="movie-detail-review-list">
              {reviewItems.map((review) => {
                const isExpanded = !!expandedReviews[review.id];
                const shouldShowReviewToggle =
                  (review.content || "").length > 260;

                return (
                  <div key={review.id} className="movie-detail-review-card">
                    <div className="movie-detail-review-head">
                      <div>
                        <strong>{review.author || "Anonymous"}</strong>
                        <span>
                          {review.created_at
                            ? new Date(review.created_at).toLocaleDateString(
                                "ko-KR",
                              )
                            : ""}
                        </span>
                      </div>
                      <Badge bg="dark" className="movie-detail-review-rating">
                        ★ {review.author_details?.rating ?? "N/A"}
                      </Badge>
                    </div>
                    <p
                      className={`movie-detail-review-content ${
                        isExpanded ? "expanded" : "collapsed"
                      }`}
                    >
                      {review.content}
                    </p>
                    {shouldShowReviewToggle && (
                      <button
                        type="button"
                        className="movie-detail-review-toggle"
                        onClick={() => toggleReview(review.id)}
                      >
                        {isExpanded ? "접기" : "더보기"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="movie-detail-empty-review">
              아직 등록된 리뷰가 없습니다.
            </p>
          )}
        </div>
        <div style={{ overflow: "hidden" }}>
          <RecommendMovieSlide id={id} />
        </div>
      </Container>

      <TrailerModal
        show={showTrailerModal}
        onHide={() => setShowTrailerModal(false)}
      />
    </section>
  );
};

export default MovieDetailPage;
