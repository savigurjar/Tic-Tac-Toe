const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const board_array = new Array(9).fill("E");
  
  function checkWinner() {
    for (let [index0, index1, index2] of winner) {
      if (
        board_array[index0] !== "E" &&
        board_array[index0] === board_array[index1] &&
        board_array[index1] === board_array[index2]
      ) {
        return true; // Found a winner
      }
    }
    return false; // No winner yet
  }
  
  const sawako = document.querySelector("#sawako");
  const sadako = document.querySelector("#sadako");
  const container0 = document.querySelector(".container0");
  const container1 = document.querySelector(".container1");
  const winningMessage = document.querySelector("#winningMessage");
  
  let turn = "O"; // First turn belongs to 'O' (Sawako)
  let total_turns = 0; // Counts the number of moves
  
  const playTicTacToe = (e) => {
    const element = e.target;
  
    if (board_array[element.id] === "E") {
      total_turns++;
  
      if (turn === "O") {
        element.innerHTML = "O";
        board_array[element.id] = "O";
  
        if (checkWinner()) {
          winningMessage.innerHTML = "Sawako Won!";
          container0.classList.add("winner");
          boxContainer.removeEventListener("click", playTicTacToe);
          return; // Stop execution after win
        }
  
        turn = "X"; // Switch turn to X
      } else {
        element.innerHTML = "X";
        board_array[element.id] = "X";
  
        if (checkWinner()) {
          winningMessage.innerHTML = "Sadako Won!";
          container1.classList.add("winner");
          boxContainer.removeEventListener("click", playTicTacToe);
          return; // Stop execution after win
        }
  
        turn = "O"; // Switch turn to O
      }
  
      active_player();
  
      // Check for a draw
      if (total_turns === 9 && !checkWinner()) {
        winningMessage.innerHTML = `It's a Draw!`;
      }
    }
  };
  
  const restartButton = document.querySelector("#restart-btn");
  
  restartButton.addEventListener("click", () => {
    board_array.fill("E");
    document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
    total_turns = 0;
    turn = "O";
    boxContainer.addEventListener("click", playTicTacToe);
    winningMessage.innerHTML = "";
    container0.classList.remove("winner");
    container1.classList.remove("winner");
    active_player();
  });
  
  const active_player = () => {
    if (turn === "O") {
      sawako.classList.add("active");
      sadako.classList.remove("active");
    } else {
      sadako.classList.add("active");
      sawako.classList.remove("active");
    }
  };
  
  const boxContainer = document.querySelector(".box-container");
  boxContainer.addEventListener("click", playTicTacToe);
  