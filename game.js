//показ сообщений
function showMessage(message){
    alertString.innerHTML = `${message}`;
    alertField.style.display = 'block';
    alertField.style.opacity = '1';

    setTimeout(() => {alertField.style.opacity = '0'}, 3000);
    setTimeout(() => {alertField.style.display = 'none'}, 4500);
    setTimeout(() => {alertString.innerHTML = ``}, 5000);
}
//порядок хода
function stepCounter(player){
    PLAYER[player].turn = false;

    playerStepDisplay = document.querySelector('#player_' + player + '');
    playerCards = playerStepDisplay.querySelectorAll('.card-item');
    playerCards.forEach(function(item, i){
        item.classList.remove('next_step');
    });

    turn++;
    roundStepCount++
                console.log(roundStepCount)
    
    if(turn > 4){
        turn = 1;
    }
    PLAYER[turn].turn = true;

    if(!PLAYER[turn].human && stake.length != 4){
        PLAYER[turn].comp();
    }
}
//следущий кон
function nextRound(){
    calcRound(winTeam, winTeamScore);
    startMenu.style.display = 'block';
    resetRound();
}
//сброс
function resetRound(){
    stake = [];
    outStake = [];
    roundStepCount = 0;
    totalScore1 = 0;
    totalScore2 = 0;
    displayScore1.innerHTML = `team 1 => ${totalScore1} очков`;
    displayScore2.innerHTML = `team 2 => ${totalScore2} очков`;
    gameTrump = undefined;
    for(let i = 1; i < 33; i++){ 
        if(cardDECK[i].trump && !cardDECK[i].valet){
            cardDECK[i].trump = false;
        }
        cardDECK[i].used = false;
    }
    winTeam = undefined;
    teamTrump = undefined;
    winTeamScore = undefined;
    winPlayer = undefined;
    Display.innerHTML = ``;
}
//ход по очереди
function gameStep(id, player){
    //проверка разрешен ли ход и назначен ли козырь
    if(PLAYER[player].turn == true && gameTrump){
        PLAYER[player].step(id, player);
        rulesCheck(id, player);
        stepCounter(player);
    }

    //назначение козыря
    if(gameTrump == undefined && PLAYER[1].turn == true){
        PLAYER[1].setTrump(id);
        Display.innerHTML = `${cardDECK[id].simbol}`;
        teamTrump = PLAYER[1].team;
    }

        //проверка на 4 хода
        if(stake.length == 4){
        nextStepBtn.style.display = 'block';
        for(let i = 1; i < 5; i++){
            PLAYER[i].turn = false;
        }
        calcScore();
        }
        
 
}
//следущий ход
function nextStep(){
    nextStepBtn.style.display = 'none';
    let usedCards = document.querySelectorAll('.used');
        for(let i = 0; i < usedCards.length; i++){
            usedCards[i].style.opacity = '0';
            usedCards[i].style.overflow = 'hidden';
            usedCards[i].style.transition = '0.6s';
            usedCards[i].style.padding = '0';
            usedCards[i].style.margin = '0';
            usedCards[i].style.border = '0';
            usedCards[i].style.width = '0';
            function deleteUsedCards(){
                usedCards[i].remove();
            }
            setTimeout(deleteUsedCards, 1000);
        }
        PLAYER[winPlayer].turn = true;
        inOutStake(stake);
        if(!PLAYER[turn].human){
            PLAYER[turn].comp();
        }
}
function inOutStake (cards){
    
    for(let i = 0; i < cards.length; i++){
        outStake.push(cards[i]);
        cardDECK[cards[i]].used = true;
    }
    stake = [];
}
function rulesCheck(id, player) {
    first = stake[0];
    if(stake.length == 1 && cardDECK[first].trump && PLAYER[player].team != teamTrump){
        for (let i = 0; i < PLAYER[player].hand.length; i++) {
            if (!cardDECK[PLAYER[player].hand[i]].trump) {
                message = `зашел с козыря!`;
                showMessage(message);
                break;
            }
        }
    }
    //если заход не с козыря и          не с вальта,    и   масть не совпадает
    if (stake.length > 0 && !cardDECK[first].valet && !cardDECK[first].trump && cardDECK[id].suit != cardDECK[first].suit) {
        // то проверяем карты в руке на совпадение с мастью кроме масти вальтов
        for (let i = 0; i < PLAYER[player].hand.length; i++) {
            if (cardDECK[PLAYER[player].hand[i]].suit == cardDECK[first].suit && !cardDECK[PLAYER[player].hand[i]].valet) {
                alert('Стоп игра, такая масть была в руке!');
                message = `такая масть была в руке!`;
                showMessage(message);
                break;
            }
        }
    }
     // если кон не по козырю, но зашел с вальта, то проверить била ли у него масть
    if (stake.length > 0 && cardDECK[id].valet) {
        if (!cardDECK[first].trump) {
            for (let i = 0; i < PLAYER[player].hand.length; i++) {
                if (cardDECK[PLAYER[player].hand[i]].suit == cardDECK[first].suit) {
                    alert('Стоп игра, такая масть была в руке, но зашел с вальта!');
                    message = `такая масть была в руке!`;
                    showMessage(message);
                    break;
                }
            }
        }
    }
    if (stake.length > 0 && (cardDECK[first].valet || cardDECK[first].trump) && !cardDECK[id].trump){
        for (let i = 0; i < PLAYER[player].hand.length; i++) {

            if (cardDECK[PLAYER[player].hand[i]].trump) {
                alert('Стоп игра, был козырь или валет');
                message = `был козырь или валет!`;
                showMessage(message);
                break;
            }
        }
    }
}
function calcScore(){
    //какая карта больше
    let first = stake[0];
    let winCard = cardDECK[first].id;
    let winStep;
    for(let i = 1; i < stake.length; i++){
            //если масть совпала и это не вальты
            if(cardDECK[stake[i]].suit == cardDECK[winCard].suit && cardDECK[stake[i]].cardOrder > cardDECK[winCard].cardOrder && !cardDECK[stake[i]].valet && !cardDECK[winCard].valet){
                winCard = cardDECK[stake[i]].id;
                winStep = i;
            }
            //если козырь и не вальты, а старшая не козырь
            if(!cardDECK[stake[i]].valet && !cardDECK[winCard].valet && cardDECK[stake[i]].trump && !cardDECK[winCard].trump){
                winCard = cardDECK[stake[i]].id;
                winStep = i;
            }
            //если не вальты а карты козырная и старшая тоже козырная
            if(!cardDECK[stake[i]].valet && !cardDECK[winCard].valet && cardDECK[winCard].trump & cardDECK[stake[i]].trump){
                if(cardDECK[stake[i]].cardOrder > cardDECK[winCard].cardOrder){
                    winCard = cardDECK[stake[i]].id;
                    winStep = i;
                }
            }
            if(cardDECK[stake[i]].valet){
                if(cardDECK[winCard].valet && cardDECK[stake[i]].suitOrder > cardDECK[winCard].suitOrder){
                    winCard = cardDECK[stake[i]].id;
                    winStep = i;
                }else if(!cardDECK[winCard].valet){
                    winCard = cardDECK[stake[i]].id;
                    winStep = i;
                }
            }
    }
    console.log([winCard])
    message = `Старшая: ${cardDECK[winCard].txt} ${cardDECK[winCard].suitTxt}`;
    showMessage(message);

    winPlayer = firstStepPlayer;
    for(let i = 0; i < winStep; i++){
        
        if(winPlayer == 4){
            winPlayer = 0;
        }
            winPlayer++;
    }
    turn = winPlayer;
    firstStepPlayer = winPlayer;
    showMessage(message);

        //подсветка вкл
        playerStepDisplay = document.querySelector('#player_' + winPlayer + '');
        playerCards = playerStepDisplay.querySelectorAll('.card-item');
        playerCards.forEach(function(item, i){
            item.classList.add('next_step');
        });
    
    console.log(`Взятку взял ${winPlayer}`);
    let stakeScore = 0;

    for(let i = 0; i < stake.length; i++){
        stakeScore = stakeScore + cardDECK[stake[i]].score;
    }
    if(winPlayer == 1 || winPlayer == 3){
        totalScore1 += stakeScore;
        displayScore1.innerHTML = `team 1 => ${totalScore1} очков`;
    }else{
        totalScore2 += stakeScore;
        displayScore2.innerHTML = `team 2 => ${totalScore2} очков`;
    }
    
    //конец кона
    if(roundStepCount == 32){
        
        if(totalScore1 == 60 && totalscore2 == 60){
            alert('Яйца!!!');
        }else if(totalScore1 > totalScore2){
            winTeam = 1;
            winTeamScore = totalScore1;
        }else{
            winTeam = 2;
            winTeamScore = totalScore2;
        }
        message = `раунд закончен!! ${winTeam}`;
        nextStepBtn.style.display = 'none';
        showMessage(message);
        nextRound();
    }
}
function calcRound(team, score){
    console.log(`${team}`);
    console.log(`${score}`);
    if (score == 120){
        if (team != teamTrump){
            setRoundPoints(team, 4);
        }else{
            setRoundPoints(team, 3);
        }
    } else if (score > 90){
        if (team != teamTrump){
            setRoundPoints(team, 3);
        }else{
            setRoundPoints(team, 2);
        }
    } else if (score > 60){
        if (team != teamTrump){
            setRoundPoints(team, 2);
        }else{
            setRoundPoints(team, 1);
        }
    }
}
function setRoundPoints(team, points){
    if(team == 1){
        teamPoints1 += points;
        displayPoints1.innerHTML = `team 1 | ${teamPoints1} `;
        message = `команда 1 записывает ${points}`;
        showMessage(message);
    }else{
        teamPoints2 += points;
        displayPoints2.innerHTML = `team 2 | ${teamPoints2} `;
        message = `команда 2 записывает ${points}`;
        showMessage(message);
    }
}