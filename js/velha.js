var playerTurn = "X";
var moves = 0;
var isGamerOver = false;
var span = document.getElementsByTagName("span");
var restartButton = '<button onclick="playAgain()">Reiniciar Jogo</button>';

function play(y) {
    if (y.dataset.player === "none" && isGamerOver === false) {
        y.innerHTML = playerTurn;
        y.dataset.player = playerTurn;
        moves++;

        // Alternar entre X e O
        playerTurn = (playerTurn === "X") ? "O" : "X";
    }

    // Verificar vencedor após cada jogada
    checkWinner(1, 2, 3);
    checkWinner(1, 4, 7);
    checkWinner(1, 5, 9);
    checkWinner(2, 5, 8);
    checkWinner(3, 6, 9);
    checkWinner(3, 5, 7);
    checkWinner(4, 5, 6);
    checkWinner(7, 8, 9);

    // Se o número de jogadas atingir 9 e não houver vencedor, é empate
    if (moves === 9 && isGamerOver === false) {
        draw();
    }
}

function checkWinner(a, b, c) {
    a--;
    b--;
    c--;

    if (
        span[a].dataset.player === span[b].dataset.player &&
        span[b].dataset.player === span[c].dataset.player &&
        span[a].dataset.player !== "none" &&
        isGamerOver === false
    ) {
        span[a].parentNode.classList.add("activeBox");
        span[b].parentNode.classList.add("activeBox");
        span[c].parentNode.classList.add("activeBox");
        gameOver(a);
    }
}

function gameOver(a) {
    var gamerOverAlertElement =
        "<b> Fim de Jogo </b><br><br>Jogador " +
        span[a].dataset.player.toUpperCase() +
        " Ganhou!!!<br><br>" +
        restartButton;

    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = gamerOverAlertElement;

    document.body.appendChild(div);
    div.style.display = "block"; // Exibe o alerta

    isGamerOver = true;
    moves = 0;
}

function draw() {
    var drawAlertElement =
        "<b>Empate!!!</b><br><br>" + restartButton;

    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = drawAlertElement;

    document.body.appendChild(div);
    div.style.display = "block"; // Exibe o alerta

    isGamerOver = true;
    moves = 0;
}

function playAgain() {
    // Remover o alerta da tela
    var alertDiv = document.querySelector(".alert");
    if (alertDiv) alertDiv.parentNode.removeChild(alertDiv);

    // Resetar o jogo
    resetGame();
}

function resetGame() {
    // Limpar todas as células
    for (var i = 0; i < span.length; i++) {
        span[i].dataset.player = "none";
        span[i].innerHTML = "&nbsp;";
        span[i].parentNode.classList.remove("activeBox"); // Remover as marcações da linha vencedora
    }

    playerTurn = "X";
    isGamerOver = false;
    moves = 0;
}
