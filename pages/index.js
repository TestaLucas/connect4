import Head from "next/head";
import React, { useState, useEffect } from "react";

export default function Home() {
  const initGrid = [
    [["v"], ["v"], ["v"], ["v"], ["v"], ["v"], ["v"]],
    [["v"], ["v"], ["v"], ["v"], ["v"], ["v"], ["v"]],
    [["v"], ["v"], ["v"], ["v"], ["v"], ["v"], ["v"]],
    [["v"], ["v"], ["v"], ["v"], ["v"], ["v"], ["v"]],
    [["v"], ["v"], ["v"], ["v"], ["v"], ["v"], ["v"]],
    [["v"], ["v"], ["v"], ["v"], ["v"], ["v"], ["v"]],
  ];
  const [grid, setGrid] = useState(initGrid);
  const [player, setPlayer] = useState("r");
  const [winner, setWinner] = useState("v");

  const renderedGrid = (grid) => {
    const test = grid.map((e) => (
      <div className="row">
        {e.map((ee) => {
          if (ee == "r") {
            return <div className="cell red"></div>;
          } else if (ee == "y") {
            return <div className="cell yellow"></div>;
          } else {
            return <div className="cell"></div>;
          }
        })}
      </div>
    ));
    return test;
  };

  const renderedPlayZone = (player) => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      if (grid[0][i] == "v" && winner == "v") {
        if (player == "r") {
          arr.push(
            <div
              className="selector red"
              onClick={() => {
                setPlayer("y");
                played(i);
              }}
            ></div>
          );
        } else {
          arr.push(
            <div
              className="selector yellow"
              onClick={() => {
                setPlayer("r");
                played(i);
              }}
            ></div>
          );
        }
      } else {
        arr.push(<div className="selector"></div>);
      }
    }
    return <div id="playZone">{arr}</div>;
  };

  const played = (col) => {
    let modif = grid;
    for (let j = 5; j >= 0; j--) {
      if (modif[j][col] == "v") {
        modif[j][col] = player;
        setGrid(modif);
        testVictory(modif);
        return;
      }
    }
  };

  const testVictory = (gridTest) => {
    let test = ["v", 0];
    for (let i = 0; i < 7; i++) {
      test = ["v", 0];
      for (let j = 0; j < 6; j++) {
        if (gridTest[j][i] == test[0] && gridTest[j][i] != "v") {
          test[1] += 1;
        } else {
          test[0] = gridTest[j][i];
          test[1] = 0;
        }
        if (test[1] == 3) {
          setWinner(test[0]);
          break;
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      test = ["v", 0];
      for (let j = 0; j < 7; j++) {
        if (gridTest[i][j] == test[0] && gridTest[i][j] != "v") {
          test[1] += 1;
        } else {
          test[0] = gridTest[i][j];
          test[1] = 0;
        }
        if (test[1] == 3) {
          setWinner(test[0]);
          break;
        }
      }
    }
    for (let i=0 ; i<6 ;i++){
      test = ["v", 0];
    
    }
  };

  return (
    <div id="container">
      <style jsx global>
        {`
          .row {
            display: flex;
            justify-content: space-between;
          }

          .cell {
            background-color: white;
            width: 80px;
            height: 80px;
            border: 5px solid blue;
            border-radius: 50%;
          }

          .red {
            background-color: red;
          }

          .yellow {
            background-color: yellow;
          }

          #board {
            background-color: blue;
            color: white;
            width: min-content;
            padding: 20px;
          }

          #playZone {
            display: flex;
            margin: 20px;
          }

          .selector {
            height: 80px;
            width: 80px;
            background-color: white;
            border: 5px solid black;
            border-radius: 50%;
          }

          .red:hover {
            background-color: red;
          }

          .yellow:hover {
            background-color: yellow;
          }
        `}
      </style>
      {winner}
      {renderedPlayZone(player)}
      <div id="board">{renderedGrid(grid)}</div>
    </div>
  );
}
