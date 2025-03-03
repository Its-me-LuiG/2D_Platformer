// Enemy class and functions
let enemies = [];
let enemyImg;

// Create enemy pixel art
function createEnemyArt() {
    // Create simple enemy sprite (spiky ball)
    enemyImg = createGraphics(16, 16);
    enemyImg.background(0, 0, 0, 0); // Transparent background
    enemyImg.noStroke();
    
    // Main body
    enemyImg.fill(255, 100, 100);
    enemyImg.ellipse(8, 8, 12, 12);
    
    // Spikes
    enemyImg.fill(255, 50, 50);
    // Top spike
    enemyImg.triangle(8, 0, 5, 5, 11, 5);
    // Right spike
    enemyImg.triangle(16, 8, 11, 5, 11, 11);
    // Bottom spike
    enemyImg.triangle(8, 16, 5, 11, 11, 11);
    // Left spike
    enemyImg.triangle(0, 8, 5, 5, 5, 11);
    
    // Eyes
    enemyImg.fill(255);
    enemyImg.ellipse(6, 7, 3, 3);
    enemyImg.ellipse(10, 7, 3, 3);
    
    enemyImg.fill(0);
    enemyImg.ellipse(6, 7, 1, 1);
    enemyImg.ellipse(10, 7, 1, 1);
}

// Create a new enemy at the specified position
function createEnemy(x, y) {
    let enemy = createSprite(x, y, 16, 16);
    enemy.addImage(enemyImg);
    enemy.scale = 2;
    
    // Set initial velocity
    enemy.velocity.x = random(-2, 2);
    enemy.velocity.y = 0;
    
    // Add to enemies array
    enemies.push(enemy);
    
    return enemy;
}

// Update all enemies
function updateEnemies() {
    for (let enemy of enemies) {
        // Apply gravity
        enemy.velocity.y += gravity * 0.5; // Less gravity than player
        
        // Bounce off walls
        if (enemy.position.x < 0 || enemy.position.x > width) {
            enemy.velocity.x *= -1;
        }
        
        // Platform collisions
        for (let platform of platforms) {
            enemy.collide(platform);
            
            // Change direction if at edge of platform
            let onPlatform = enemy.touching.bottom;
            if (onPlatform) {
                // Check if at edge of platform
                let edgeDistance = 10;
                let atLeftEdge = enemy.position.x - (platform.position.x - platform.width/2) < edgeDistance;
                let atRightEdge = (platform.position.x + platform.width/2) - enemy.position.x < edgeDistance;
                
                if (atLeftEdge || atRightEdge) {
                    enemy.velocity.x *= -1;
                }
            }
        }
        
        // Player collision
        if (player.overlap(enemy)) {
            // Check if player is above enemy (jumping on it)
            if (player.velocity.y > 0 && player.position.y < enemy.position.y - 5) {
                // Remove enemy
                let index = enemies.indexOf(enemy);
                if (index > -1) {
                    enemies.splice(index, 1);
                    enemy.remove();
                    
                    // Bounce player
                    player.velocity.y = -8;
                    
                    // Add score
                    score += 20;
                }
            } else {
                // Player loses (reset position)
                player.position.x = 100;
                player.position.y = 300;
                
                // Subtract score
                score = max(0, score - 10);
            }
        }
    }
}

// How to integrate with main game:
/*
1. Add to index.html:
   <script src="src/enemies.js"></script>

2. In game.js, add to createPixelArt():
   createEnemyArt();

3. In game.js, add to setup():
   // Create some enemies
   createEnemy(300, 100);
   createEnemy(500, 100);

4. In game.js, add to draw():
   // Update enemies
   updateEnemies();
*/ 