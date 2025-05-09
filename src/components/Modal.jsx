import React from "react";

const Modal = ({ isOpen, onClose, song }) => {
  if (!isOpen || !song || !song.url) return null;

  // Obtener el ID del video de YouTube
  const getYouTubeId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(song.url);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        {videoId ? (
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} // Reproducción automática
              title={song.name}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No se pudo cargar el video. Verifica la URL de YouTube.</p>
        )}
        <p>
          <strong>{song.name}</strong>
        </p>
      </div>
    </div>
  );
};

export default Modal;
