# 🎮 Jungle Dash - Complete Project Requirements

## 📚 University Assignment Details

**Unit:** CIS045-3 Distributed Service Architectures  
**Assignment:** Coursework 1 (60% weighting)  
**Due Date:** 05/12/2025 (before 10 a.m.)  
**Feedback:** 12/01/2026  

---

## 🎯 Assignment Overview

### What to Submit
1. **Video (max 10 minutes)** - Main submission discussing code and 4 themes
2. **Source code** - Full working implementation with references
3. **Evidence** - Proof of Week 8 tutor presentation

### Grading Caps (Important!)
- **Grade capped at 58%** if ONE of these issues:
  - Did not present code in/before Week 8
  - Code doesn't address case study requirements
  - No dedicated code submission (only in video)
  - Video doesn't have your own voice

- **Grade capped at 48%** if TWO OR MORE of above issues

---

## 🎲 Case Study: Jungle Dash Game

### Game Description
An **endless runner** where:
- Player runs along jungle path
- Uses **keyboard controls** (arrow keys left/right)
- Aims for highest score
- Hits obstacle → **trivia question appears**
- Correct answer → **second chance** (continue)
- Wrong answer → **game over**

### Core Gameplay Loop
```
START GAME
  ↓
USERNAME LOGIN
  ↓
RUN FORWARD (auto)
  ↓
MOVE LEFT/RIGHT (player control)
  ↓
AVOID OBSTACLES (random spawn, increasing speed)
  ↓
COLLISION? → TRIVIA QUESTION
  ↓           ↓
  NO       CORRECT? → CONTINUE
           WRONG? → GAME OVER
  ↓
SCORE INCREASES (time survived)
  ↓
DISPLAY FINAL SCORE + RESTART OPTION
```

---

## 🏗️ Required Architecture Components

### 1. Software Design Principles (Low Coupling & High Cohesion)

**Main Components:**

#### Player Class
- **Responsibility:** Player position and movement
- **Methods:** moveLeft(), moveRight(), getPosition(), checkBounds()
- **Properties:** x, y, speed, isAlive

#### ObstacleManager
- **Responsibility:** Spawn and move obstacles
- **Methods:** spawnObstacle(), moveObstacles(), clearObstacles(), getDifficulty()
- **Properties:** obstacles[], spawnRate, speed

#### GameController
- **Responsibility:** Game state, scoring, collisions, difficulty
- **Methods:** startGame(), pauseGame(), endGame(), checkCollision(), updateScore()
- **Properties:** score, gameState, difficulty, isRunning

#### UI Manager
- **Responsibility:** Display UI elements and screens
- **Methods:** showScore(), showTrivia(), showGameOver(), showStartScreen()
- **Properties:** currentScreen, elements

#### Auth Module
- **Responsibility:** Username login and score storage
- **Methods:** login(), saveScore(), getHighScores()
- **Properties:** username, highScores[]

**Design Principles:**
- ✅ **Low Coupling:** Classes communicate via functions and events (not direct dependencies)
- ✅ **High Cohesion:** Each module has clear, single responsibility

---

### 2. Event-Driven Programming

**Required Events:**

| Event Type | Trigger | Handler | Result |
|------------|---------|---------|--------|
| **Movement Event** | Keyboard (Arrow keys) | Player.move() | Player position updates |
| **Obstacle Spawn Event** | Timer/Interval | ObstacleManager.spawn() | New obstacle appears |
| **Collision Event** | Player hits obstacle | GameController.handleCollision() | Trivia modal opens |
| **Trivia Answer Event** | User submits answer | GameController.checkAnswer() | Continue or Game Over |
| **Score Increase Event** | Time elapsed | GameController.updateScore() | Score increments |
| **Game State Event** | Game start/pause/end | GameController.setState() | UI updates |

**Implementation Notes:**
- Use event listeners for keyboard input
- Timer-based events for obstacle spawning
- Custom events for game state changes
- Event emitter pattern for decoupling

---

### 3. Interoperability

**Heart Game API Integration:**
- **API URL:** https://marcconrad.com/uob/heart/
- **Documentation:** https://marcconrad.com/uob/heart/doc.php
- **Purpose:** Fetch trivia questions on collision
- **Protocol:** HTTP/HTTPS REST API
- **Data Format:** JSON

**Example API Usage:**
```javascript
// Fetch trivia question
fetch('https://marcconrad.com/uob/heart/api/question')
  .then(response => response.json())
  .then(data => displayTrivia(data))
```

**Score Storage Options:**
- External JSON file
- REST API endpoint
- localStorage (browser-based)
- Backend database integration

**Key Points:**
- Code must work with external systems
- Use Axios for HTTP requests
- Validate API responses with Zod
- Handle API errors gracefully

---

### 4. Virtual Identity (Authentication)

**Requirements:**
- Username input **before** game starts
- Associate scores with username
- Store username for session
- Enable future leaderboard integration

