$(document).ready(function () {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cards = symbols.concat(symbols);
    let flippedCards = [];
    let matchedCards = [];

    // Shuffle function to randomize card order
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Initialize the game
    function initGame() {
        shuffle(cards);
        renderCards();
    }

    // Render cards on the board
    function renderCards() {
    const gameBoard = $('.memory-game');
    gameBoard.empty();

    cards.forEach((symbol, index) => {
        const card = $('<div>').addClass('card').attr('data-index', index);
        const frontFace = $('<div>').addClass('face front').text(symbol);
        const backFace = $('<div>').addClass('face back').text('?');

        card.append(frontFace).append(backFace);
        card.click(handleCardClick);
        gameBoard.append(card);
    });

    // Esconder as letras após um breve período (opcional)
    setTimeout(() => {
        $('.card .face.front').text('?');
    }, 1000);
}

    // Handle card click event
    function handleCardClick() {
    const clickedIndex = $(this).data('index');

    if (!flippedCards.includes(clickedIndex) && flippedCards.length < 2) {
        $(this).toggleClass('flipped');
        flippedCards.push(clickedIndex);

        // Exibir a letra correspondente ao clicar na carta
        const clickedCard = $(`.card[data-index="${clickedIndex}"]`);
        const frontFace = clickedCard.find('.front');
        const cardSymbol = cards[clickedIndex];
        frontFace.text(cardSymbol);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

    // Check if flipped cards match
    function checkMatch() {
        const [index1, index2] = flippedCards;
        const card1 = $(`.card[data-index="${index1}"]`);
        const card2 = $(`.card[data-index="${index2}"]`);

        if (cards[index1] === cards[index2]) {
            card1.addClass('matched');
            card2.addClass('matched');
            matchedCards.push(index1, index2);
            checkWin();
        } else {
            setTimeout(() => {
                card1.toggleClass('flipped');
                card2.toggleClass('flipped');
            }, 500);
        }

        flippedCards = [];
    }

    // Check if all cards are matched (win condition)
    function checkWin() {
        if (matchedCards.length === cards.length) {
            alert('Parabéns! Você ganhou!');
            // Add any additional logic or reset the game as needed
        }
    }

    // Start the game
    initGame();
});