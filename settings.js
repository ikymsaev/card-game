let gameTrump;
let teamTrump;
let winTeam;
let winTeamScore;
let firstStepPlayer;
let winPlayer;
let roundStepCount = 0;
let stake = [];
let outStake = [];
let turn;
let playerField = [];
let playerStepDisplay;
let playerCards;
let stakeTable = document.querySelector('.stake');
let nextStepBtn = document.querySelector('#next_step_btn');
let displayScore1 = document.querySelector('#team1');
let displayScore2 = document.querySelector('#team2');
let displayPoints1 = document.querySelector('#teamTotal1');
let displayPoints2 = document.querySelector('#teamTotal2');
let alertField = document.querySelector('.alert');
let alertString = document.querySelector('#alert_string');
let Display = document.querySelector('#trump_display');
let totalScore1 = 0;
let totalScore2 = 0;
let teamPoints1 = 0;
let teamPoints2 = 0;
let message = '';
let PLAYER = [];
const DECK = [
    {name: '7', score: 0, cardOrder: 1, valet: false, txt: '7'},
    {name: '8', score: 0, cardOrder: 2, valet: false, txt: '8'},
    {name: '9', score: 0, cardOrder: 3, valet: false, txt: '9'},
    {name: 'D', score: 3, cardOrder: 4, valet: false, txt: 'Дама'},
    {name: 'K', score: 4, cardOrder: 5, valet: false, txt: 'Король'},
    {name: '10', score: 10, cardOrder: 6, valet: false, txt: '10'},
    {name: 'T', score: 11, cardOrder: 7, valet: false, txt: 'Туз'},
    {name: 'V', score: 2, cardOrder: 8, valet: true, txt: 'Валет'}
];
const SUIT = [
    {name: 'booby', suitOrder: 1, trump: false, color: 'red', simbol: '&#9830', txt: 'Буби'},
    {name: 'chervy', suitOrder: 2, trump: false, color: 'red', simbol: '&#9829', txt: 'Черви'},
    {name: 'pick', suitOrder: 3, trump: false, color: 'black', simbol: '&#9824', txt: 'Винни'},
    {name: 'tref', suitOrder: 4, trump: false, color: 'black', simbol: '&#9827', txt: 'Крести'}
];