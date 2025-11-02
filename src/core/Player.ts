/**
 * SOURCE: Custom implementation
 * PURPOSE: Player class - handles lane switching (UP/DOWN between 3 lanes)
 * MODIFICATIONS: Pure TypeScript, no React dependencies
 */

import { Player as PlayerType, Position, Bounds } from './types';

export class Player {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private currentLane: number; // 0 = top, 1 = middle, 2 = bottom
  private lanes: number[]; // Y positions for each lane
  private isMoving: boolean;
  private moveSpeed: number;
  private targetY: number;

  constructor(_canvasWidth: number, canvasHeight: number) {
    this.width = 300;  // Made character bigger
    this.height = 300; // Made character bigger
    this.x = 150;
    this.moveSpeed = 15; // Speed of lane switching
    
    // Calculate 3 evenly spaced lanes
    const laneHeight = canvasHeight / 3;
    this.lanes = [
      laneHeight / 2 - this.height / 2,        // Top lane
      canvasHeight / 2 - this.height / 2,       // Middle lane
      (laneHeight * 2.5) - this.height / 2      // Bottom lane
    ];
    
    this.currentLane = 1; // Start in middle lane
    this.y = this.lanes[this.currentLane];
    this.targetY = this.y;
    this.isMoving = false;
  }

  moveUp(): void {
    if (this.currentLane > 0 && !this.isMoving) {
      this.currentLane--;
      this.targetY = this.lanes[this.currentLane];
      this.isMoving = true;
    }
  }

  moveDown(): void {
    if (this.currentLane < 2 && !this.isMoving) {
      this.currentLane++;
      this.targetY = this.lanes[this.currentLane];
      this.isMoving = true;
    }
  }

  update(): void {
    // Smooth movement to target lane
    if (this.isMoving) {
      const diff = this.targetY - this.y;
      if (Math.abs(diff) < this.moveSpeed) {
        this.y = this.targetY;
        this.isMoving = false;
      } else {
        this.y += Math.sign(diff) * this.moveSpeed;
      }
    }
  }

  getCurrentLane(): number {
    return this.currentLane;
  }

  isOnGround(): boolean {
    return !this.isMoving;
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  getBounds(): Bounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  getState(): PlayerType {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      speed: 0
    };
  }

  reset(canvasHeight: number): void {
    const laneHeight = canvasHeight / 3;
    this.lanes = [
      laneHeight / 2 - this.height / 2,
      canvasHeight / 2 - this.height / 2,
      (laneHeight * 2.5) - this.height / 2
    ];
    this.currentLane = 1; // Reset to middle lane
    this.y = this.lanes[this.currentLane];
    this.targetY = this.y;
    this.isMoving = false;
  }
}

