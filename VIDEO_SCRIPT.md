# JUNGLE DASH - VIDEO PRESENTATION SCRIPT
## CIS045-3 Distributed Service Architectures Assignment 1
### Target: A+ Grade (78+)

---

## 📋 PRE-RECORDING CHECKLIST

### Before You Start Recording:
- [ ] Test microphone - clear audio is CRITICAL
- [ ] Close all unnecessary tabs/applications
- [ ] Set browser zoom to 100%
- [ ] Have the game running on localhost
- [ ] Open VS Code with project structure visible
- [ ] Have Firebase Console open in another tab
- [ ] Test game flow once (login → play → trivia → game over)
- [ ] Prepare your student ID card or have ID number visible
- [ ] Set screen resolution to 1920x1080 for best clarity

### What to Have Open:
1. **Main screen**: Your game in browser
2. **VS Code**: src folder structure visible
3. **Firebase Console**: Ready to show database
4. **Browser DevTools**: Ready to show network tab for API calls

---

## 🎬 VIDEO SCRIPT (10 Minutes)

---

### [00:00 - 00:45] INTRODUCTION (45 seconds)

#### 📺 WHAT TO SHOW:
- Start with game main menu on screen
- Picture-in-picture of yourself in corner (optional but professional)

#### 🎤 WHAT TO SAY:
```
"Hello, my name is [YOUR NAME] and my student ID is [YOUR ID NUMBER].

This video is for Assignment 1 of the Distributed Service Architectures unit, code CIS045-3.

I have developed a web-based game called 'Jungle Dash' that integrates the Heart Game API provided in the case study.

In this presentation, I will demonstrate the game's functionality and discuss four critical themes:
- First, Software Design Principles, focusing on Low Coupling and High Cohesion
- Second, Event-Driven Programming and how events flow through the system
- Third, Interoperability through the Heart API integration
- And finally, Virtual Identity using Firebase authentication

Let me first show you how the game works."
```

#### 💡 TIPS:
- Speak clearly and confidently
- Look at the camera if you're showing yourself
- Smile - first impressions matter!

---

### [00:45 - 01:45] GAMEPLAY DEMONSTRATION (60 seconds)

#### 📺 WHAT TO SHOW:
Screen recording of:
1. Main menu (Start screen)
2. Login/Register screen
3. Quick registration of new user
4. Game starting (countdown)
5. Playing for ~15 seconds (show lane switching)
6. Hitting an obstacle → Trivia modal appears
7. Answering the heart counting question
8. Game over screen with score
9. Leaderboard

#### 🎤 WHAT TO SAY:
```
"Let me demonstrate the complete game flow.

[Click Play → Login Screen appears]
The game starts with authentication - users must log in or register.

[Click Register, fill in details quickly]
I'll create a new account. Notice the email validation and secure password requirements.

[After registration, back to login]
Now logging in with the credentials I just created.

[Game starts, countdown appears]
The game uses a 3-lane system. The player character stays on the left, and obstacles approach from the right.

[Show playing - press UP arrow, DOWN arrow]
I can switch between three lanes using the arrow keys to avoid obstacles. The character is in the middle lane, moving to top lane, now to bottom lane.

[Intentionally hit an obstacle]
When I collide with an obstacle, instead of instant game over, I get a second chance through the Heart Game API trivia question.

[Trivia modal shows - image with hearts]
The system fetches a question from the Marc Conrad Heart API. I need to count the hearts in this image.

[Enter answer]
Let me enter my answer... [Enter correct answer if possible, or wrong answer]

[Game continues or ends]
And the game continues! [or: "That was incorrect, so the game ends"]

[Game over screen shows]
Finally, the results are displayed showing my score, obstacles avoided, and accuracy. The score is automatically saved to the leaderboard with my authenticated user identity.

[Click Leaderboard]
Here's the leaderboard showing all players ranked by score.

Now let me discuss the architecture behind this."
```

#### 💡 TIPS:
- Keep this moving quickly - don't waste time
- Narrate what you're doing clearly
- If you make a mistake, keep going naturally

---

### [01:45 - 03:45] THEME 1: SOFTWARE DESIGN PRINCIPLES (2 minutes)

