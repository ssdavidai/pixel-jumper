# Pixel Jumper

A simple yet fun HTML5 Canvas platformer game where you collect coins while avoiding enemies.

## Play Now

You can play the game directly by visiting the GitHub Pages deployment or by cloning this repository and opening index.html in your browser.

## Description

Pixel Jumper is a browser-based platformer game built with pure JavaScript, HTML5 Canvas, and CSS. The objective is to collect all the coins across the platforms while avoiding enemies to win the game.

## Features

- Simple and responsive controls
- Platform-based jumping mechanics
- Collectible coins for scoring
- Enemy characters with patrolling behavior
- Lives system
- Win and lose conditions
- Restart functionality

## How to Play

### Controls
- **Move Left**: Left Arrow or 'A' key
- **Move Right**: Right Arrow or 'D' key
- **Jump**: Up Arrow, 'W' key, or Spacebar
- **Restart**: 'R' key (after game over or win)

### Objective
Collect all the coins to win the game. You have 3 lives - don't fall off the platforms or touch the enemies!

## Installation

To run the game locally:

1. Clone this repository
```bash
git clone https://github.com/ssdavidai/pixel-jumper.git
```

2. Navigate to the project directory
```bash
cd pixel-jumper
```

3. Open `index.html` in your browser

No additional dependencies required!

## Development

This game is built with:
- HTML5
- CSS3
- Vanilla JavaScript

The project structure is simple:
- `index.html` - The main HTML document
- `style.css` - Styling for the game
- `game.js` - The game logic

## Game Design

### Physics
The game implements simple physics including:
- Gravity and falling
- Platform collision detection
- Horizontal movement with keyboard controls
- Jumping mechanics

### Game Elements
- **Player**: A colored square that the user controls
- **Platforms**: Static rectangles that the player can stand on
- **Coins**: Collectible items that increase the player's score
- **Enemies**: Moving obstacles that reduce player lives on contact

## Future Enhancements

- Additional levels
- Different enemy types
- Power-ups
- Sound effects and music
- Mobile touch controls
- Local high score saving

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic platformer games
- Created as a learning project for HTML5 Canvas and game physics