// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Game settings
const gravity = 0.5;
const friction = 0.9;
const jumpForce = -12;

// Player
const player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
    jumping: false,
    color: '#FF5722',
    score: 0,
    lives: 3
};

// Platforms array
let platforms = [
    { x: 0, y: 350, width: 800, height: 50, color: '#4CAF50' },  // Ground
    { x: 150, y: 250, width: 100, height: 20, color: '#795548' },
    { x: 300, y: 200, width: 100, height: 20, color: '#795548' },
    { x: 500, y: 150, width: 100, height: 20, color: '#795548' },
    { x: 650, y: 100, width: 100, height: 20, color: '#795548' }
];

// Collectibles
let coins = [
    { x: 200, y: 220, width: 15, height: 15, color: '#FFC107', collected: false },
    { x: 350, y: 170, width: 15, height: 15, color: '#FFC107', collected: false },
    { x: 550, y: 120, width: 15, height: 15, color: '#FFC107', collected: false },
    { x: 700, y: 70, width: 15, height: 15, color: '#FFC107', collected: false }
];

// Enemies
let enemies = [
    { x: 220, y: 235, width: 20, height: 15, color: '#F44336', dx: 1, range: 50, startX: 220 },
    { x: 520, y: 135, width: 20, height: 15, color: '#F44336', dx: 1, range: 50, startX: 520 }
];

// Game flags
let gameOver = false;
let gameWon = false;

// Event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Key handlers
function keyDown(e) {
    if (gameOver || gameWon) {
        if (e.key === 'r' || e.key === 'R') {
            resetGame();
        }
        return;
    }

    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = -5;
    } else if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') && !player.jumping) {
        player.dy = jumpForce;
        player.jumping = true;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'd' || 
        e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = 0;
    }
}

// Game loop
function update() {
    if (gameOver || gameWon) {
        drawGameState();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply physics
    player.dy += gravity;
    player.x += player.dx;
    player.y += player.dy;

    // Handle boundaries
    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Check for fall out of bounds
    if (player.y > canvas.height) {
        player.lives--;
        livesElement.textContent = `Lives: ${player.lives}`;
        if (player.lives <= 0) {
            gameOver = true;
        } else {
            player.x = 50;
            player.y = 200;
            player.dx = 0;
            player.dy = 0;
        }
    }

    // Platform collision detection
    player.jumping = true;
    platforms.forEach(platform => {
        if (isOnPlatform(player, platform)) {
            player.jumping = false;
            player.y = platform.y - player.height;
            player.dy = 0;
        }
        drawRect(platform);
    });

    // Coin collection
    coins.forEach(coin => {
        if (!coin.collected && collision(player, coin)) {
            coin.collected = true;
            player.score += 10;
            scoreElement.textContent = `Score: ${player.score}`;
        }
        if (!coin.collected) {
            drawRect(coin);
        }
    });

    // Enemy movement and collision
    enemies.forEach(enemy => {
        enemy.x += enemy.dx;
        
        if (enemy.x > enemy.startX + enemy.range || enemy.x < enemy.startX - enemy.range) {
            enemy.dx *= -1;
        }
        
        if (collision(player, enemy)) {
            player.lives--;
            livesElement.textContent = `Lives: ${player.lives}`;
            if (player.lives <= 0) {
                gameOver = true;
            } else {
                player.x = 50;
                player.y = 200;
                player.dx = 0;
                player.dy = 0;
            }
        }
        drawRect(enemy);
    });

    // Check if all coins are collected
    if (coins.every(coin => coin.collected)) {
        gameWon = true;
    }

    // Draw player
    drawRect(player);

    // Game state text
    drawGameState();

    requestAnimationFrame(update);
}

// Helper functions
function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function drawGameState() {
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '48px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        
        ctx.font = '24px Arial';
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 50);
    } else if (gameWon) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '48px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${player.score}`, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 80);
    }
}

function isOnPlatform(player, platform) {
    return player.x + player.width > platform.x &&
           player.x < platform.x + platform.width &&
           player.y + player.height >= platform.y &&
           player.y + player.height <= platform.y + player.dy;
}

function collision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

function resetGame() {
    player.x = 50;
    player.y = 200;
    player.dx = 0;
    player.dy = 0;
    player.score = 0;
    player.lives = 3;
    
    coins.forEach(coin => coin.collected = false);
    
    gameOver = false;
    gameWon = false;
    
    scoreElement.textContent = `Score: ${player.score}`;
    livesElement.textContent = `Lives: ${player.lives}`;
}

// Start the game
window.onload = function() {
    resetGame();
    update();
};