**Authentication Flow:**
```
1. Display login screen
2. User enters username
3. Validate username (non-empty)
4. Store username in session
5. Start game
6. Save score with username on game over
7. Display in leaderboard (future)
```

**Implementation:**
- Simple username-based auth (no password required for basic version)
- Use localStorage or cookies to persist username
- Associate high scores with username
- Optional: Add password for enhanced security

---

## 🎮 Game Features Checklist

### Core Features (Must Have)
- [x] Arrow key controls (left/right movement)
- [x] Player moves horizontally along path
- [x] Randomly spawned obstacles
- [x] Obstacles move toward player
- [x] Increasing obstacle speed (difficulty)
- [x] Collision detection
- [x] Trivia question on collision
- [x] Correct answer = continue
- [x] Wrong answer = game over
- [x] Automatic score increase over time
- [x] Final score display
- [x] Game over screen with restart option
- [x] Username login before game
- [x] Clean, minimal UI

### Enhanced Features (Nice to Have)
- [ ] Multiple lives system
- [ ] Power-ups (slow time, invincibility)
- [ ] Different obstacle types
- [ ] Sound effects and music
- [ ] Animated sprites
- [ ] Particle effects
- [ ] High score leaderboard
- [ ] Multiple difficulty levels
- [ ] Achievements system

---

## 📋 Marking Rubric (4 Themes)

### Theme 1: Software Design Principles (Low Coupling & High Cohesion)

| Grade | Criteria |
|-------|----------|
| **70%+ (1st)** | Critically discuss code structure & components, consider alternative approaches |
| **60-69% (2:1)** | Confidently reflect on components (classes, libraries, packages) and their concerns |
| **50-59% (2:2)** | Clearly identify responsibilities of various software components |
| **40-49% (3rd)** | Mention how code is organized into components |
| **30-39% (Fail)** | Vague understanding of components, unable to show |
| **0-29% (Fail)** | Cannot explain code structure |

### Theme 2: Event-Driven Programming

| Grade | Criteria |
|-------|----------|
| **70%+ (1st)** | Justify approach taken for implementing events and handlers |
| **60-69% (2:1)** | Confidently reflect on event generation and handling mechanisms |
| **50-59% (2:2)** | Clearly identify various events and their role in code |
| **40-49% (3rd)** | Mention event-driven programming and relate to code |
| **30-39% (Fail)** | Events mentioned but unclear where implemented |
| **0-29% (Fail)** | Cannot explain how events work |

### Theme 3: Interoperability

| Grade | Criteria |
|-------|----------|
| **70%+ (1st)** | Critically justify approaches to include third-party software/services |
| **60-69% (2:1)** | Confidently reflect on code working with external systems |
| **50-59% (2:2)** | Clearly identify where code interoperates and protocols used |
| **40-49% (3rd)** | Mention interoperability and relate to code |
| **30-39% (Fail)** | Understand interoperability but not linked to code |
| **0-29% (Fail)** | Cannot explain interoperability |

### Theme 4: Virtual Identity (Authentication)

| Grade | Criteria |
|-------|----------|
| **70%+ (1st)** | Critically discuss authentication mechanisms, security role, alternatives |
| **60-69% (2:1)** | Confidently explain authentication usage to establish virtual identity |
| **50-59% (2:2)** | Clearly identify where passwords/cookies used |
| **40-49% (3rd)** | Mention virtual identity and relate to code |
| **30-39% (Fail)** | Know what virtual identity is but cannot relate to code |
| **0-29% (Fail)** | Cannot explain virtual identity |

---

## 🎬 Video Requirements

### Structure (Max 10 minutes)
1. **Introduction (30 sec)**
   - Project name and overview
   
2. **Live Demonstration (2 min)**
   - Show working game
   - Play through game cycle
   - Hit obstacle → trivia → continue/end

3. **Theme 1: Software Design (2 min)**
   - Show component structure
   - Explain low coupling & high cohesion
   - Discuss each class responsibility

4. **Theme 2: Event-Driven (2 min)**
   - Show event implementation
   - Demonstrate event flow
   - Explain handlers

5. **Theme 3: Interoperability (2 min)**
   - Show Heart API integration
   - Explain protocol/communication
   - Demonstrate external data handling

6. **Theme 4: Virtual Identity (1.5 min)**
   - Show authentication flow
   - Explain username storage
   - Demonstrate score persistence

**Video Must:**
- ✅ Use your own voice (authentic)
- ✅ Use relevant technical terminology
- ✅ Focus on the 4 themes
- ✅ Show working system first
- ✅ Be authentic (minimal editing)
- ✅ Demonstrate understanding

---

## 📁 Code Documentation Requirements

