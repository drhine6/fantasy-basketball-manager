import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const getDates = () => {
  const startDate = moment().isoWeekday(1);
  var dates = [startDate];
  for (var i = 1; i < 7; i++) {
    const d = moment().isoWeekday(1).add(i, "days");
    dates.push(d);
  }
  return dates;
};

export default function PlayerScheduleTable({ players }) {
  const dates = getDates();

  //   console.log(players[0]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Player Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {dates.map((date) => (
              <TableCell key={date.format("MMMM DD")} align="right">
                {date.format("MMMM DD")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell key="name">
                {player.first_name} {player.last_name}
              </TableCell>
              {player.games.map((opp, i) => (
                <TableCell key={i} align="right">
                  {opp === "none" ? "" : opp}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
