let turno = 0;
let tablero = Array(9).fill('');
let contadorWinnerX = 0;
let contadorWinnerO = 0;
let juegoTerminado = false;

// Dynamic Rule State
let piezasX = 0;
let piezasO = 0;
let celdaOrigen = null; // Track which cell a piece is being moved from

// UI Elements
const gridCells = document.querySelectorAll('.cell');
const pieceX = document.getElementById('piece-x');
const pieceO = document.getElementById('piece-o');
const panelX = document.getElementById('panel-x');
const panelO = document.getElementById('panel-o');

function initGame() {
    setupInteractions();
    updateTurnUI();
}

function setupInteractions() {
    // Draggable pieces from panels (Placement Phase)
    [pieceX, pieceO].forEach(piece => {
        piece.addEventListener('dragstart', handleDragStartSource);
        piece.addEventListener('dragend', handleDragEnd);
    });

    // Cells: Hybrid Click & Drag & Movable Pieces
    gridCells.forEach(cell => {
        cell.addEventListener('dragstart', handleDragStartBoard);
        cell.addEventListener('dragover', handleDragOver);
        cell.addEventListener('dragleave', handleDragLeave);
        cell.addEventListener('drop', handleDrop);
        cell.addEventListener('click', handleCellClick);
    });
}

// Drag from Side Panels
function handleDragStartSource(e) {
    if (juegoTerminado) return;

    const isTurnX = turno % 2 === 0;
    const pieceType = e.target.id === 'piece-x' ? 'X' : 'O';
    const activeCount = isTurnX ? piezasX : piezasO;

    // Phase check: Only allow if player has < 3 pieces
    if (activeCount >= 3 || (isTurnX && pieceType === 'O') || (!isTurnX && pieceType === 'X')) {
        e.preventDefault();
        return;
    }

    celdaOrigen = null; // New piece
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', pieceType);
}

// Drag from Board (Movement Phase)
function handleDragStartBoard(e) {
    if (juegoTerminado) return;

    const index = e.target.getAttribute('data-index');
    const pieceType = tablero[index];
    const isTurnX = turno % 2 === 0;
    const activeCount = isTurnX ? piezasX : piezasO;

    // Only allow dragging own piece if player has 3 pieces on board
    if (activeCount < 3 || (isTurnX && pieceType !== 'X') || (!isTurnX && pieceType !== 'O')) {
        e.preventDefault();
        return;
    }

    celdaOrigen = index;
    e.target.classList.add('dragging-from-board');
    e.dataTransfer.setData('text/plain', pieceType);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.dragging-from-board').forEach(el => el.classList.remove('dragging-from-board'));
}

function handleDragOver(e) {
    e.preventDefault();
    if (juegoTerminado || e.target.classList.contains('occupied')) return;
    e.target.classList.add('hover');
}

function handleDragLeave(e) {
    e.target.classList.remove('hover');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('hover');
    document.querySelectorAll('.dragging-from-board').forEach(el => el.classList.remove('dragging-from-board'));

    if (juegoTerminado || e.target.classList.contains('occupied')) return;

    const pieceType = e.dataTransfer.getData('text/plain');
    const destinoIndex = e.target.getAttribute('data-index');

    executeMove(destinoIndex, pieceType);
}

function handleCellClick(e) {
    if (juegoTerminado || e.target.classList.contains('occupied')) return;

    const isTurnX = turno % 2 === 0;
    const activeCount = isTurnX ? piezasX : piezasO;
    const pieceType = isTurnX ? 'X' : 'O';
    const index = e.target.getAttribute('data-index');

    // Clicks only work in placement phase
    if (activeCount < 3) {
        celdaOrigen = null;
        executeMove(index, pieceType);
    } else {
        // En fase de movimiento, podrías seleccionar una pieza primero,
        // pero para Tateti moderno, el arrastre es más intuitivo.
        // Mostramos un mini-tip
        Swal.fire({
            toast: true,
            position: 'top',
            title: '¡Ya tienes 3 fichas! Arrastra una para moverla.',
            timer: 2000,
            showConfirmButton: false,
            background: '#1e293b',
            color: '#f8fafc'
        });
    }
}

