# HiveSweeper
- 육각 그리드의 지뢰찾기
- [영어](/README.md)로 보기

# 데모 링크
https://www.hivesweeper.site:8000/intro

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
  
  
# 웹 서비스 설명


## 0. 개요 : 
  유저들은 지뢰 대신 벌이 들어있는 칸을 피해서 꿀이 들어있는 셀을 모두 클릭하여 우승할 수 있는 지뢰찾기 변형 게임.
  ![hivesweeper_01](https://user-images.githubusercontent.com/91243754/148010446-d829d579-ddb2-4cac-a842-43b253bd3e2e.gif)


## 1. 게임의 규칙 : 
  - 각 셀들은 위치에 따라 2~6개의 셀들과 이웃합니다.
  - 레벨에 따라 15, 35, 75개의 벌이 들어있는 칸들이 존재합니다.
  - 좌클릭은 셀을 오픈하고 내용물을 공개합니다.  
  - 벌이 들어있는 셀이 오픈되면 게임이 중단됩니다. ( Game over )
  - 벌이 들어있지 않은 셀이 오픈되면 그 셀의 2~6개의 이웃 중 벌이 들어있는 셀의 숫자가 공개됩니다.
  - 이웃 중 벌이 있는 셀이 없는 경우 빈 칸이 공개되며 빈 칸을 오픈하면 이웃하는 모든 빈 칸과 그의 이웃들이 함께 오픈됩니다. 
  - 우클릭은 오픈 전인 셀을 클릭 수에 따라 깃발과 물음표로 표시하고, 추가 클릭으로 다시 빈 칸으로 되돌릴 수 있습니다. 이미 열려있는 셀은 표시할수 없습니다.
  - 벌이 없는 모든 셀을 오픈하면 게임이 종료됩니다. (Game Win)



## 2. About this web service : 
  ### - SPA (Single Page Application) web app
 
 
  ### - Records and Fetches game results
    - 서버의 타이머 데이터와 클라이언트의 이름/레벨 데이터로 MongoDB Document 생성.
    - DB Document의 create/read/delete 가능한 RESTful endpoint.
    - Axios와 Socket통신으로 API 앤ㄷ포인트와 프론트엔드 서버 연결.
  
  
  ### - 유저와 상호작용 ( ex ) 좌/우클릭 ) 
    - Redux로 스토어 생성, 상태 관리 
    - 유저의 행동에 기반한 액션 디스패치
 

  ### - 웹 소켓으로 서버와 클라이언트 타이머 연동
    - 게임 시작 / 중단 / 종료 시 서버 타이머를 조절하기 위해 Socket.io 사용
  
