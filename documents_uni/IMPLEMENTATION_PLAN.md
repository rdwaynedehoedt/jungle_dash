# 🚀 Jungle Dash - Complete Implementation Plan

## 📋 Project Status
- **Current State:** UI skeleton complete (Login, Menu, Level Select, Countdown)
- **Missing:** Core game mechanics, Firebase integration, actual gameplay
- **Goal:** Complete working game meeting all 4 university assignment themes

---

## 🎯 Implementation Strategy

### Phase 1: Firebase Setup & Integration (START HERE)
**Priority: HIGH** - Required for authentication and score persistence

#### 1.1 Firebase Project Setup
- Create Firebase project at https://console.firebase.google.com
- Enable Firebase Authentication (Email/Password provider)
- Enable Firestore Database
- Get Firebase configuration credentials

#### 1.2 Install Dependencies
```bash
npm install firebase
```

#### 1.3 Create Firebase Configuration
**File:** `src/services/firebase.ts`
- Initialize Firebase app
- Export auth and firestore instances
- Add error handling

#### 1.4 Update Authentication System
**Files to modify:**
- `src/state/useAuthStore.ts` - Replace localStorage with Firebase Auth
- `src/ui/LoginScreen.tsx` - Integrate Firebase auth methods
- `src/services/auth.ts` (NEW) - Firebase auth service layer

**Features:**
- Sign up with email/password (replace PIN verification)
- Login with email/password
- Password reset functionality
- Persist auth state across sessions
- Store user data in Firestore

#### 1.5 Firestore Database Structure
```
users/
  {userId}/
    username: string
    email: string
    createdAt: timestamp
    totalGames: number
    highScore: number

scores/
  {scoreId}/
    userId: string
    username: string
    score: number
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    timestamp: timestamp
    correctAnswers: number
    wrongAnswers: number

leaderboard/
  global/
    topScores: array (top 100)
  
  byDifficulty/
    easy/
      topScores: array
    medium/
      topScores: array
    hard/
      topScores: array
```

#### 1.6 Create Storage Service
**File:** `src/services/storage.ts`
- saveScore(userId, scoreData)
- getHighScores(difficulty?, limit?)
- getUserStats(userId)
- updateUserProfile(userId, data)

---

### Phase 2: Core Game Logic (Pure TypeScript - No React)
**Priority: HIGH** - Required for Theme 1 (Software Design)

#### 2.1 Types & Interfaces
**File:** `src/core/types.ts`
```typescript
// Game state types
type GameState = 'READY' | 'PLAYING' | 'PAUSED' | 'TRIVIA' | 'GAME_OVER';
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type Lane = 0 | 1 | 2; // 3-lane runner

// Player interface
interface Player {
  lane: Lane;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

// Obstacle interface
interface Obstacle {
  id: string;
  lane: Lane;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'rock' | 'log' | 'tree';
}

// Game stats
interface GameStats {
  score: number;
  distance: number;
  obstaclesAvoided: number;
  correctAnswers: number;
  wrongAnswers: number;
  startTime: number;
  duration: number;
}
```

#### 2.2 Player Class
**File:** `src/core/Player.ts`
- **Responsibility:** Player position and movement (3-lane system)
- **Methods:**
  - `moveLeft()` - Move to left lane
  - `moveRight()` - Move to right lane
  - `getPosition()` - Return current position
  - `getLane()` - Return current lane
  - `reset()` - Reset to starting position
- **Properties:** lane, x, y, width, height, speed
- **Design:** Pure class, no React dependencies

#### 2.3 Obstacle Manager
**File:** `src/core/ObstacleManager.ts`
- **Responsibility:** Spawn, move, and manage obstacles
- **Methods:**
  - `spawnObstacle()` - Create new obstacle in random lane
  - `updateObstacles(deltaTime)` - Move all obstacles
  - `removeOffscreenObstacles()` - Cleanup
  - `getObstacles()` - Return obstacle array
  - `clear()` - Remove all obstacles
  - `adjustDifficulty(score)` - Increase speed/spawn rate
- **Properties:** obstacles[], spawnRate, speed, difficulty
- **Logic:**
  - Random lane selection
  - Difficulty scaling: speed increases every 10 points
  - Spawn rate increases with score

