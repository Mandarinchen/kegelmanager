
import React, { useEffect, useState } from 'react';

const API_URL = '/players';

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', technik: 50, ausdauer: 50 });

  const fetchPlayers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPlayers(data);
  };

  const createPlayer = async () => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer)
    });
    setNewPlayer({ name: '', technik: 50, ausdauer: 50 });
    fetchPlayers();
  };

  const deletePlayer = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchPlayers();
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Kegelmanager</h1>
      <h2>Spieler hinzufügen</h2>
      <input
        placeholder="Name"
        value={newPlayer.name}
        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Technik"
        value={newPlayer.technik}
        onChange={(e) => setNewPlayer({ ...newPlayer, technik: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Ausdauer"
        value={newPlayer.ausdauer}
        onChange={(e) => setNewPlayer({ ...newPlayer, ausdauer: parseInt(e.target.value) })}
      />
      <button onClick={createPlayer}>Hinzufügen</button>

      <h2>Spielerliste</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} – Technik: {player.technik}, Ausdauer: {player.ausdauer}
            <button onClick={() => deletePlayer(player.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
