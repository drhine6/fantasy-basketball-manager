import { Button } from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import PlayerSearch from "./components/PlayerSearch";
import PlayerTable from "./components/PlayerTable";
import PlayerScheduleTable from "./components/PlayerScheduleTable";
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

  const updatePosition = (player, positions) => {
    var playersTemp = players.filter((p) => p.id !== player.id);
    const updatedPlayer = { ...player, positions };
    playersTemp.push(updatedPlayer);
    setPlayers(playersTemp);
  };

  const getSchedules = () => {
    const startDate = moment().isoWeekday(1).format("YYYY-MM-DD");
    const endDate = moment().isoWeekday(1).add(6, "days").format("YYYY-MM-DD");
    var url = `${GAMES}?seasons[]=2020&start_date=${startDate}&end_date=${endDate}`;
    const teamIds = [...new Set(players.map((player) => player.team.id))];
    const teamIdsString = teamIds.join("&team_ids[]=");
    url += "&team_ids[]=" + teamIdsString;

    // get all the games for all the players in the given week then assign them to players
    // this is a bit ugly but is done in an effort to limit API calls
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const allGames = data.data;
        console.log(allGames);
        const playersWithSchedules = players.map((player) => {
          const games = allGames.filter(
            (game) =>
              game.home_team.id === player.team.id ||
              game.visitor_team.id === player.team.id
          );
          var gamesFiltered = [];
          for (var i = 0; i < 7; i++) {
            const currentDate = moment()
              .isoWeekday(1)
              .add(i, "days")
              .format("YYYY-MM-DD");
            const currentDateGame = games.find(
              (game) =>
                moment(game.date).add(1, "days").format("YYYY-MM-DD") ===
                currentDate
            );
            if (currentDateGame) {
              if (currentDateGame.home_team.id === player.team.id) {
                gamesFiltered.push(currentDateGame.visitor_team.abbreviation);
              } else {
                gamesFiltered.push(
                  `@${currentDateGame.home_team.abbreviation}`
                );
              }
            } else {
              gamesFiltered.push("none");
            }
          }
          return { ...player, games: gamesFiltered };
        });

        setPlayers(playersWithSchedules);
      });
  };

  return (
    <div className="App">
      <PlayerSearch addPlayer={addPlayer} />
      <h1>Schedule</h1>
      {players[0].games ? <PlayerScheduleTable players={players} /> : null}
      <h1>Roster</h1>
      <PlayerTable players={players} updatePosition={updatePosition} />
      <div className="generate">
        <Button color="primary" variant="contained" onClick={getSchedules}>
          Generate Schedules
        </Button>
      </div>
    </div>
  );
}

export default App;
