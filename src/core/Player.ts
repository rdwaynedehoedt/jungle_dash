/**
 * SOURCE: Custom implementation
 * PURPOSE: Player class - handles vertical movement (UP/DOWN)
 * MODIFICATIONS: Pure TypeScript, no React dependencies
 */

import { Player as PlayerType, Position, Bounds } from './types';

export class Player {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private velocityY: number;
  private gravity: number;
  private jumpPower: number;
  private isJumping: boolean;
  private groundY: number;

  constructor(_canvasWidth: number, canvasHeight: number) {
    this.width = 300;
    this.height = 300;
    this.x = 100;
    this.groundY = canvasHeight - this.height - 50;
    this.y = this.groundY;
    this.velocityY = 0;
    this.gravity = 1.2;
    this.jumpPower = -28;
    this.isJumping = false;
  }

  jump(): void {
    if (!this.isJumping) {
      this.velocityY = this.jumpPower;
      this.isJumping = true;
    }
  }

  update(): void {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.velocityY = 0;
      this.isJumping = false;
    }
  }

  isOnGround(): boolean {
    return !this.isJumping;
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
    this.groundY = canvasHeight - this.height - 50;
    this.y = this.groundY;
    this.velocityY = 0;
    this.isJumping = false;
  }
}