#### 2.4 Game Controller
**File:** `src/core/GameController.ts`
- **Responsibility:** Game state, scoring, collision detection
- **Methods:**
  - `start(difficulty)` - Initialize game
  - `pause()` - Pause game
  - `resume()` - Resume game
  - `update(deltaTime)` - Main game loop tick
  - `checkCollision()` - Detect player-obstacle collision
  - `handleCorrectAnswer()` - Remove obstacle, continue
  - `handleWrongAnswer()` - End game
  - `updateScore(deltaTime)` - Increment score
  - `getStats()` - Return game statistics
- **Properties:** 
  - player: Player instance
  - obstacleManager: ObstacleManager instance
  - gameState: GameState
  - stats: GameStats
  - difficulty: Difficulty
- **Design:** Orchestrates player, obstacles, and game state

#### 2.5 Event System
**File:** `src/core/events.ts`
- **Purpose:** Decouple components using event emitter pattern
- **Events:**
  - `GAME_START` - Game begins
  - `GAME_PAUSE` - Game paused
  - `GAME_RESUME` - Game resumed
  - `COLLISION` - Player hit obstacle
  - `SCORE_UPDATE` - Score changed
  - `GAME_OVER` - Game ended
  - `TRIVIA_SHOW` - Show trivia modal
  - `TRIVIA_CORRECT` - Correct answer
  - `TRIVIA_WRONG` - Wrong answer

```typescript
class GameEventEmitter {
  private events: Map<string, Function[]>;
  
  on(event: string, callback: Function);
  off(event: string, callback: Function);
  emit(event: string, data?: any);
}
```

---

### Phase 3: Heart API Integration
**Priority: HIGH** - Required for Theme 3 (Interoperability)

#### 3.1 API Service
**File:** `src/services/heartApi.ts`
- **API URL:** https://marcconrad.com/uob/heart/api/index.php
- **Methods:**
  - `fetchQuestion()` - Get random trivia question
  - `validateAnswer(answer)` - Check if answer correct
- **Features:**
  - Axios HTTP client
  - Zod schema validation
  - Error handling and retries
  - Loading states

#### 3.2 Zod Schemas
**File:** `src/services/schemas.ts`
```typescript
import { z } from 'zod';

const HeartApiResponseSchema = z.object({
  question: z.string(),
  image: z.string().url(),
  answer: z.number(),
  options: z.array(z.number()).optional(),
});
```

#### 3.3 API Response Caching
- Cache questions to reduce API calls
- Implement retry logic for failures
- Fallback questions if API is down

---

### Phase 4: Game UI Components
**Priority: HIGH** - Actual gameplay screen

#### 4.1 Game Canvas Component
**File:** `src/ui/GameCanvas.tsx`
- **Purpose:** Render game using HTML5 Canvas
- **Responsibilities:**
  - Initialize canvas and game controller
  - Render game loop (60 FPS)
  - Draw player, obstacles, background
  - Handle keyboard input (Arrow Left/Right)
  - Listen to game events
  - Show HUD overlay

**Canvas Rendering:**
```typescript
// Rendering layers
1. Background (jungle scene with parallax)
2. Obstacles (drawn from array)
3. Player (in current lane)
4. Effects (collision, particles)
```

#### 4.2 HUD Component
**File:** `src/ui/HUD.tsx`
- **Purpose:** Overlay game stats during play
- **Display:**
  - Current score (large, top center)
  - Distance traveled
  - Obstacles avoided
  - Lives remaining
  - Pause button
  - Difficulty indicator

#### 4.3 Trivia Modal
**File:** `src/ui/TriviaModal.tsx`
- **Purpose:** Show trivia question on collision
- **Features:**
  - Display Heart API question image
  - Show answer options (0-9 number pad)
  - Timer countdown (10 seconds)
  - Correct/Wrong feedback
  - Freeze game while showing
- **Design:**
  - Full-screen overlay
  - Image from API
  - Large clickable number buttons
  - Visual feedback on selection

#### 4.4 Game Over Screen
**File:** `src/ui/GameOverScreen.tsx`
- **Purpose:** Show results and allow restart
- **Display:**
  - Final score (large)
  - Stats (distance, obstacles avoided, correct/wrong answers)
  - Star rating (1-3 stars based on score)
  - Buttons: Restart, Main Menu, Leaderboard
- **Integration:**
  - Save score to Firestore
  - Show personal best comparison
  - Animate score counting up

---

### Phase 5: Game State Management
**Priority: MEDIUM** - Zustand stores