// Adjacency Map for Orthogonal Moves
const adyacentes = {
    0: [1, 3, 4],
    1: [0, 2, 4],
    2: [1, 5, 4],
    3: [0, 4, 6],
    4: [0, 1, 2, 3, 5, 6, 7, 8],
    5: [2, 4, 8],
    6: [3, 7, 4],
    7: [4, 6, 8],
    8: [5, 7, 4]
};

function executeMove(destinoIndex, type) {
    destinoIndex = parseInt(destinoIndex);

    // If it's a movement from board, check adjacency
    if (celdaOrigen !== null) {
        const origen = parseInt(celdaOrigen);
        if (!adyacentes[origen].includes(destinoIndex)) {
            Swal.fire({
                toast: true,
                position: 'top',
                title: 'Movimiento inválido: Solo puedes moverte a celdas adyacentes (no diagonales).',
                timer: 2500,
                showConfirmButton: false,
                background: '#ef4444',
                color: '#fff'
            });
            return;
        }

        // Clear the origin
        tablero[origen] = '';
        const originCell = document.querySelector(`.cell[data-index="${origen}"]`);
        originCell.innerHTML = '';
        originCell.classList.remove('occupied', 'piece-placed');
        originCell.removeAttribute('data-player');
        originCell.draggable = false;
    } else {
        // Placement phase: increment count
        if (type === 'X') piezasX++; else piezasO++;
    }

    // Place in destination
    const destCell = document.querySelector(`.cell[data-index="${destinoIndex}"]`);
    tablero[destinoIndex] = type;
    destCell.innerHTML = type;
    destCell.classList.add('occupied', 'piece-placed');
    destCell.setAttribute('data-player', type);

    if (verificarGanador()) {
        finalizarJuego(type);
    } else {
        turno++;
        updateTurnUI();
    }
}

function updateTurnUI() {
    const isTurnX = turno % 2 === 0;
    const activeCount = isTurnX ? piezasX : piezasO;

    // Side panel draggability only if < 3
    pieceX.draggable = isTurnX && piezasX < 3;
    pieceO.draggable = !isTurnX && piezasO < 3;

    pieceX.style.opacity = piezasX >= 3 ? '0.2' : '';
    pieceO.style.opacity = piezasO >= 3 ? '0.2' : '';

    // Board draggability for current player if pieces == 3
    gridCells.forEach(cell => {
        const cellPlayer = cell.getAttribute('data-player');
        if (activeCount === 3 && ((isTurnX && cellPlayer === 'X') || (!isTurnX && cellPlayer === 'O'))) {
            cell.draggable = true;
            cell.classList.add('movable');
        } else {
            cell.draggable = false;
            cell.classList.remove('movable');
        }
    });

    panelX.classList.toggle('active-player', isTurnX);
    panelO.classList.toggle('active-player', !isTurnX);

    panelX.style.opacity = isTurnX ? '1' : '0.4';
    panelO.style.opacity = !isTurnX ? '1' : '0.4';

    panelX.style.transform = isTurnX ? 'scale(1.1)' : 'scale(1)';
    panelO.style.transform = !isTurnX ? 'scale(1.1)' : 'scale(1)';
}

function verificarGanador() {
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return combos.some(combo => {
        const [a, b, c] = combo;
        return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
    });
}

function finalizarJuego(resultado) {
    juegoTerminado = true;

    let title = `¡Ganó el Jugador ${resultado === 'X' ? '1' : '2'}!`;

    if (resultado === 'X') {
        contadorWinnerX++;
        document.getElementById('ContadorWinnerX').innerText = contadorWinnerX;
    } else if (resultado === 'O') {
        contadorWinnerO++;
        document.getElementById('ContadorWinnerO').innerText = contadorWinnerO;
    }

    Swal.fire({
        title: title,
        icon: 'success',
        background: '#1e293b',
        color: '#f8fafc',
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'Jugar otra vez',
        customClass: {
            popup: 'glass-panel'
        }
    }).then(() => {
        ReiniciarTablero();
    });
}

function ReiniciarTablero() {
    tablero = Array(9).fill('');
    turno = 0;
    piezasX = 0;
    piezasO = 0;
    juegoTerminado = false;
    celdaOrigen = null;

    gridCells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('occupied', 'piece-placed', 'hover', 'movable');
        cell.removeAttribute('data-player');
        cell.draggable = false;
    });

    updateTurnUI();
}

initGame();
