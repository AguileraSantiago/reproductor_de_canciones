import React from "react";

const SongList = ({ songs, onPlay, onDelete }) => {
  return (
    <div className="song-list">
      {songs.map((song) => (
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
    </div>
  );
};

export default SongList;
