import { useEffect, useState } from "react";
import "./App.css";
import PlayerSearch from "./components/PlayerSearch";
import PlayerTable from "./components/PlayerTable";

const API_ENDPOINT = "https://www.balldontlie.io/api/v1/stats";

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = async (player) => {
    console.log(player);
    const url = `${API_ENDPOINT}?seasons[]=2020&player_ids[]=${player.id}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <PlayerSearch addPlayer={addPlayer} />
      <PlayerTable players={players} />
    </div>
  );
}

export default App;
