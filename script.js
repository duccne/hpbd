var board = null;
var game = new Chess();
var $status = $('#status');

// Khởi tạo AI (Stockfish)
var stockfish = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.0/stockfish.js');

stockfish.onmessage = function (event) {
    var line = event.data;
    if (line && line.indexOf('bestmove') > -1) {
        var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        if (match) {
            game.move({ from: match[1], to: match[2], promotion: match[3] || 'q' });
            board.position(game.fen());
            updateStatus();
        }
    }
};

function makeBestMove() {
    var depth = $('#difficulty').val(); 
    stockfish.postMessage('position fen ' + game.fen());
    stockfish.postMessage('go depth ' + depth);
}

function onDragStart (source, piece) {
    if (game.game_over() || piece.search(/^b/) !== -1) return false; 
}

function onDrop (source, target) {
    var move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';

    updateStatus();
    window.setTimeout(makeBestMove, 250);
}

function onSnapEnd () { 
    board.position(game.fen()); 
}

function updateStatus () {
    var statusHTML = '';
    var moveColor = game.turn() === 'b' ? 'Đen (Máy)' : 'Trắng (Bạn)';

    if (game.in_checkmate()) statusHTML = 'Trò chơi kết thúc, ' + moveColor + ' bị chiếu bí!';
    else if (game.in_draw()) statusHTML = 'Trò chơi kết thúc, Hòa cờ!';
    else {
        statusHTML = 'Lượt: ' + moveColor;
        if (game.in_check()) statusHTML += ' - Đang bị chiếu!';
    }
    $status.text(statusHTML);
}

// Cấu hình bàn cờ
var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};

// Đợi DOM load xong mới chạy (Best practice khi tách file JS)
$(document).ready(function() {
    board = Chessboard('board', config);
    updateStatus();

    // Các sự kiện nút bấm
    $('#reset-btn').on('click', function() {
        game.reset();
        board.start();
        updateStatus();
    });

    $('#toggle-3d').on('click', function() {
        $('#board').toggleClass('mode-3d');
    });

    $('#theme').on('change', function() {
        $('body').removeClass('theme-wood theme-blue').addClass($(this).val());
    });
});