#### 📺 WHAT TO SHOW:
Switch to VS Code, showing:
1. src folder structure
2. Zoom into each folder briefly
3. Open Player.ts (show it's pure TypeScript)
4. Open ObstacleManager.ts
5. Open heartApi.ts
6. Open GameCanvas.tsx (show it uses the core classes)
7. Open useGameStore.ts

#### 🎤 WHAT TO SAY:
```
"Let me discuss the first theme: Software Design Principles, specifically Low Coupling and High Cohesion.

[Show src folder structure]
The architecture follows a strict separation of concerns with four main layers:

[Highlight /core folder]
First, the CORE layer contains pure game logic - Player and ObstacleManager classes. 
Critically, this is pure TypeScript with ZERO React dependencies.

[Open Player.ts, scroll through it]
The Player class handles all lane-switching mechanics. Notice there are no imports from React or any UI libraries. This is intentional - it achieves low coupling by making the game logic completely independent of the presentation layer. 

I could theoretically reuse this exact same Player class in a mobile app, a terminal game, or even a different web framework without changing a single line.

[Open ObstacleManager.ts, show the class]
Similarly, ObstacleManager handles spawning and collision detection. It's a pure TypeScript class that knows nothing about React or the DOM.

This design decision - keeping core logic pure - was influenced by the principles of Hexagonal Architecture, where the business logic is at the center and completely independent of external systems.

[Highlight /services folder]
The SERVICES layer handles all external communication. 

[Open heartApi.ts]
Here's the Heart API service. It's a simple fetch wrapper that returns typed data. Notice the error handling and type safety with TypeScript interfaces.

An alternative approach would have been to call the API directly from the React component, but that would create tight coupling. By extracting it to a service, I can easily mock it for testing, swap it for a different API, or add caching without touching any UI code.

[Open auth.ts - just show it briefly]
Authentication is also isolated in the services layer using Firebase.

[Highlight /state folder]
The STATE layer uses Zustand for global state management.

[Open useGameStore.ts, show the interface]
This store manages game state: whether we're playing, paused, or in trivia mode, plus all the stats like score and obstacles avoided.

I considered using Redux here, but Zustand offers better cohesion - each store is small and focused. The game store only knows about game state, not about authentication or leaderboards. That's high cohesion.

[Highlight /ui folder]
Finally, the UI layer contains pure React components.

[Open GameCanvas.tsx briefly]
These components are "dumb" - they receive props and state, render UI, and dispatch events. No business logic here.

This layered architecture achieves:
- LOW COUPLING: Each layer can change independently
- HIGH COHESION: Each module has a single, well-defined responsibility

The trade-off is more files and slight complexity, but the benefits are testability, maintainability, and scalability."
```

#### 💡 TIPS:
- Don't read every line of code - highlight key parts
- Use your mouse to point at specific lines
- Mention alternatives and why you chose your approach (critical thinking!)

---

### [03:45 - 05:45] THEME 2: EVENT-DRIVEN PROGRAMMING (2 minutes)

#### 📺 WHAT TO SHOW:
1. Open GameCanvas.tsx - find keyboard event listeners
2. Show the game state flow diagram (you can draw this quickly on paper or use a whiteboard tool)
3. Show useGameStore.ts state transitions
4. Show TriviaModal.tsx event handlers
5. Run the game and open Browser DevTools Console (optional - to show events firing)

#### 🎤 WHAT TO SAY:
```
"Now let's discuss Event-Driven Programming, the second theme.

Jungle Dash is fundamentally event-driven. The entire game flow is controlled by events triggering state changes.

[Open GameCanvas.tsx, scroll to useEffect with keyboard listener]
Here's the keyboard event listener. When the user presses ArrowUp or ArrowDown, an event fires.

[Point to the code]
Notice I'm using the native browser KeyboardEvent API, but I'm not directly modifying the player. Instead, I call player.moveUp() or player.moveDown(), which encapsulates the logic.

I'm also cleaning up the event listener in the return function. This is crucial - without cleanup, you'd have memory leaks with multiple listeners accumulating.

An alternative approach would be using a library like RxJS for observable event streams, but for this game's scope, native events with proper cleanup are simpler and more maintainable.

[Open useGameStore.ts]
The game operates as a state machine with these states: READY, PLAYING, PAUSED, TRIVIA, and GAME_OVER.

Events trigger transitions between states:
- User clicks "Play" → READY to PLAYING
- Collision detected → PLAYING to TRIVIA  
- Trivia answered → TRIVIA to PLAYING or GAME_OVER
- Time expires → PLAYING to GAME_OVER

[Show the setGameState function]
State changes are centralized through this Zustand action. This is a form of the Observer pattern - components subscribe to the store and automatically re-render when state changes.

[Open TriviaModal.tsx, find handleSubmit]
Here's another example of event-driven flow. When the user submits an answer, we trigger an event.

[Point to onCorrect and onWrong callbacks]
These are callback functions passed as props - another event pattern. The modal doesn't know what happens after answering; it just fires the appropriate event.

This decoupling means I could reuse this TriviaModal in a different game or add sound effects to correct answers without modifying the modal component itself.

[Optional: Show browser console with game running]
If I add console logs, you can see events firing in real-time: keystroke events, collision events, API response events, state change events.

The event-driven approach makes the game reactive and responsive. Instead of constantly polling "Has the user pressed a key? Has there been a collision?", we wait for events and react to them.

The trade-off is complexity in understanding the flow - you need to trace events through callbacks. But the benefits are better performance, cleaner code, and easier feature additions."
```

#### 💡 TIPS:
- Clearly explain the event flow
- Use your cursor to trace the path of events through code
- Mention the Observer pattern and State Machine pattern by name

---

### [05:45 - 07:45] THEME 3: INTEROPERABILITY (2 minutes)

#### 📺 WHAT TO SHOW:
1. Open heartApi.ts in VS Code
2. Open browser DevTools → Network tab
3. Run game, trigger trivia, show API call in Network tab
4. Go to https://marcconrad.com/uob/heart/api.php in browser to show raw API response
5. Show leaderboardService.ts (Firestore API)
6. Show Firebase Console with data

#### 🎤 WHAT TO SAY:
```
"The third theme is Interoperability - how different systems communicate.

This game integrates with TWO external systems: the Heart Game API and Firebase.

[Open heartApi.ts]
Here's my service for the Heart Game API. The API endpoint is provided in the case study: marcconrad.com/uob/heart/api.php

[Point to the fetch call]
I'm using the Fetch API to make HTTP GET requests. The API returns JSON with two fields: 'question' which is an image URL, and 'solution' which is the correct answer.

[Point to the TypeScript interface]
I've defined a TypeScript interface to ensure type safety. This is critical for interoperability - you need to validate the data contract between systems.

Let me show you this in action.

[Switch to browser, open DevTools → Network tab]
I'll start the game and trigger the trivia question.

[Play game, hit obstacle, trivia appears]
[Point to Network tab]
Here - you can see the HTTP request to marcconrad.com. Status 200, successful response.

[Click on the request to show details]
And here's the response payload: the question URL pointing to an image on the server, and the solution number.

[Open the API URL directly in browser: https://marcconrad.com/uob/heart/api.php]
If I call the API directly, you can see the raw JSON response. Each call returns a different random question.

This demonstrates REST API interoperability - a standard, stateless, HTTP-based protocol that's language and platform agnostic. The API is written in PHP, my frontend is React with TypeScript, but we communicate seamlessly through JSON over HTTP.

Alternative protocols I considered:
- GraphQL for more flexible queries, but the Heart API is already RESTful
- WebSockets for real-time data, but unnecessary for this use case since we only need questions on-demand

Now, the second system: Firebase.

[Open leaderboardService.ts]
I'm using Firestore, Firebase's NoSQL database, to store player scores and user profiles.

[Show the code briefly - highlight the Firestore methods]
Firestore provides a JavaScript SDK with methods like addDoc, getDocs, and query. This is interoperability through a SDK rather than raw HTTP calls.

[Switch to Firebase Console]
Here's the live Firebase Console. 

[Show Firestore database]
You can see my 'leaderboard' collection with documents for each game session - username, score, timestamp.

[Show Authentication section]
And here's the Authentication section showing registered users.

This demonstrates interoperability across multiple protocols:
- REST API for the Heart Game
- Firebase SDK for authentication and database
- All orchestrated through my React frontend

The key challenge in interoperability is handling failures gracefully. 

[Point back to heartApi.ts error handling]
Notice the try-catch block - if the API is down, I catch the error and can show a user-friendly message instead of crashing the app."
```

#### 💡 TIPS:
- Actually show the Network tab - this is impressive
- Mention protocols by name (REST, HTTP, JSON)
- Talk about error handling - shows maturity

---

### [07:45 - 09:45] THEME 4: VIRTUAL IDENTITY (2 minutes)

#### 📺 WHAT TO SHOW:
1. Open auth.ts in VS Code
2. Show Firebase Authentication in browser console
3. Show login process in game
4. Open Firebase Console → Authentication
5. Show how username appears in game
6. Show leaderboard with different users
7. Show Firestore security rules (optional but impressive)

#### 🎤 WHAT TO SAY:
```
"The final theme is Virtual Identity - how the system distinguishes between different users.

Virtual identity is critical for this game because scores need to be associated with specific players for the leaderboard to be meaningful.

[Open auth.ts in VS Code]
I've implemented authentication using Firebase Authentication, which is a managed identity service.

[Scroll through the file, point to key functions]
Here are the main functions: registerUser, loginUser, and logoutUser.

[Point to registerUser function]
When a user registers, three things happen:
First, Firebase creates an authentication credential with email and password.
Second, I create a user profile document in Firestore with additional data like username and registration timestamp.
Third, the authentication state is synchronized with my Zustand store.

[Point to password hashing mention]
Firebase handles password hashing automatically using bcrypt with salt rounds. I don't store plain text passwords - they're hashed on Firebase's servers.

An alternative would be implementing JWT tokens with a custom backend, but Firebase provides enterprise-grade security out of the box, including protection against brute force attacks and email verification.

Let me demonstrate the identity flow.

[Switch to game, go to login screen]
When a user first accesses the game, they must authenticate. 

[Click Register]
Let me register a new user. I'll enter a username, email, and password.

[Fill in form with obvious test data like "DemoPlayer"]
Notice the email format validation and password requirements.

[Submit registration]
[Show success message]

[Switch to Firebase Console → Authentication]
And here's the user appearing in Firebase instantly. You can see the UID - a unique identifier Firebase generated.

This UID is used throughout the system to link actions to identities.

[Go back to game, log in]
Now when I log in, Firebase verifies the credentials.

[After login, show username displayed in game UI]
The username appears in the game interface. This is pulled from the Firestore user profile, not the authentication system - another example of separation of concerns.

[Play a quick game, show game over screen]
When the game ends, my score is saved.

[Open leaderboard]
And here it is on the leaderboard, associated with my username and user ID.

[Optional: Show Firestore Security Rules in Firebase Console]
I've also configured Firestore security rules to ensure users can only modify their own scores. Let me show you.

[Go to Firestore → Rules]
Here's the rule: users can read all leaderboard entries but only create entries for their own authenticated user ID. This prevents cheating - someone can't submit a fake score for another player.

Virtual Identity in this system provides:
- Authentication: Verifying who you are
- Authorization: Determining what you can do  
- Accountability: Linking actions to identities
- Personalization: Tracking individual progress

The Firebase approach is scalable - it handles millions of users, provides social auth integration (Google, Facebook), and includes features like password reset and email verification that would take weeks to implement from scratch.

The trade-off is vendor lock-in to Firebase, but the rapid development and security benefits outweigh the risk for this project."
```

#### 💡 TIPS:
- Show actual user creation in Firebase - very impressive
- Mention security explicitly (password hashing, security rules)
- Talk about scalability

---

### [09:45 - 10:00] CONCLUSION & SUMMARY (15 seconds)

#### 📺 WHAT TO SHOW:
- Back to game main menu or your face (if doing picture-in-picture)
- Optionally show a quick "Thank you" slide

#### 🎤 WHAT TO SAY:
```
"To summarize: Jungle Dash demonstrates Software Design through layered architecture and separation of concerns; Event-Driven Programming through reactive state management; Interoperability through REST API integration and Firebase SDK; and Virtual Identity through Firebase Authentication with secure user management.

Thank you for watching. I hope this demonstrates both my technical implementation and my understanding of distributed service architecture principles."
```

#### 💡 TIPS:
- Speak clearly and confidently
- End on a positive, professional note
- Don't rush this - it's your last impression

---

## ⏱️ TIMING BREAKDOWN

| Section | Duration | End Time |
|---------|----------|----------|
| Introduction | 45 sec | 0:45 |
| Gameplay Demo | 60 sec | 1:45 |
| Theme 1: Design | 120 sec | 3:45 |
| Theme 2: Events | 120 sec | 5:45 |
| Theme 3: Interop | 120 sec | 7:45 |
| Theme 4: Identity | 120 sec | 9:45 |
| Conclusion | 15 sec | 10:00 |

**TOTAL: 10 minutes exactly**

---

## 🎯 HIGH GRADE CHECKLIST

To get 78+ (A+ range), make sure you:

### Content Quality:
- ✅ Show your own code running
- ✅ Submit code separately (not just in video)
- ✅ Use your own voice (no AI narration)
- ✅ Cover all 4 themes (2 min each minimum)
- ✅ Show critical discussion (alternatives and justifications)

### Technical Demonstration:
- ✅ Show project structure clearly
- ✅ Show actual code files in IDE
- ✅ Demonstrate Heart API integration with Network tab
- ✅ Show Firebase console with live data
- ✅ Demonstrate authentication flow
- ✅ Show leaderboard functionality

### Critical Discussion (This is what separates A from A+):
- ✅ Mention design patterns by name (Observer, State Machine, Hexagonal Architecture)
- ✅ Discuss alternative approaches (Redux vs Zustand, JWT vs Firebase, etc.)
- ✅ Justify your decisions (why you chose your approach)
- ✅ Mention trade-offs (complexity vs. benefits)
- ✅ Discuss security considerations
- ✅ Mention scalability

### Presentation Quality:
- ✅ Speak fluently and confidently
- ✅ Clear audio (test your microphone!)
- ✅ Navigate smoothly (rehearse!)
- ✅ Stay within 10 minutes
- ✅ Professional appearance

---

## 🚫 COMMON MISTAKES TO AVOID

### Content Mistakes:
- ❌ Spending too long on game demo (keep it under 90 seconds)
- ❌ Reading code line by line (highlight key parts only)
- ❌ Only describing what the code does (also explain WHY and what alternatives exist)
- ❌ Forgetting to show the Heart API call in action
- ❌ Not showing Firebase console

### Technical Mistakes:
- ❌ Video longer than 10 minutes (they stop watching!)
- ❌ Poor audio quality
- ❌ Screen too small/blurry (use 1920x1080)
- ❌ Not testing the demo before recording
- ❌ Leaving personal information visible

### Presentation Mistakes:
- ❌ Saying "um" and "uh" too much (rehearse!)
- ❌ Awkward silences
- ❌ Going too fast or too slow
- ❌ Not looking at what you're talking about
- ❌ Apologizing for mistakes (just keep going!)

---

## 📝 REHEARSAL TIPS

### Practice Run 1: Content Check (don't record)
- Go through the entire script
- Make sure you can say everything you want to say
- Check that all code files exist and are ready
- Ensure game works properly

### Practice Run 2: Timing Check (don't record)
- Actually time yourself
- Adjust speed if needed
- Mark sections that are too long/short
- Practice transitions between sections

### Practice Run 3: Full Recording (record but don't submit)
- Record the entire video
- Watch it back
- Note areas to improve
- Check audio and video quality

### Final Recording: The One You Submit
- You're prepared, you've practiced
- Speak confidently
- Don't worry about small mistakes
- Just keep going smoothly

---

## 🎥 RECORDING SOFTWARE RECOMMENDATIONS

### Recommended (Free):
- **OBS Studio** - Professional, free, works everywhere
- **Windows Game Bar** (Win + G) - Built-in, simple
- **Panopto** - University provides this

### Settings:
- **Resolution**: 1920x1080 minimum
- **Frame Rate**: 30 FPS minimum
- **Format**: MP4 (most compatible)
- **Audio**: Test before recording!

---

## 📤 SUBMISSION CHECKLIST

Before you submit, make sure you have:

### Files to Submit:
- ✅ Video file (or link if too large)
- ✅ Complete source code (zip the entire project)
- ✅ README.md explaining how to run the project
- ✅ package.json with all dependencies
- ✅ Any environment setup instructions

### Code Comments:
- ✅ Add comment headers to key files citing AI usage if applicable
- ✅ Reference any Stack Overflow or external code used
- ✅ Clean up any test/debug code

### Final Checks:
- ✅ Video is under 10 minutes
- ✅ Your voice is clearly audible
- ✅ Code runs without errors
- ✅ All 4 themes are covered
- ✅ Student ID is mentioned in video

---

## 🎓 BONUS: DESIGN PATTERNS TO MENTION

Mentioning these by name shows deep understanding:

1. **Separation of Concerns** - /core vs /ui vs /services vs /state
2. **Observer Pattern** - Zustand store subscriptions
3. **State Machine Pattern** - Game states (READY, PLAYING, TRIVIA, GAME_OVER)
4. **Service Layer Pattern** - heartApi.ts, auth.ts, leaderboardService.ts
5. **Repository Pattern** - Services abstract data access
6. **MVC/MVP Pattern** - Model (core), View (ui), Controller (state)
7. **Singleton Pattern** - Zustand stores are singleton instances
8. **Factory Pattern** - ObstacleManager creates different obstacle types

You don't need to mention all of these, but dropping 2-3 pattern names with brief explanations will impress the marker.

---

## 💪 YOU'VE GOT THIS!

This is a detailed script, but remember:
- **You understand your code** - you built it!
- **You've practiced** - confidence comes from rehearsal
- **You know the themes** - you've seen them in lectures
- **You have examples** - your friend's video shows the structure

**Just follow this script, speak clearly, and demonstrate your understanding. You're going to do great!**

Good luck! 🎮🚀

---

*Created for Jungle Dash Game - CIS045-3 Assignment 1*

