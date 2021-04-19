import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Player Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">MIN</TableCell>
            <TableCell align="right">AFG%</TableCell>
            <TableCell align="right">FTM / FTA</TableCell>
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
              <TableCell align="right">{player.min}</TableCell>
              <TableCell align="right">
                {((player.fgm + player.fg3m / 2) / player.fga).toFixed(3)}
              </TableCell>
              <TableCell align="right">
                {player.ftm} / {player.fta}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
