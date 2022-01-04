# HiveSweeper
- A Minesweeper with a Hexagonal Grid
- view in [Korean](/Readme_kr.md)

# Working demo link 

 개발 미완성
 
# Installation prerequisites 
You will need : 
  1. Node.js and npm installed on your machine
  2. A MongoDB Atlas account & instance  w/ your URI key
 
 Installation steps : 
  1. Clone Git repository  `git clone https://github.com/flyingpenguin0/HiveSweeper.git`
  2. In the root of the project directory, run the command  `npm install`
  3. Create a .env file at the root of the project directory, type in your ATLAS_URI and myDNSHost variables
  
  
# About this Web Service
0. Premise : 
  ![hivesweeper_01](https://user-images.githubusercontent.com/91243754/148010446-d829d579-ddb2-4cac-a842-43b253bd3e2e.gif)

1. Intro page : 

2. Choose the levels you wish to play : 

3. Rules of the game : 
 - Every hexagonal cell has 2 ~ 6 adjacent cells.
 - There are a total number of 15, 35, 75 bees ( depending on the level ), each occupying a cell.
 - Left-clicking opens a cell and reveals its contents. 
 - Opening a cell which is occupied by a bee aborts the game ( Game over )
 - Opening a cell which is not occupied by a bee reveals its contents, which is the number of adjacent cells occupied by a bee. 
 - A cell which doesn't have any adjacent bee-occupied cells will reveal a blank content and will open every adjacent blank cells and its neighboring cells automatically.
 - Right-clicking marks an unopened cell with a flag, a question mark, and cylces back to a blank state on each consecutive click. Users cannot mark a cell which is already open.
 - Opening all the unoccupied cell completes the game.

4. Check how high you scored on the leaderboard : 

# New functions to be added
