import React, { useState } from "react";

const SongForm = ({ addSong, songList }) => {
  const [songName, setSongName] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!songName || !songUrl) {
      setError("Ambos campos son obligatorios");
      return;
    }

    if (!validateUrl(songUrl)) {
      setError("URL inválida, debe ser un enlace de YouTube");
      return;
    }

    const videoId = extractVideoId(songUrl);

    if (!videoId) {
      setError("No se pudo extraer el ID del video");
      return;
    }

    const alreadyExists = songList.some(
      (song) => extractVideoId(song.url) === videoId
    );

    if (alreadyExists) {
      setError("⚠️ Esta canción ya fue agregada.");
      return;
    }

    const newSong = {
      id: Date.now(),
      name: songName,
      url: songUrl,
      playCount: 0,
    };

    addSong(newSong);
    setSongName("");
    setSongUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="song-form">
      <input
        type="text"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        placeholder="Nombre de la canción"
        className="input"
      />
      <input
        type="text"
        value={songUrl}
        onChange={(e) => setSongUrl(e.target.value)}
        placeholder="URL de YouTube"
        className="input"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" className="btn">
        Agregar
      </button>
    </form>
  );
};

export default SongForm;
