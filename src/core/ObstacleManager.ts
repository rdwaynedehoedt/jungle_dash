/**
 * SOURCE: Custom implementation
 * PURPOSE: Manages obstacle spawning and movement in 3 lanes
 * MODIFICATIONS: Pure TypeScript, no React dependencies
 */

import { Obstacle } from './types';

export class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private canvasWidth: number;
  private lanes: number[]; // Y positions for each lane
  private lastSpawnTime: number = 0;
  private spawnInterval: number = 2000; // milliseconds between spawns
  private obstacleSpeed: number = 8;
  private nextId: number = 0;

  private obstacleTypes: Array<{ type: Obstacle['type']; imagePath: string }> = [
    { type: 'stone2', imagePath: '/PNG/objections axe stons/Stons 2.PNG' },
    { type: 'stone3', imagePath: '/PNG/objections axe stons/Stons 3.PNG' },
    { type: 'axe', imagePath: '/PNG/objections axe stons/axe.PNG' },
    { type: 'hammer', imagePath: '/PNG/objections axe stons/hammer.PNG' },
  ];

  private images: Map<string, HTMLImageElement> = new Map();

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    
    // Calculate 3 evenly spaced lanes (same as player)
    const laneHeight = canvasHeight / 3;
    const obstacleSize = 200; // Made obstacles bigger
    this.lanes = [
      laneHeight / 2 - obstacleSize / 2,        // Top lane
      canvasHeight / 2 - obstacleSize / 2,       // Middle lane
      (laneHeight * 2.5) - obstacleSize / 2      // Bottom lane
    ];
    
    // Preload all obstacle images
    this.obstacleTypes.forEach(({ type, imagePath }) => {
      const img = new Image();
      img.src = imagePath;
      this.images.set(type, img);
    });
  }

  update(currentTime: number): void {
    // Spawn new obstacles randomly
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      this.spawnObstacle();
      this.lastSpawnTime = currentTime;
      // Randomize next spawn time (between 1.5 and 2.5 seconds)
      this.spawnInterval = 1500 + Math.random() * 1000;
    }

    // Move all obstacles to the left
    this.obstacles.forEach(obstacle => {
      obstacle.x -= obstacle.speed;
    });

    // Remove obstacles that are off screen
    this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
  }

  private spawnObstacle(): void {
    // Pick a random obstacle type
    const randomType = this.obstacleTypes[Math.floor(Math.random() * this.obstacleTypes.length)];
    
    // Pick a random lane (0, 1, or 2)
    const randomLane = Math.floor(Math.random() * 3);
    
    const obstacle: Obstacle = {
      id: `obstacle-${this.nextId++}`,
      x: this.canvasWidth, // Start from right edge
      y: this.lanes[randomLane], // Spawn in random lane
      width: 200,  // Made obstacles bigger
      height: 200, // Made obstacles bigger
      speed: this.obstacleSpeed,
      type: randomType.type,
    };

    this.obstacles.push(obstacle);
  }

  getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  getObstacleImage(type: Obstacle['type']): HTMLImageElement | undefined {
    return this.images.get(type);
  }

  checkCollision(playerBounds: { x: number; y: number; width: number; height: number }): boolean {
    // Add padding to make collision more forgiving (hitbox is smaller than visual)
    const padding = 40; // Pixels of padding on each side
    
    const playerHitbox = {
      x: playerBounds.x + padding,
      y: playerBounds.y + padding,
      width: playerBounds.width - (padding * 2),
      height: playerBounds.height - (padding * 2)
    };
    
    // Check if player collides with any obstacle
    for (const obstacle of this.obstacles) {
      // Add padding to obstacles too for more forgiving gameplay
      const obstacleHitbox = {
        x: obstacle.x + padding,
        y: obstacle.y + padding,
        width: obstacle.width - (padding * 2),
        height: obstacle.height - (padding * 2)
      };
      
      // Basic AABB (Axis-Aligned Bounding Box) collision detection
      if (
        playerHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
        playerHitbox.x + playerHitbox.width > obstacleHitbox.x &&
        playerHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
        playerHitbox.y + playerHitbox.height > obstacleHitbox.y
      ) {
        return true; // Collision detected!
      }
    }
    return false; // No collision
  }

  reset(): void {
    this.obstacles = [];
    this.lastSpawnTime = 0;
    this.nextId = 0;
  }

  updateCanvasSize(width: number, height: number): void {
    this.canvasWidth = width;
    
    // Recalculate lanes
    const laneHeight = height / 3;
    const obstacleSize = 200; // Made obstacles bigger
    this.lanes = [
      laneHeight / 2 - obstacleSize / 2,
      height / 2 - obstacleSize / 2,
      (laneHeight * 2.5) - obstacleSize / 2
    ];
  }
}

