import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";

const positionOptions = ["PG", "SG", "SF", "PF", "C"];

export default function PositionSelection({ updatePosition, player }) {
  const [positions, setPositions] = useState(
    player.positions ? player.positions : []
  );
  return (
    <Autocomplete
      style={{ maxWidth: 240 }}
      multiple
      id="tags-outlined"
      options={positionOptions}
      value={positions}
      filterSelectedOptions
      onChange={(event, newValue) => {
        updatePosition(player, newValue);
        setPositions(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Position"
          placeholder="e.g. PG"
        />
      )}
    />
  );
}
