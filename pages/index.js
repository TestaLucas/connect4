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
  const [winner, setWinner] = useState([]);

  const renderedGrid = (grid) => {
    const test = grid.map((e) => (
      <div className="row">
        {e.map((ee) => {
          if (ee == "r") {
            return <div className="cell red"></div>;
          } else if (ee == "y") {
            return <div className="cell yellow"></div>;
          } else if (ee == "wr") {
            return <div className="cell red win"></div>;
          } else if (ee == "wy") {
            return <div className="cell yellow win"></div>;
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
      if (grid[0][i] == "v" && winner.length==0) {
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
    let test = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (gridTest[j][i] != "v") {
          if (i < 4) {
            for (let y = 0; y < 4; y++) {
              if (gridTest[j][i] == gridTest[j][i + y]) {
                test.push([j, i + y]);
                if (test.length == 4) {
                  setWinner(test);
                  renderVictory(test);
                }
              } else {
                test = [];
                break;
              }
            }
          }
          if (j > 2) {
            for (let y = 0; y < 4; y++) {
              if (gridTest[j][i] == gridTest[j - y][i]) {
                test.push([j - y, i]);
                if (test.length == 4) {
                  setWinner(test);
                  renderVictory(test);
                }
              } else {
                test = [];
                break;
              }
            }
          }
          if (i < 4 && j > 2) {
            for (let y = 0; y < 4; y++) {
              if (gridTest[j][i] == gridTest[j - y][i + y]) {
                test.push([j - y, i + y]);
                if (test.length == 4) {
                  setWinner(test);
                  renderVictory(test);
                }
              } else {
                test = [];
                break;
              }
            }
          }
          if (i < 4 && j < 3) {
            for (let y = 0; y < 4; y++) {
              if (gridTest[j][i] == gridTest[j + y][i + y]) {
                test.push([j + y, i + y]);
                if (test.length == 4) {
                  setWinner(test);
                  renderVictory(test);
                }
              } else {
                test = [];
                break;
              }
            }
          }
        }
      }
    }
  };

  const renderVictory = (test) => {
    let modif2 = grid;
    const color = grid[test[0][0]][test[0][1]]
    for(let x = 0 ; x<4 ; x++){
      modif2[test[x][0]][test[x][1]] = "w"+color;
    }
    setGrid(modif2);
  }

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
            background-color: #f9ca24;
          }

          .win {
            border: 5px solid #009432; 
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
            background-color: #f1f2f6;
            border: 5px solid white;
            border-radius: 50%;
          }

          .red:hover {
            background-color: red;
          }

          .yellow:hover {
            background-color: #f9ca24;
          }
        `}
      </style>
      {renderedPlayZone(player)}
      <div id="board">{renderedGrid(grid)}</div>
    </div>
  );
}
