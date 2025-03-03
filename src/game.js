// Game variables
let player;
let platforms = [];
let coins = [];
let gravity = 0.5;
let score = 0;
let playerImg, coinImg, platformImg, groundImg;

// Create pixel art assets
function createPixelArt() {
    // Create player (ghost) sprite
    playerImg = createGraphics(16, 16);
    playerImg.background(0, 0, 0, 0); // Transparent background
    playerImg.noStroke();
    playerImg.fill(200, 200, 255);
    
    // Ghost body
    playerImg.rect(3, 3, 10, 8, 2);
    
    // Ghost wavy bottom
    playerImg.rect(3, 11, 2, 2);
    playerImg.rect(7, 11, 2, 2);
    playerImg.rect(11, 11, 2, 2);
    
    // Ghost eyes
    playerImg.fill(0);
    playerImg.rect(5, 5, 2, 2);
    playerImg.rect(9, 5, 2, 2);
    
    // Create coin sprite
    coinImg = createGraphics(8, 8);
    coinImg.background(0, 0, 0, 0); // Transparent background
    coinImg.noStroke();
    coinImg.fill(255, 215, 0);
    coinImg.ellipse(4, 4, 6, 6);
    coinImg.fill(220, 180, 0);
    coinImg.ellipse(4, 4, 4, 4);
    
    // Create platform sprite
    platformImg = createGraphics(16, 8);
    platformImg.background(0, 0, 0, 0); // Transparent background
    platformImg.noStroke();
    platformImg.fill(150, 100, 50);
    platformImg.rect(0, 0, 16, 8);
    platformImg.fill(170, 120, 60);
    platformImg.rect(0, 0, 16, 2);
    
    // Create ground sprite
    groundImg = createGraphics(16, 16);
    groundImg.background(0, 0, 0, 0); // Transparent background
    groundImg.noStroke();
    groundImg.fill(100, 150, 100);
    groundImg.rect(0, 0, 16, 16);
    groundImg.fill(80, 120, 80);
    groundImg.rect(0, 0, 16, 4);
    groundImg.fill(120, 170, 120);
    groundImg.rect(0, 12, 16, 4);
}

function setup() {
    createCanvas(800, 400);
    createPixelArt();
    
    // Create player sprite
    player = createSprite(100, 300, 16, 16);
    player.addImage(playerImg);
    player.scale = 2;
    
    // Create ground platform
    let ground = createSprite(width/2, height-10, width, 20);
    ground.addImage(groundImg);
    ground.scale = 2;
    // Stretch to fit width
    ground.width = width;
    ground.immovable = true;
    platforms.push(ground);
    
    // Create additional platforms
    for (let i = 1; i <= 3; i++) {
        let platform = createSprite(200 * i, 350 - (i * 50), 100, 10);
        platform.addImage(platformImg);
        platform.scale = 2;
        // Stretch to fit desired width
        platform.width = 100;
        platform.immovable = true;
        platforms.push(platform);
    }
    
    // Create coins
    for (let i = 0; i < 5; i++) {
        let coin = createSprite(
            random(50, width - 50),
            random(50, height - 100),
            8, 8
        );
        coin.addImage(coinImg);
        coin.scale = 2;
        coins.push(coin);
    }
}

function draw() {
    background(180, 220, 255); // Light blue sky
    
    // Apply gravity
    player.velocity.y += gravity;
    
    // Player controls
    if (keyIsDown(LEFT_ARROW)) {
        player.velocity.x = -5;
        player.mirrorX(-1); // Flip sprite to face left
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.velocity.x = 5;
        player.mirrorX(1); // Reset sprite to face right
    } else {
        player.velocity.x = 0;
    }
    
    // Jump when space is pressed and player is on ground
    if (keyWentDown(32) && player.touching.bottom) { // 32 is spacebar
        player.velocity.y = -12;
    }
    
    // Platform collisions
    for (let platform of platforms) {
        player.collide(platform);
    }
    
    // Coin collisions
    for (let i = coins.length - 1; i >= 0; i--) {
        if (player.overlap(coins[i])) {
            coins[i].remove();
            coins.splice(i, 1);
            score += 10;
        }
    }
    
    // Keep player in bounds
    if (player.position.x < 0) player.position.x = 0;
    if (player.position.x > width) player.position.x = width;
    
    // Reset player if they fall off the bottom
    if (player.position.y > height) {
        player.position.x = 100;
        player.position.y = 300;
    }
    
    // Draw all sprites
    drawSprites();
    
    // Display score
    fill(0);
    textSize(20);
    text('Score: ' + score, 20, 30);
}

// Add a function to create a new level
function createNewLevel() {
    // Clear existing platforms (except ground)
    for (let i = platforms.length - 1; i > 0; i--) {
        platforms[i].remove();
        platforms.splice(i, 1);
    }
    
    // Create new platforms
    for (let i = 0; i < 5; i++) {
        let platform = createSprite(
            random(100, width - 100),
            random(100, height - 100),
            random(50, 150), 10
        );
        platform.addImage(platformImg);
        platform.scale = 2;
        platform.width = random(50, 150);
        platform.immovable = true;
        platforms.push(platform);
    }
    
    // Create new coins
    for (let coin of coins) {
        coin.remove();
    }
    coins = [];
    
    for (let i = 0; i < 5; i++) {
        let coin = createSprite(
            random(50, width - 50),
            random(50, height - 100),
            8, 8
        );
        coin.addImage(coinImg);
        coin.scale = 2;
        coins.push(coin);
    }
} 