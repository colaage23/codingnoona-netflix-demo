import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMovieTrailerQuery } from "../../../../hooks/useMovieTrailer";
import YouTube from "react-youtube";

const TrailerModal = ({ show, onHide }) => {
  const { id } = useParams();
  const { data: trailerData, isLoading } = useMovieTrailerQuery(id);
  const youtubeOptions = {
    width: "100%",
    height: "420px",
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header
        closeVariant="white"
        className="bg-dark text-white border-secondary"
      >
        <Modal.Title>{trailerData?.name || "Trailer"}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white">
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : trailerData ? (
          <YouTube videoId={trailerData.key} opts={youtubeOptions} />
        ) : (
          <>
            <p style={{ marginBottom: "8px", fontWeight: 700 }}>
              예고편이 없습니다
            </p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="outline-light" onClick={onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TrailerModal;
