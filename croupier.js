const croupier = {
    deal(){
        startMenu = document.querySelector('.start_menu');
        let playerField = [];
        playerField[1] = document.querySelector('#player_1');
        playerField[2] = document.querySelector('#player_2');
        playerField[3] = document.querySelector('#player_3');
        playerField[4] = document.querySelector('#player_4');
        let randPool = [];  //массив идентификаторов карт для рандомной раздачи
            for (let i = 0; i < deckCount; i++) {
                randPool.push(i);
            }
        let excludeNum = [];    
        let randNum = null;
        const handCountCard = 8;
        const playerCount = 4;
        function getRandomNum(){
            return Math.floor(Math.random() * (deckCount - 1 + 1)) + 1;
        };
        for (let k = 1; k <= playerCount; k++) {
            playerField[k].innerHTML = '';          
                for (let i = 0; i < handCountCard; i++) {                  
                    do {
                        randNum = getRandomNum();
                    } while (excludeNum.indexOf(randNum) != -1)
                    if (excludeNum.indexOf(randNum) == -1) {
                        excludeNum.push(randNum);
                        // если выпал крестовый валет поставить в очередь
                        if (randNum == '32'){
                            PLAYER[k].turn = true;
                            turn = k;
                            firstStepPlayer = k;
                            message = `первый ход и хвалит игрок ${firstStepPlayer}`;
                            showMessage(message);
                        }
                        PLAYER[k].hand.push(cardDECK[randNum].id);
                        cardDECK[randNum].player = k;
                        if(k == 1){
                            playerField[k].innerHTML += `</div><div style="background-image:url('assets/img/${cardDECK[randNum].img}');" class="card-item" onclick="gameStep(${cardDECK[randNum].id}, ${k})"></div>`;
                        }else{
                            playerField[k].innerHTML += `</div><div style="background-image:url('assets/img/back.jpg');" class="card-item"></div>`;
                        }
                    }
                }
        }
        startMenu.style.display = 'none';
        playerStepDisplay = document.querySelector('#player_' + firstStepPlayer + '');
        playerCards = playerStepDisplay.querySelectorAll('.card-item');
        playerCards.forEach(function(item, i){
            item.classList.add('next_step');
        });
        if(!PLAYER[firstStepPlayer].human){
            PLAYER[firstStepPlayer].comp();
        }
    }
}
