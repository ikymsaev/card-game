/************
Главный класс карты
************/
class Card {
    id;
    name;
    suit;
    cardOrder;
    suitOrder;
    color;
    score;
    trump = false;
    valet = false;
    img;
    txt;
    suitTxt;
    used = false;
    player;

    constructor(id, name, cardOrder, suit, suitOrder, valet, color, simbol, score, txt, suitTxt) {
        this.id             = id;
        this.name           = name;
        this.cardOrder      = cardOrder;
        this.suit           = suit;
        this.suitOrder      = suitOrder;
        this.valet          = valet;
        this.color          = color;
        this.simbol         = simbol;
        this.score          = score;
        this.img            = `${id}.jpg`;
        this.txt            = txt;
        this.suitTxt        = suitTxt;
    }
    setValetTrump(){
        if(this.valet == true){
            this.trump = true;
        }
    }
}


/************
==Колода карт==
************/
let cardDECK = {};
let deckCount = 0;

function createCardDeck(){
    let cardID = 1; 

    for(let i = 0; i < DECK.length; i++){    

        for(let j = 0; j < SUIT.length; j++){
            cardDECK[cardID] = new Card(
                cardID,
                DECK[i].name,
                DECK[i].cardOrder,
                SUIT[j].name,
                SUIT[j].suitOrder,
                DECK[i].valet,
                SUIT[j].color,
                SUIT[j].simbol,
                DECK[i].score,
                DECK[i].txt,
                SUIT[j].txt
                );
            cardDECK[cardID].setValetTrump();
            cardID++;
            deckCount++;
        }
    }
}



