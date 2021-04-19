import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";

const API_ENDPOINT = "https://www.balldontlie.io/api/v1/players";

export default function PlayerSearch(props) {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const encoded = playerName.replace(" ", "%20");
      const url = `${API_ENDPOINT}?search=${encoded}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPlayers(data.data);
        });
    };
    if (playerName.length > 3) {
      getPlayers();
    }
  }, [playerName]);

  return (
    <Autocomplete
      id="player-search"
      value={playerName}
      onChange={(event, newValue) => {
        props.addPlayer && props.addPlayer(newValue);
        const playerName = `${newValue.first_name} ${newValue.last_name}`;
        setPlayerName(playerName);
      }}
      inputValue={playerName}
      onInputChange={(event, newValue) => {
        setPlayerName(newValue);
      }}
      options={players}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Player name"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.first_name
      }
      renderOption={(player) => (
        <Typography noWrap>
          {player.first_name} {player.last_name}
        </Typography>
      )}
      disableClearable
    />
  );
}