#### 5.1 Game Store
**File:** `src/state/useGameStore.ts`
```typescript
interface GameStore {
  gameState: GameState;
  score: number;
  difficulty: Difficulty;
  stats: GameStats;
  
  setGameState: (state: GameState) => void;
  updateScore: (score: number) => void;
  resetGame: () => void;
}
```

#### 5.2 Update Auth Store
**File:** `src/state/useAuthStore.ts`
- Integrate Firebase auth state
- Store user profile data
- Handle auth persistence

---

### Phase 6: Integration & Flow
**Priority: HIGH** - Connect all pieces

#### 6.1 Update App.tsx
- Route to GameCanvas after countdown
- Handle game over → back to menu
- Pass difficulty from level select

#### 6.2 Update StartScreen.tsx
- Add actual game start after countdown
- Pass selected difficulty to game

#### 6.3 Keyboard Controls
**Implementation in GameCanvas:**
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') player.moveLeft();
    if (e.key === 'ArrowRight') player.moveRight();
    if (e.key === 'Escape') pauseGame();
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

### Phase 7: Enhancements
**Priority: LOW** - Polish and extra features

#### 7.1 Sound Effects
- Background music (toggle on/off)
- Collision sound
- Correct/wrong answer sounds
- Button click sounds

#### 7.2 Animations
- Player lane switching animation
- Obstacle spawn animation
- Score increment animation
- Particle effects on collision

#### 7.3 Leaderboard
- Global top 10
- Filter by difficulty
- Personal rank display
- Real-time updates

#### 7.4 Settings Screen (Enhance existing)
- Volume controls
- Difficulty selection
- Keyboard bindings
- Graphics quality

---

## 📁 Final File Structure

```
src/
├── core/                    # Pure TypeScript - NO REACT
│   ├── Player.ts           # Player movement logic
│   ├── ObstacleManager.ts  # Obstacle spawning/movement
│   ├── GameController.ts   # Game state & collision
│   ├── types.ts            # TypeScript interfaces
│   └── events.ts           # Event emitter pattern
│
├── services/               # External integrations
│   ├── firebase.ts         # Firebase initialization
│   ├── auth.ts             # Firebase auth wrapper
│   ├── storage.ts          # Firestore operations
│   ├── heartApi.ts         # Heart API integration
│   └── schemas.ts          # Zod validation schemas
│
├── state/                  # Zustand stores
│   ├── useAuthStore.ts     # Authentication state
│   └── useGameStore.ts     # Game state
│
├── ui/                     # React components
│   ├── LoginScreen.tsx     # ✅ DONE
│   ├── StartScreen.tsx     # ✅ DONE
│   ├── LevelSelectScreen.tsx  # ✅ DONE
│   ├── CountdownScreen.tsx    # ✅ DONE
│   ├── GameCanvas.tsx      # ❌ TO BUILD
│   ├── HUD.tsx             # ❌ TO BUILD
│   ├── TriviaModal.tsx     # ❌ TO BUILD
│   ├── GameOverScreen.tsx  # ❌ TO BUILD
│   ├── ProfileScreen.tsx   # ✅ DONE (enhance with stats)
│   ├── SettingsScreen.tsx  # ✅ DONE (enhance)
│   └── ShopScreen.tsx      # ✅ DONE
│
├── styles/
│   └── index.css           # Global styles + Canvas styles
│
├── App.tsx                 # Main router
└── main.tsx                # Entry point
```

---

## 🎓 Assignment Theme Alignment

### Theme 1: Software Design (Low Coupling & High Cohesion)
✅ **Demonstrated by:**
- Separate Player, ObstacleManager, GameController classes
- Each class has single responsibility
- Communication via events (low coupling)
- Services layer for external APIs
- State management separated from UI

### Theme 2: Event-Driven Programming
✅ **Demonstrated by:**
- Keyboard event listeners (Arrow keys)
- Game events (collision, score update, state change)
- Custom EventEmitter pattern in `/core/events.ts`
- React useEffect hooks responding to state changes
- Timer-based obstacle spawning

### Theme 3: Interoperability
✅ **Demonstrated by:**
- Heart API integration for trivia questions
- Firebase Firestore for score storage
- Firebase Authentication for user management
- HTTP/HTTPS REST API calls
- JSON data parsing and validation with Zod
- Cross-platform browser compatibility

