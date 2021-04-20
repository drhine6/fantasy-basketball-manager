import { Button } from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import PlayerSearch from "./components/PlayerSearch";
import PlayerTable from "./components/PlayerTable";
import moment from "moment";
import { data } from "./db_temp";

const SEASON_AVERAGES = "https://www.balldontlie.io/api/v1/season_averages";
const GAMES = "https://www.balldontlie.io/api/v1/games";

function App() {
  const [players, setPlayers] = useState(data);

  const addPlayer = (player) => {
    const url = `${SEASON_AVERAGES}?seasons[]=2020&player_ids[]=${player.id}`;
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

  const getSchedules = () => {
    const startDate = moment().isoWeekday(1).format("YYYY-MM-DD");
    const endDate = moment().isoWeekday(1).add(6, "days").format("YYYY-MM-DD");
    var url = `${GAMES}?seasons[]=2020&start_date=${startDate}&end_date=${endDate}`;
    const teamIds = [...new Set(players.map((player) => player.team.id))];
    const teamIdsString = teamIds.join("&team_ids[]=");
    url += "&team_ids[]=" + teamIdsString;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const allGames = data.data;
        const playersWithSchedules = players.map((player) => {
          const games = allGames.filter(
            (game) =>
              game.home_team.id === player.team.id ||
              game.visitor_team.id === player.team.id
          );
          return { ...player, games };
        });
        console.log(JSON.stringify(playersWithSchedules));
        setPlayers(playersWithSchedules);
      });
  };

  return (
    <div className="App">
      <PlayerSearch addPlayer={addPlayer} />
      <h1>Roster</h1>
      <PlayerTable players={players} />
      <div className="generate">
        <Button color="primary" variant="contained" onClick={getSchedules}>
          Generate Schedules
        </Button>
      </div>
    </div>
  );
}

export default App;
