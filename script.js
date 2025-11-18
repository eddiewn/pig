const players = [];
let playerTurn = 0;
let numPlayers = 2;

//Fisher-Yates Shuffle Algorithm
function roll() {
    const dice = [1, 2, 3, 4, 5, 6];
    for (let i = dice.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = dice[i];
        dice[i] = dice[j];
        dice[j] = k;
    }
    return dice[0];
}

const preGame = () => {

    !document.querySelector('main') ? null : document.querySelector('main').remove();
    
    const main = document.createElement('main');
    const inputPlayersLabel = document.createElement('label');
    inputPlayersLabel.textContent = "Number of Players: ";
    const inputPlayers = document.createElement('input');
    inputPlayers.type = 'number';
    inputPlayers.min = '1';
    inputPlayers.max = '4';
    inputPlayers.value = numPlayers;

    inputPlayers.addEventListener('change', (e) => {
        numPlayers = e.target.value;
        preGame();
    });

    const playButton = document.createElement('button');
    playButton.textContent = 'Play';

    const playerCount = document.createElement('p');
    playerCount.textContent = "Players";

    const playerNameSection = document.createElement('section');
    for (let index = 0; index < numPlayers; index++) {
        const playerNameInput = document.createElement('input');
        playerNameInput.className = 'player-name-input';
        playerNameInput.type = 'text';
        playerNameInput.placeholder = `Player ${index + 1} Name`;
        playerNameSection.append(playerNameInput);
    }

    playButton.addEventListener('click', () => {
        game(numPlayers);
    });

    main.append(inputPlayersLabel, inputPlayers,playerCount, playerNameSection, playButton);

    document.body.append(main);
}

const addPlayers = (playerNames) => {
        for (let index = 0; index < playerNames.length; index++) {
        players.push({
            id: index,
            name: playerNames[index].value || `Player ${index + 1}`,
            turns: 0,
            totalScore: 0,
            turnScore: 0,
        });
    }
}

const createGameScoreboard = () => {
    const scoreboard = document.createElement('section');
    for (let index = 0; index < players.length; index++) {
        const playerDiv = document.createElement('div');
        playerDiv.id = `player-${index}`;
        const playerName = document.createElement('h2');
        playerName.textContent = players[index].name;
        const playerTotalScore = document.createElement('p');
        playerTotalScore.id = `player-${index}-total-score`;
        playerTotalScore.textContent = `Total Score: ${players[index].totalScore}`;

        playerDiv.append(playerName, playerTotalScore);
        scoreboard.append(playerDiv);
    }

    scoreboard.id = 'scoreboard';
    const main = document.querySelector('main');
    main.append(scoreboard);
}

const createGameUI = () => {
    const main = document.querySelector('main');
    const gameSection = document.createElement('section');
    gameSection.id = 'game-section';
    
    const playerTurnH2 = document.createElement('h2');
    playerTurnH2.textContent = `Player ${players[playerTurn].name}'s Turn`;
    gameSection.append(playerTurnH2);

    const playerCurrentScore = document.createElement('p');
    playerCurrentScore.id = 'player-current-score';
    playerCurrentScore.textContent = `Current Turn Score: ${players[playerTurn].turnScore}`;
    gameSection.append(playerCurrentScore);

    const rollButton = document.createElement('button');
    rollButton.textContent = 'Roll Dice';
    gameSection.append(rollButton);

    rollButton.addEventListener('click', () => {
        const rollResult = roll();
        players[playerTurn].turns += 1;

        if (rollResult === 1) {
            players[playerTurn].turnScore = 0;
            playerTurn = (playerTurn + 1) % players.length;
        } else{
            players[playerTurn].turnScore += rollResult;
        }

        game();
        checkGameState();
    });

    const endTurnButton = document.createElement('button');
    endTurnButton.textContent = 'End Turn';
    gameSection.append(endTurnButton);

    

    endTurnButton.addEventListener('click', () => {
        players[playerTurn].totalScore += players[playerTurn].turnScore;
        players[playerTurn].turnScore = 0;
        playerTurn = (playerTurn + 1) % players.length;
        game();
    });

    const terminateGameButton = document.createElement('button');
    terminateGameButton.textContent = 'End Game';

    terminateGameButton.addEventListener('click', () => {
        if(confirm("Are you sure??")){
            players.length = 0;
            playerTurn = 0;
            preGame();
        }
    });

    gameSection.append(terminateGameButton);
    main.append(gameSection);
}

const checkGameState = () => {
    console.log("Checking Game State");
    console.log(players[playerTurn].totalScore);
        if ((players[playerTurn].totalScore + players[playerTurn].turnScore) >= 100) {
            console.log("Game is over")
            endGame(players[playerTurn]);
            return;
        }
    return false;
}

const endGame = (winner) => {
    console.log(winner)
    const main = document.querySelector('main');
    main.innerHTML = "";

    const winnerAnnouncement = document.createElement('h1');
    winnerAnnouncement.textContent = `${winner.name} Wins!`;

    playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        players.length = 0;
        playerTurn = 0;
        preGame();
    });

    winnerAnnouncement.append(playAgainButton);
    main.append(winnerAnnouncement);
    
}

const game = () => {
    const playerNames = document.getElementsByClassName('player-name-input');
    addPlayers(playerNames);
    document.querySelector('main').innerHTML = "";

    createGameScoreboard();
    createGameUI();
    console.log(players);
}



preGame();