### Theme 4: Virtual Identity (Authentication)
✅ **Demonstrated by:**
- Firebase Authentication (email/password)
- Username associated with scores
- Persistent sessions (Firebase handles this)
- User profile data in Firestore
- Secure password handling
- Score ownership and leaderboard identity

---

## 🔧 Technical Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- HTML5 Canvas (game rendering)

### State Management
- Zustand (global state)

### Backend Services
- Firebase Authentication
- Firebase Firestore (database)
- Firebase Hosting (optional deployment)

### External APIs
- Heart Game API (trivia questions)

### Validation & HTTP
- Zod (schema validation)
- Axios (HTTP client)

### Development
- TypeScript strict mode
- ESLint
- Hot reload with Vite

---

## 📋 Implementation Checklist

### Phase 1: Firebase (START HERE) ⏳
- [ ] Create Firebase project
- [ ] Install firebase package
- [ ] Create firebase.ts configuration
- [ ] Create auth.ts service
- [ ] Create storage.ts service
- [ ] Update useAuthStore.ts with Firebase
- [ ] Update LoginScreen.tsx with Firebase auth
- [ ] Test authentication flow
- [ ] Set up Firestore database structure

### Phase 2: Core Game Logic
- [ ] Create types.ts with all interfaces
- [ ] Create events.ts with EventEmitter
- [ ] Create Player.ts class
- [ ] Create ObstacleManager.ts class
- [ ] Create GameController.ts class
- [ ] Write unit tests for core logic

### Phase 3: Heart API
- [ ] Create heartApi.ts service
- [ ] Create Zod schemas
- [ ] Test API integration
- [ ] Implement caching
- [ ] Add error handling

### Phase 4: Game UI
- [ ] Create GameCanvas.tsx
- [ ] Implement Canvas rendering
- [ ] Add keyboard controls
- [ ] Create HUD.tsx
- [ ] Create TriviaModal.tsx
- [ ] Create GameOverScreen.tsx

### Phase 5: Integration
- [ ] Create useGameStore.ts
- [ ] Update App.tsx routing
- [ ] Connect countdown → game
- [ ] Connect game → game over → menu
- [ ] Test complete game flow

### Phase 6: Polish
- [ ] Add sound effects
- [ ] Add animations
- [ ] Implement leaderboard
- [ ] Enhance settings
- [ ] Test on different browsers

### Phase 7: Documentation
- [ ] Add code comments with SOURCE/PURPOSE
- [ ] Update README
- [ ] Create video demonstration
- [ ] Prepare Week 8 presentation

---

## 🎯 Success Criteria

### Minimum Viable Product (50-59%)
- ✅ Working login system
- ✅ Player can move left/right
- ✅ Obstacles spawn and move
- ✅ Collision detection works
- ✅ Trivia appears on collision
- ✅ Correct/wrong answer logic works
- ✅ Score increases over time
- ✅ Game over screen shows final score

### Good Implementation (60-69%)
- All MVP features +
- ✅ Firebase authentication
- ✅ Scores saved to Firestore
- ✅ Clean code architecture
- ✅ Proper event system
- ✅ Error handling
- ✅ Smooth animations

### Excellent Implementation (70%+)
- All Good features +
- ✅ Leaderboard system
- ✅ Multiple difficulty levels
- ✅ Sound effects and music
- ✅ Particle effects
- ✅ Professional UI/UX
- ✅ Comprehensive error handling
- ✅ Code comments and documentation

---

## ⏱️ Time Estimates

| Phase | Estimated Time | Priority |
|-------|----------------|----------|
| Firebase Setup | 2-3 hours | HIGH |
| Core Game Logic | 4-6 hours | HIGH |
| Heart API | 1-2 hours | HIGH |
| Game UI (Canvas) | 6-8 hours | HIGH |
| Integration | 2-3 hours | HIGH |
| Polish & Enhancements | 4-6 hours | MEDIUM |
| Documentation | 2-3 hours | HIGH |
| **Total** | **21-31 hours** | - |

---

## 🚀 Next Steps

1. **Set up Firebase project** (first priority)
2. **Install firebase package**
3. **Create Firebase configuration files**
4. **Integrate Firebase Authentication**
5. **Build core game logic classes**
6. **Create GameCanvas component**
7. **Integrate Heart API**
8. **Connect all components**
9. **Polish and test**
10. **Create video demonstration**

---

*This plan follows the project requirements and ensures all 4 assignment themes are properly demonstrated in the code.*

