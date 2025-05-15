import React, { useState } from "react";

const SongList = ({ songs, onPlay, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 5;

  const totalPages = Math.ceil(songs.length / songsPerPage);
  const startIndex = (currentPage - 1) * songsPerPage;
  const currentSongs = songs.slice(startIndex, startIndex + songsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="song-list">
      {currentSongs.map((song) => (
        <div key={song.id} className="song-item">
          <div className="song-info">
            <div className="song-name">{song.name}</div>
            <div className="song-info-right">
              <button className="play-btn" onClick={() => onPlay(song)}>
                Play ▶
              </button>
              <div className="play-count">{song.playCount} Reproducciones</div>
              <button className="delete-btn" onClick={() => onDelete(song.id)}>
                Eliminar 🗑
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Paginación */}
      {songs.length > songsPerPage && (
        <div className="pagination">
          <button
            className="btn btn-secondary me-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default SongList;