### File Structure
```
/src
  /core
    Player.ts          # Player class
    ObstacleManager.ts # Obstacle management
    GameController.ts  # Game state & logic
    types.ts           # TypeScript types
    events.ts          # Event system
  /services
    heartApi.ts        # Heart API integration
    storage.ts         # localStorage wrapper
  /state
    useGameStore.ts    # Zustand state management
    useAuthStore.ts    # Authentication state
  /ui
    LoginScreen.tsx    # Username login
    GameCanvas.tsx     # Main game view
    HUD.tsx            # Score display
    StartScreen.tsx    # Start menu
    GameOverScreen.tsx # Game over + scores
    TriviaModal.tsx    # Trivia question popup
  /styles
    index.css          # Global styles
  App.tsx
  main.tsx
```

### Code Comments Required
```typescript
/**
 * SOURCE: [Author/Website/AI]
 * PURPOSE: [What this code does]
 * MODIFICATIONS: [What you changed]
 */
```

Example:
```typescript
/**
 * SOURCE: ChatGPT (OpenAI)
 * PURPOSE: Event emitter pattern for game events
 * MODIFICATIONS: Added TypeScript types and custom event types
 */
class EventEmitter {
  // ... code
}
```

---

## ⚠️ Important Notes

### What's Allowed
✅ Ask other students for help  
✅ Use internet forums (StackOverflow, etc.)  
✅ Use example code from internet/books  
✅ Use third-party scripts/libraries  
✅ Use code generated by LLMs (ChatGPT, etc.)  
✅ Use example code from BREO (university platform)  

### Must Reference
📝 **All external code must be clearly marked and referenced**  
📝 Use comments in code for references  
📝 Distinguish your code from external code  

### Academic Integrity
❌ Copying someone else's code without reference = **PLAGIARISM**  
❌ Submitting someone else's work as your own = **ACADEMIC OFFENSE**  
✅ Using external code WITH proper references = **ALLOWED**  

---

## 📅 Timeline

| Week | Tasks | Topics Covered |
|------|-------|----------------|
| 1 | IDE intro, basic examples | Programming languages overview |
| 2 | Assignment introduction | Low Coupling & High Cohesion |
| 3 | Development begins | GUI and Events |
| 4 | Continue development | Interoperability |
| 5 | Continue development | Authentication & Cookies |
| 6-7 | Continue development | Other topics (not for video) |
| 8 | **TUTOR PRESENTATION** (Required!) | Feedback session |
| 9 | Finalize code | Based on feedback |
| 10 | Produce video | Video production |
| 11 | **SUBMISSION** | Revision for exam |
| 12-13 | Exam week | - |

---

## 🎓 Graduate Competencies Developed

- ✅ Digital Literacy
- ✅ Collaboration and Communication
- ✅ Problem solving and critical thinking
- ✅ Creativity and Entrepreneurship
- ✅ Adaptability and Resilience
- ✅ Course-specific: APIs, software architecture, security

---

## 📦 Submission Checklist

### Before Submitting:
- [ ] Video is max 10 minutes
- [ ] Video uses my own voice
- [ ] Video demonstrates working system
- [ ] Video discusses all 4 themes
- [ ] All source code included
- [ ] External code is referenced in comments
- [ ] Code is properly organized
- [ ] Evidence of Week 8 presentation included
- [ ] Submitted via BREO before 10 a.m. on 05/12/2025

### Code Quality:
- [ ] Code addresses case study requirements
- [ ] Game has all required features
- [ ] Heart API is integrated
- [ ] Authentication is implemented
- [ ] Events are properly used
- [ ] Components are modular (low coupling, high cohesion)
- [ ] Code runs without errors
- [ ] UI is clean and minimal

---

## 🚀 Success Criteria for High Grades

### For 70%+ (First Class):
- Critically discuss **all 4 themes** with depth
- Consider **alternative approaches** in design decisions
- Justify **why** you chose specific implementations
- Demonstrate advanced understanding
- Show complex, well-structured code
- Professional video presentation

### For 60-69% (2:1):
- Confidently reflect on all 4 themes
- Show clear understanding of concepts
- Well-organized, working code
- Good video presentation with technical terms

### For 50-59% (2:2):
- Clearly identify all 4 themes in code
- Working implementation
- Basic video presentation covering themes

---

## 📚 Resources

### APIs & Documentation
- Heart Game API: https://marcconrad.com/uob/heart/doc.php
- Java Examples: https://github.com/marcconrad/comparativeintegratedsystems
- JavaScript Examples: https://marcconrad.com/uob/heart/

### University Resources
- BREO Platform: Main submission portal
- Student Support: https://www.beds.ac.uk/student-support/mitigation/
- Academic Integrity Resource (AIR)
- Exam Info: https://www.beds.ac.uk/exams/

---

## 🎯 Project Goals Summary

Build **Jungle Dash** - an endless runner game that demonstrates:

1. **Software Design** - Modular components with clear responsibilities
2. **Event-Driven** - Keyboard, timer, collision, and game state events
3. **Interoperability** - Heart API integration for trivia questions
4. **Virtual Identity** - Username authentication and score persistence

Create a **10-minute video** explaining how your code implements these 4 themes, starting with a live demonstration of the working game.

---

*This document serves as the complete project specification for the Jungle Dash game development and video assignment.*

