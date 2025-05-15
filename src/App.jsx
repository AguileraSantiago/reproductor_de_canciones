import React, { useState, useEffect } from "react";
import SongForm from "./components/Form";
import SongList from "./components/List";
import Modal from "./components/Modal";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isSorted, setIsSorted] = useState(false); // Estado para controlar el orden

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    setSongs(storedSongs);
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem("songs", JSON.stringify(songs));
    }
  }, [songs]);

  const addSong = (song) => {
    setSongs((prevSongs) => [...prevSongs, song]);
  };

  const playSong = (song) => {
    setSongs((prevSongs) =>
      prevSongs.map((s) =>
        s.id === song.id ? { ...s, playCount: s.playCount + 1 } : s
      )
    );
    setCurrentSong(song);
    setIsModalOpen(true);
  };

  const searchSongs = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
  };

  // Función para ordenar las canciones por playCount
  const sortedSongs = [...songs].sort((a, b) => b.playCount - a.playCount);

  // Función para alternar el estado de ordenamiento
  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  // Usar el estado de ordenamiento para decidir si mostrar canciones ordenadas o no
  const displaySongs = isSorted ? sortedSongs : songs;

  return (
    <div className="App">
      <header className="header">
        <img
          className="logoForm"
          src="/public/lista-de-reproduccion.png"
          alt="logo"
        />
        <h1 className="title">Playlist</h1>
      </header>
      <SongForm addSong={addSong} songList={songs} />
      <input
        type="text"
        placeholder="Buscar canción..."
        value={searchTerm}
        onChange={searchSongs}
        className="search-bar"
      />
      <button onClick={toggleSort} className="btn sort-btn">
        {isSorted ? "Quitar orden" : "Ordenar por más reproducidas"}
      </button>
      <SongList
        songs={displaySongs.filter((song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onPlay={playSong}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          song={currentSong}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
