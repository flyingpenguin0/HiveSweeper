# HiveSweeper
- 육각 그리드의 지뢰찾기
- [영어](/README.md)로 보기

# 데모 링크

# 설치 방법 
## 필요 : 
  1. Node.js와 npm 이 설치되어 있어야 합니다.
  2. MongoDB Atlas 계정 & 인스턴스 & URI 키
 
 
 
## 설치 과정 : 
  1. Git repository 를 터미널에서 클론합니다. `git clone https://github.com/flyingpenguin0/HiveSweeper.git`
  2. 프로젝트 폴더 내 위치에서 다음 명령을 실행합니다. `npm install`
  3. 프로젝트 폴더 내에 .env 파일을 만들고 ATLAS_URL 변수를 기록합니다.
  4. client 폴더로 이동합니다 : `cd client`
  5. 패키지 dependency를 설치합니다. : `npm install`
  
  
# About this Web Service


## 0. Premise : 
  A Web-based game similar to the classic game Minesweeper. Instead of landmines, users must avoid bees while collect honey from hive cells. 
  ![hivesweeper_01](https://user-images.githubusercontent.com/91243754/148010446-d829d579-ddb2-4cac-a842-43b253bd3e2e.gif)


## 1. Rules of the game : 
  - Every hexagonal cell has 2 ~ 6 adjacent cells.
  - There are a total number of 15, 35, 75 bees ( depending on the level ), each occupying a cell.
  - Left-clicking opens a cell and reveals its contents. 
  - Opening a cell which is occupied by a bee aborts the game ( Game over )
  - Opening a cell which is not occupied by a bee reveals its contents, which is the number of adjacent cells occupied by a bee. 
  - A cell which doesn't have any adjacent bee-occupied cells will reveal a blank content and will open every adjacent blank cells and its neighboring cells automatically.
  - Right-clicking marks an unopened cell with a flag, a question mark, and cylces back to a blank state on each consecutive click. Users cannot mark a cell which is already open.
  - Opening all the unoccupied cell completes the game.



## 2. About this web service : 
  ### - SPA (Single Page Application) web app
 
 
  ### - Records and Fetches game results
    - Create MongoDB Document based name/level data from client + timer data from express server
    - A RESTful endpoint to create/read/delete db documents
    - Axios and http-proxy-middleware used to connect to the endpoint from the front-end server
  
  
  ### - User interactions ( ex ) left/right click ) 
    - Redux store used to manage and provide states
    - Actions dispatches based on several user actions(left/right click)
 


  ### - Websocket communications used to sync client timer to the server timer
    - Socket.io used to control server timer at game start / over / finish
  
