# Pixel Platformer

A simple 2D platformer game with pixel art graphics created using p5.js and p5.play.

## Features

- Player character (ghost) that can move and jump
- Platforms to jump on
- Collectible coins that add to your score
- Simple pixel art graphics created programmatically
- Collision detection and gravity physics

## How to Play

- Use **Left/Right Arrow Keys** to move
- Press **Spacebar** to jump
- Collect coins to increase your score
- Don't fall off the bottom of the screen!

## Project Structure

```
pixel-platformer/
├── index.html        # Main HTML file
├── src/
│   ├── game.js       # Main game code
│   └── style.css     # CSS styling
├── assets/           # For additional assets (sounds, images)
├── lib/              # For additional libraries
└── docs/             # Documentation
```

## Setup for Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pixel-platformer.git
   ```

2. Open the project in your favorite code editor

3. Launch a local server to run the game (you can use Live Server in VS Code or any other local server)

4. Open `index.html` in your browser

## Collaboration with Git

### Workflow for Collaboration

1. **Create a branch for your feature**:
   ```
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit them**:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push your branch to GitHub**:
   ```
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub to merge your changes into the main branch

5. **Review and merge** the Pull Request after discussion

### Tips for Collaboration

- Communicate regularly about what you're working on
- Keep commits small and focused on specific changes
- Write clear commit messages
- Pull the latest changes from the main branch before starting new work
- Resolve merge conflicts promptly

## Extending the Game

Here are some ideas for extending the game:

- Add enemies that move around
- Create multiple levels
- Add power-ups
- Implement a lives system
- Add sound effects and music
- Create a level editor

## License

This project is open source and available under the [MIT License](LICENSE). 