import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const positions = ["PG", "SG", "SF", "PF", "C"];

export default function PositionSelection() {
  return (
    <Autocomplete
      style={{ maxWidth: 240 }}
      multiple
      id="tags-outlined"
      options={positions}
      filterSelectedOptions
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
