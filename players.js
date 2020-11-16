class Player {
    id;
    name;
    hand = [];
    turn = false;
    team;
    human;
    constructor(id, name, team, human){
        this.id = id;
        this.name = name;
        this.team = team;
        this.human = human;
    }
    step(id, player){
        if(this.turn == true && this.hand.indexOf(id) != -1 && stake.indexOf(id) == -1){
            //добавить id в массив карт 'на кону'
            stake.push(id);
            let myCardsField = document.querySelector('#player_' + this.id + '').childNodes;          
            let stakeField = document.querySelector('.table');
            let minRange = Math.round(stakeField.offsetTop + stakeField.offsetHeight / 3);
            let maxRange = Math.round(stakeField.offsetTop + stakeField.offsetHeight / 2);          
            for(let i = 0; i < this.hand.length; i++){
                if(id == this.hand[i]){
                    function go(id) {
                        /***********
                         * АНИМАЦИЯ
                         */
                        myCardsField[i].style.transition = '0.6s';
                        //случайные координаты
                        let x = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                        let y = Math.floor(Math.random() * (maxRange  - minRange) + minRange);
                        let deg = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
                        myCardsField[i].classList.add('used');

                        let top = myCardsField[i].offsetTop;
                        let verticalMid = stakeField.offsetHeight / 2;
                        let correctY = verticalMid - top - myCardsField[i].offsetHeight;

                        let left = myCardsField[i].offsetLeft;
                        let horizontalMid = stakeField.offsetWidth / 2;
                        let correctX = horizontalMid - left;
                        
                        if(player == 1){
                        myCardsField[i].style.position += 'relative';
                            if(correctX < 0){
                                myCardsField[i].style.transform += 'translate(-' + Math.abs(correctX) + 'px, -' + y + 'px)';
                            }else{
                                myCardsField[i].style.transform += 'translate('+ correctX + 'px, -' + y + 'px)';
                            }
                       }
                       if(player == 2){
                           if(correctY < 0){
                            myCardsField[i].style.transform += 'translate(' + y + 'px, -' + Math.abs(correctY) + 'px)';
                           }else{
                            myCardsField[i].style.transform += 'translate(' + y + 'px, ' + correctY + 'px)';
                           }
                        myCardsField[i].style.position += 'relative'; 
                       }
                       if(player == 3){
                        myCardsField[i].style.position += 'relative';
                        if(correctX < 0){
                            myCardsField[i].style.transform += 'translate(-' + Math.abs(correctX) + 'px, ' + y + 'px)';
                        }else{
                            myCardsField[i].style.transform += 'translate('+ correctX + 'px, ' + y + 'px)';
                        }
                       }
                       if(player == 4){
                            myCardsField[i].style.position += 'relative';
                            if(correctY < 0){
                                myCardsField[i].style.transform += 'translate(-' + y + 'px, -' + Math.abs(correctY) + 'px)';
                            }else{
                                myCardsField[i].style.transform += 'translate(-' + y + 'px, ' + correctY + 'px)';
                            }
                       }
                        myCardsField[i].style.transform += 'rotate(' + deg + 'deg)';
                        myCardsField[i].style.backgroundImage = `url('assets/img/${cardDECK[id].img}`;
                      }
                      go(id, player);
                }
            }
            //удалить из массива карт в руке игрока
            this.hand = this.hand.filter(function(item) {
                return item != id;
              });
        }
    }
    setTrump(id){
        gameTrump = cardDECK[id].suit;
        for(let i = 1; i < 33; i++){          
            if(cardDECK[i].suit == gameTrump){
                cardDECK[i].trump = true;
            }
        }
        message = `Козырь ${cardDECK[id].suitTxt}`;
        showMessage(message);
    }
    comp(){
        if(!this.human){
            if(!gameTrump && this.hand.length != 0){
                setTimeout(() => {this.compSetTrump();}, 2000);
                setTimeout(() => {this.compStep();}, 4000);
            }else{
                setTimeout(() => {this.compStep();}, 2000);
            }
        }
        
    }
compStep(){
    if(!this.human && stake.length != 4){
    let stepCard;
    let haveTrump = [];
    let haveTuz = [];
    for(let i = 0; i < this.hand.length; i++){
        if(cardDECK[this.hand[i]].trump){ 
            haveTrump.push(cardDECK[this.hand[i]].id);
        }
        if(cardDECK[this.hand[i]].name == 'T'){
            haveTuz.push(cardDECK[this.hand[i]].id);
        }
    }
/**************************************
 * ============ЛОГИКА================ *
 *************************************/

if(stake.length == 0){//ЕСЛИ ********ПЕРВЫЙ********** ХОД
    if(this.team == teamTrump){//если мы ХВАЛИЛИ
        let logicHaveValet = this.logicHaveValet();
        console.log(logicHaveValet)
            if(logicHaveValet != false){//если есть вальты
                stepCard = logicHaveValet;
            }else{
                let logicHaveTrump = this.logicHaveTrump();//если есть козыри
                if(logicHaveTrump != false){
                    stepCard = logicHaveTrump;
                }else{
                    let logicHaveTuz = this.logicHaveTuz();//если есть тузы
                    if(logicHaveTuz != false){
                        stepCard = logicHaveTuz;
                    }else{
                        let logicHaveTen = this.logicHaveTen();//если есть тыщи
                        if(logicHaveTen != false){
                            stepCard = logicHaveTen;
                        }else{
                            let logicOther = this.logicOther();//другие
                            if(logicOther != false){
                                stepCard = logicOther;
                            }else{
                                alert('не знаю с чего ходить');
                            }
                        }
                    }
                }
            }
    }else{//если мы НЕ ХВАЛИЛИ
        let logicHaveTuz = this.logicHaveTuz();//если есть тузы
        if(logicHaveTuz != false){
            stepCard = logicHaveTuz;
        }else{
            let logicHaveTen = this.logicHaveTen();//если есть тыщи
            if(logicHaveTen != false){
                stepCard = logicHaveTen;
            }else{
                let logicOther = this.logicOther();//другие
                if(logicOther != false){
                    stepCard = logicOther;
                }else{
                    alert('не знаю с чего ходить');
                }
            }
        }
    }
//если это ход ***** НЕ ПЕРВЫЙ *****
    }else if(stake.length != 0){
        let first = stake[0];
        let suiteStep = [];
        let olderCard = this.isOurBribe();//старшая карта
        let bribeTeam = PLAYER[cardDECK[olderCard].player].team;//чья взятка на данный момент
        //есть ли невышедшие вальты
        let isUnusedValets = false;
        for(let i = 1; cardDECK.length < i; i++){
            if(!cardDECK[i].used && cardDECK[i].valet && cardDECK[i].player != this.id){
                isUnusedValets = true;
            } 
        }
        
        if(cardDECK[first].trump){//если заход по козырю
            if(haveTrump.length != 0){// если есть козыря
                if(bribeTeam == this.team){
                    console.log(`взятка наша`);
                    console.log(haveTrump);
                    
                    let bestScoreCard = haveTrump[0];
                    let myTen = false;
                    let myTuz = false;
                    for(let i = 0; haveTrump.length > i; i++){
                        //выбираем карту с наибольшим к-вом очков отсеивая вальты тузы и десятки
                        if(cardDECK[haveTrump[i]].score > cardDECK[bestScoreCard].score 
                            && !cardDECK[haveTrump[i]].valet 
                            && cardDECK[haveTrump[i]].name != 'ten' 
                            && cardDECK[haveTrump[i]].name != 'tuz'){
                            bestScoreCard = haveTrump[i];
                        }
                        if(cardDECK[haveTrump[i]].name == 'ten'){
                            myTen = haveTrump[i];
                        }
                        if(cardDECK[haveTrump[i]].name == 'tuz'){
                            myTuz = haveTrump[i];
                        }
                    }
                    if(!isUnusedValets){
                        if(myTuz){
                            stepCard = myTuz;
                        }else if(myTen){
                            stepCard = myTen;
                        }else{
                            stepCard = bestScoreCard;
                        }
                    }else{
                        stepCard = bestScoreCard;
                    }
                    console.log(stepCard);
                }else{
                    console.log(`не наша`);
                    
                    //если смогу перебить взятку
                    let myOlderTrump = haveTrump[0];
                    for(let i = 0; haveTrump.length < i; i++){
                        if(cardDECK[haveTrump[i]].cardOrder > cardDECK[myOlderTrump].cardOrder){
                            myOlderTrump = haveTrump[i];
                        }
                    }
                    if(cardDECK[myOlderTrump].cardOrder > cardDECK[olderCard].cardOrder){
                        stepCard = myOlderTrump;
                        console.log(haveTrump);
                        console.log(`перебил`);

                    }else{
                        let lowestScoreCard = haveTrump[0];
                        for(let i = 0; i < haveTrump.length; i++){
                            if (cardDECK[haveTrump[i]].score < cardDECK[lowestScoreCard].score && !cardDECK[haveTrump[i]].valet){
                                lowestScoreCard = haveTrump[i];
                            }
                        }
                        stepCard = lowestScoreCard;
                        console.log(haveTrump);
                        console.log(`не смог перебить`);
                    }     
                }
            }else{
                stepCard = cardDECK[this.hand[0]].id;
                console.log(stepCard);
            }
        }else{//не с козыря
            let haveSuit = [];
            for(let i = 0; i < this.hand.length; i++){
                if(cardDECK[this.hand[i]].suit == cardDECK[first].suit && !cardDECK[this.hand[i]].valet){
                    haveSuit.push(cardDECK[this.hand[i]].id);
                }
            }
            if(haveSuit.length != 0){
                stepCard = cardDECK[haveSuit[0]].id;
            }else if(haveTrump.length != 0){
                stepCard = cardDECK[haveTrump[0]].id;
            }else{
                stepCard = this.hand[0];
            }
        } 
    }
    gameStep(stepCard, this.id);
                    
}  
}
    compSetTrump(){
        let choose;
        let cardCount = [0, 0, 0, 0];//формируем массив колличества карт одной масти
        for(let i = 0; i < this.hand.length; i++){
            if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'booby'){
                cardCount[0]++;
            }else if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'chervy'){
                cardCount[1]++;
            }else if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'pick'){
                cardCount[2]++;
            }else if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'tref'){
                cardCount[3]++;
            }
        }
        let maxCard = cardCount[0];//макс к-во карт с одинаковой мастью
        for(let i = 0; i < cardCount.length; i++){
            if(cardCount[i] > maxCard){
                maxCard = cardCount[i];
            }
        }
        let maxCardCount = 0;//колличество мастей с макс к-во карт
        for(let i = 0; i < cardCount.length; i++){
            if(cardCount[i] == maxCard){
                maxCardCount++;
            }
        }
        //если макс к-во карт только у 1 масти то, вычисляем эту масть
        if(maxCardCount == 1){
            for(let i = 0; i < cardCount.length; i++){
                if(cardCount[i] == maxCard){
                    choose = SUIT[i].name;
                    gameTrump = choose;
                    let trumpDisplay = SUIT[i].txt;
                    for(let i = 1; i < 33; i++){     
                        if(cardDECK[i].suit == gameTrump){
                            cardDECK[i].trump = true;
                        }
                    }
                    
                    message = `Козырь ${trumpDisplay}`;
                    showMessage(message);
                    for(let i = 0; i < SUIT.length; i++){
                        if(SUIT[i].name == choose){
                            Display.innerHTML = `${SUIT[i].simbol}`;
                        }
                    }
                    teamTrump = this.team;
                }
            }
        }else{
            //для выбора козыря по максимальному cardOrder
            let suits = {
                booby: 0,
                chervy: 0,
                pick: 0,
                tref: 0
            };
            let calculate = 0;
            for(let i = 0; i < this.hand.length; i++){
                if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'booby'){
                    suits.booby += cardDECK[this.hand[i]].cardOrder;
                }else if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'chervy'){
                    suits.chervy += cardDECK[this.hand[i]].cardOrder;
                }else if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'pick'){
                    suits.pick += cardDECK[this.hand[i]].cardOrder;
                }else if(!cardDECK[this.hand[i]].valet && cardDECK[this.hand[i]].suit == 'tref'){
                    suits.tref += cardDECK[this.hand[i]].cardOrder;
                }
            }
            if(suits.booby >= calculate){calculate = suits.booby;}
            if(suits.chervy >= calculate){calculate = suits.chervy;}
            if(suits.pick >= calculate){calculate = suits.pick;}
            if(suits.tref >= calculate){calculate = suits.tref;}
            if(suits.booby == calculate){choose = 'booby'};
            if(suits.chervy == calculate){choose = 'chervy'};
            if(suits.pick == calculate){choose = 'pick'};
            if(suits.tref == calculate){choose = 'tref'};
            gameTrump = choose;
            for(let i = 1; i < 33; i++){     
                if(cardDECK[i].suit == gameTrump){
                    cardDECK[i].trump = true;
                }
            }
            let trumpDisplay;
            if(gameTrump == 'booby'){trumpDisplay == 'Буби'}
            else if(gameTrump == 'chervy'){trumpDisplay == 'Черви'}
            else if(gameTrump == 'pick'){trumpDisplay == 'Винни'}
            else if(gameTrump == 'tref'){trumpDisplay == 'Крести'}
            message = `Козырь ${trumpDisplay}`;
            showMessage(message);
            for(let i = 0; i < SUIT.length; i++){
                if(SUIT[i].name == choose){
                    Display.innerHTML = `${SUIT[i].simbol}`;
                }
            }
            teamTrump = this.team;
        }     
    }

    logicHaveTuz = () =>{
        let result;
        let tuz = [];
        let suitUnusedCount = [];
        this.hand.forEach((card, i, hand) => {
            if(cardDECK[hand[i]].name == 'T' && !cardDECK[hand[i]].trump){
                tuz.push(hand[i]);
                suitUnusedCount.push(0);
            }
        });
        
        if(tuz.length != 0){
            for(let i = 0; i < tuz.length; i++){
                for(let k = 1; k < 33; k++){
                    if(cardDECK[tuz[i]].suit == cardDECK[k].suit 
                        && !cardDECK[k].used 
                        && !cardDECK[k].valet
                        && cardDECK[k].player != this.id
                        ){
                        suitUnusedCount[i]++;
                    }
                }   
            }
            console.log(`tuz: ${suitUnusedCount}`);
            let trumpsCount = 0;
            for(let i = 1; i < 33; i++){
                if(cardDECK[i].trump && !cardDECK[i].used && cardDECK[i].player != this.id){
                    trumpsCount++;
                }
            }
            let suitsCheck = false;
            suitUnusedCount.forEach((suit) => {
                if(suit > 2){
                    suitsCheck = true;
                }
            })
            let chooseTuzCard = false;
            for(let i = 0; i < tuz.length; i++){
                if(suitUnusedCount[i] > 2 || trumpsCount < 2){
                    chooseTuzCard = tuz[i];
                }
            }
            if(chooseTuzCard != false){
                result = chooseTuzCard;
            }
        }else{
            result = false;
        }
        return result;
    }

    logicHaveTen = () =>{
        let result;
        let ten = [];
        let unusedTuz = [];
        this.hand.forEach((card, i, hand) => {
            if(cardDECK[hand[i]].name == '10' && !cardDECK[hand[i]].trump){
                ten.push(hand[i]);
            }
        });
        // console.log(`ten: ${ten}`);

        if(ten.length != 0){
            let trumpsCount = 0;

            for(let i = 1; i < 33; i++){
                if(cardDECK[i].trump && !cardDECK[i].used && cardDECK[i].player != this.id){
                    trumpsCount++;
                }
            }
            // console.log(`ten trumpsCount: ${trumpsCount}`);

            for(let i = 0; i < ten.length; i++){
                for(let k = 1; k < 33; k++){
                    if(cardDECK[ten[i]].suit == cardDECK[k].suit 
                        && !cardDECK[k].used 
                        && !cardDECK[k].valet
                        && cardDECK[k].player != this.id
                        && cardDECK[k].name == 'T'
                        ){
                            unusedTuz[i] = true;
                    }
                }   
            }          
            let chooseTenCard = false;
            for(let i = 0; i < ten.length; i++){
                if(!unusedTuz[i] && trumpsCount < 2){
                    chooseTenCard = ten[i];
                }
            }

            if(chooseTenCard != false){
                result = chooseTenCard;
                console.log(1.1);
            }else{
                result = false;
                console.log(1.2);
            }
        }else{
            result = false;
        }
        return result;
    }

    logicHaveTrump = () =>{
    let result;
    let myCards = [];
        this.hand.forEach((card, i, hand) => {
            if(cardDECK[hand[i]].trump && !cardDECK[hand[i]].valet){
                myCards.push(cardDECK[hand[i]].id);
            }
        });
        
        let myOlderTrump;
        if (myCards.length != 0) {//если есть в руке козыри
            myOlderTrump = myCards[0];
            myCards.forEach((card, i, cards) => {
                if (cardDECK[cards[i]].suitOrder > cardDECK[myOlderTrump].suitOrder) {
                    myOlderTrump = cardDECK[cards[i]].id;
                }
            })
            // console.log(`myOlderTrump ${myOlderTrump}`);

            let unusedCards = [];
            let unusedValets = false;
            for (let i = 1; i < 33; i++) {
                if (cardDECK[i].trump && !cardDECK[i].used && cardDECK[i].player != this.id) {
                    unusedCards.push(cardDECK[i].id);//массив невышедших козырей
                }
                if (cardDECK[i].valet && !cardDECK[i].used && cardDECK[i].player != this.id) {
                    unusedValets = true;
                }
            }
            // console.log(`unusedValets ${unusedValets}`);
            if (unusedValets == false) {
                if (cardDECK[myOlderTrump].name == 'T') {
                    result = myOlderTrump;
                } else if (cardDECK[myOlderTrump].name == '10') {
                    for (let i = 1; i < 33; i++) {
                        if (cardDECK[i].trump && !cardDECK[i].used && cardDECK[i].player != this.id && cardDECK[i].name == 'T') {
                            result = false;
                        } else {
                            result = myOlderTrump;
                        }
                    }
                } else {
                    result = false;
                }
            } else {
                for (let i = 0; i < myCards.length; i++) {
                    if (cardDECK[myCards[i]].name != 'T' && cardDECK[myCards[i]].name != '10') {
                        result = myCards[i];
                    } else {
                        result = false;
                    }
                }
            }
        } else {
            result = false;
        }
    return result;
    }

    logicOther = () =>{
        let result;
        let myCards = [];
        this.hand.forEach((card, i, hand) => {
            if(!cardDECK[this.hand[i]].trump
                && cardDECK[this.hand[i]].name != 'T'
                && cardDECK[this.hand[i]].name != '10'
                && !cardDECK[this.hand[i]].valet){
                myCards.push(this.hand[i]);
            }
        });
        
        if(myCards.length != 0){
            let chooseCard = myCards[0];
            myCards.forEach((card, i, cards) => {
                if(cardDECK[card].cardOrder < cardDECK[chooseCard].cardOrder){
                    chooseCard = card;
                }
            })
            result = chooseCard;
            console.log(`other ${myCards}`);

        }else{
            let randCount = this.hand.length;
            let randNum = Math.floor(Math.random() * (randCount - 1 + 1)) + 1;
            result = this.hand[randNum];
            console.log(`random: ${this.hand}`);
            console.log(`random: ${result}`);
        }
        if(result){
            return result;
        }else{
            return this.hand[0];
        }
        
    }

    logicHaveValet = () => {
    let result;
    let myCards = [];
        this.hand.forEach((card, i, hand) => {
            if(cardDECK[hand[i]].valet){
                myCards.push(cardDECK[hand[i]].id);
            }
        });
        if(myCards.length != 0){//если есть в руке вальты
        let myOlderValet = myCards[0];
            myCards.forEach((card, i, cards) => {
                if(cardDECK[cards[i]].suitOrder > cardDECK[myOlderValet].suitOrder){
                    myOlderValet = cardDECK[cards[i]].id;
                }
            })
        let unusedCards = [];
            for(let i = 1; i < 33; i++){
                if(cardDECK[i].valet && !cardDECK[i].used && cardDECK[i].player != this.id){
                    unusedCards.push(cardDECK[i].id);//массив невышедших вальтов
                }
            }          
            if(unusedCards.length != 0){//если есть невышедшие вальты
                    for(let k = 0; k < unusedCards.length; k++){
                        if(cardDECK[myOlderValet].suitOrder > cardDECK[unusedCards[k]].suitOrder){
                            result = myOlderValet;
                        }else{
                            result = false;
                        }
                    }
            }else{
                result = myCards[0];
            }
        }else{
            result = false;
        }
        return result; 
    }

    isOurBribe = () =>{
        let first = stake[0];
        let winCard = cardDECK[first].id;
        for(let i = 1; i < stake.length; i++){
                //если масть совпала и это не вальты
                if(cardDECK[stake[i]].suit == cardDECK[winCard].suit && cardDECK[stake[i]].cardOrder > cardDECK[winCard].cardOrder && !cardDECK[stake[i]].valet && !cardDECK[winCard].valet){
                    winCard = cardDECK[stake[i]].id;
                }
                //если козырь и не вальты, а старшая не козырь
                if(!cardDECK[stake[i]].valet && !cardDECK[winCard].valet && cardDECK[stake[i]].trump && !cardDECK[winCard].trump){
                    winCard = cardDECK[stake[i]].id;
                }
                //если не вальты а карты козырная и старшая тоже козырная
                if(!cardDECK[stake[i]].valet && !cardDECK[winCard].valet && cardDECK[winCard].trump & cardDECK[stake[i]].trump){
                    if(cardDECK[stake[i]].cardOrder > cardDECK[winCard].cardOrder){
                        winCard = cardDECK[stake[i]].id;
                    }
                }
                if(cardDECK[stake[i]].valet){
                    if(cardDECK[winCard].valet && cardDECK[stake[i]].suitOrder > cardDECK[winCard].suitOrder){
                        winCard = cardDECK[stake[i]].id;
                    }else if(!cardDECK[winCard].valet){
                        winCard = cardDECK[stake[i]].id;
                    }
                }
        }
        
        return winCard;
    }
}
    

function addPlayers(){
    let computersCount = 3;
    PLAYER[1] = new Player(1, Player, 1, true);
    for(let i = 2; i < computersCount+2; i++){
        let team;
        if(i & 1){
            team = 1;
        }else{
            team = 2;
        }
        PLAYER[i] = new Player(i, 'Computer_' +i, team, false);
    }
}