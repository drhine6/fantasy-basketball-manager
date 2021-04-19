import { useEffect, useState } from "react";
import "./App.css";
import PlayerSearch from "./components/PlayerSearch";
import PlayerTable from "./components/PlayerTable";

const API_ENDPOINT = "https://www.balldontlie.io/api/v1/season_averages";

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = async (player) => {
    const url = `${API_ENDPOINT}?seasons[]=2020&player_ids[]=${player.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length) {
          const playerData = data.data[0];
          const newPlayer = { ...player, ...playerData };

          setPlayers(players.concat(newPlayer));
        }
      });
  };

  return (
    <div className="App">
      <PlayerSearch addPlayer={addPlayer} />
      <PlayerTable players={players} />
    </div>
  );
}

export default App;
