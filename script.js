const players = [

];

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

const game = (playerCount = 2) => {
    const playerNames = document.getElementsByClassName('player-name-input');
    addPlayers(playerNames);
    document.querySelector('main').innerHTML = "";


    console.log(players)

}



preGame();

