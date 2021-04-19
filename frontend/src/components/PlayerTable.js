import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function PlayerTable({ players }) {
  const [totals, setTotals] = useState({
    pts: 0,
    fg3m: 0,
    fgm: 0,
    fga: 0,
    ftm: 0,
    fta: 0,
    reb: 0,
    ast: 0,
    stl: 0,
    blk: 0,
  });
  useEffect(() => {
    const getAverages = () => {
      var pts = 0;
      var fgm = 0;
      var fg3m = 0;
      var fga = 0;
      var ftm = 0;
      var fta = 0;
      var reb = 0;
      var ast = 0;
      var stl = 0;
      var blk = 0;
      for (var i = 0; i < players.length; i++) {
        const player = players[i];
        pts += player.pts;
        fgm += player.fgm;
        fg3m += player.fg3m;
        fga += player.fga;
        ftm += player.ftm;
        fta += player.fta;
        reb += player.reb;
        ast += player.ast;
        stl += player.stl;
        blk += player.blk;
      }
      //   const pts_avg = pts_total / players.length;
      //   const fgm_avg = fgm_total / players.length;
      //   const fg3m_avg = fg3m_total / players.length;
      //   const fga_avg = fga_total / players.length;
      //   const ftm_avg = ftm_total / players.length;
      //   const fta_avg = fta_total / players.length;
      //   const reb_avg = reb_total / players.length;
      //   const ast_avg = ast_total / players.length;   const stl_avg = stl_total / players.length;
      //   const blk_avg = blk_total / players.length;

      setTotals({
        pts,
        fg3m,
        fgm,
        fga,
        ftm,
        fta,
        reb,
        ast,
        stl,
        blk,
      });
    };
    getAverages();
  }, [players]);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Player Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align="right">MIN</TableCell>
            <TableCell align="right">AFG%</TableCell>
            <TableCell align="right">FT%</TableCell>
            <TableCell align="right">3PM</TableCell>
            <TableCell align="right">REB</TableCell>
            <TableCell align="right">AST</TableCell>
            <TableCell align="right">STL</TableCell>
            <TableCell align="right">BLK</TableCell>
            <TableCell align="right">DD</TableCell>
            <TableCell align="right">PTS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell component="th" scope="row">
                {player.first_name} {player.last_name}
              </TableCell>
              <TableCell component="th" scope="row">
                <FormGroup column>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="PG"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" />}
                    label="SG"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" />}
                    label="SF"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" />}
                    label="PF"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" />}
                    label="C"
                  />
                </FormGroup>
              </TableCell>
              <TableCell align="right">{player.min}</TableCell>
              <TableCell align="right">
                {((player.fgm + player.fg3m / 2) / player.fga).toFixed(3)}
              </TableCell>
              <TableCell align="right">
                {(player.ftm / player.fta).toFixed(3)}
              </TableCell>
              <TableCell align="right">{player.fg3m}</TableCell>
              <TableCell align="right">{player.reb}</TableCell>
              <TableCell align="right">{player.ast}</TableCell>
              <TableCell align="right">{player.stl}</TableCell>
              <TableCell align="right">{player.blk}</TableCell>
              <TableCell align="right">TODO</TableCell>
              <TableCell align="right">{player.pts}</TableCell>
            </TableRow>
          ))}
          {players.length ? (
            <TableRow key="totals">
              <TableCell component="th" scope="row">
                Expected Value
              </TableCell>
              <TableCell component="th" scope="row">
                --
              </TableCell>
              <TableCell align="right">--</TableCell>
              <TableCell align="right">
                {((totals.fgm + totals.fg3m / 2) / totals.fga).toFixed(3)}
              </TableCell>
              <TableCell align="right">
                {(totals.ftm / totals.fta).toFixed(3)}
              </TableCell>
              <TableCell align="right">{totals.fg3m.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.reb.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.ast.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.stl.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.blk.toFixed(2)}</TableCell>
              <TableCell align="right">TODO</TableCell>
              <TableCell align="right">{totals.pts.toFixed(2)}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
