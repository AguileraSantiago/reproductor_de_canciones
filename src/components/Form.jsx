import React, { useState } from "react";

const SongForm = ({ addSong }) => {
  const [songName, setSongName] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (que recargaría la página)
    setError(""); // Limpiar el error previo al hacer una nueva validación

    // Validaciones

    if (!songName || !songUrl) {
      setError("Ambos campos son obligatorios");
      return;
    }

    if (!validateUrl(songUrl)) {
      setError("URL inválida, debe ser un enlace de YouTube");
      return;
    }

    // Crear nueva canción

    const newSong = {
      id: Date.now(), // Usamos el timestamp actual como ID único
      name: songName, // El nombre de la canción que el usuario escribió
      url: songUrl, // La URL de YouTube proporcionada
      playCount: 0, // Inicialmente la canción no ha sido reproducida
    };

    addSong(newSong); // Llamar a la función para agregar la canción al estado
    setSongName(""); // Limpia el campo de nombre de la canción
    setSongUrl(""); // Limpia el campo de la URL de la canción
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
