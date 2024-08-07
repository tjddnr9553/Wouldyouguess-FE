<div align="center">
<h2>[크래프톤 정글 5기] Wouldyouguess?</h2>
친한 친구, 동료들과 함께 즐길 수 있는 그림🖼️ & 이미지📷 기반 웹 서비스
</div>

## 목차

- [개요](#개요)
- [게임 설명](#게임-설명)
- [게임 플레이 방식](#게임-플레이-방식)
- [발표 영상](#발표-영상)
- [아키텍처](#아키텍처)
- [포스터](#포스터)

## 개요

- 프로젝트 이름 : Wouldyouguess? 🚀
- 프로젝트 지속기간 : 2024.06.27 ~ 2024.07.27 (4주)
- 개발 환경 : React, Java, Nest
- 멤버 : 김광윤, 김채윤, 박현민, 차성욱

## 게임 설명

| <img src="./public/images/readme/startPage.png" width="350px"> | <img src="./public/images/readme/gif/lobby.gif" width="350px"> |
|:--------------------------------------------------------------:|:--------------------------------------------------------------:|
|                             시작 화면                              |                             로비 화면                              |

### 1번 게임(Catch Spy)

| <img src="./public/images/readme/gif/keyword.gif" width="350px"> |    <img src="./public/images/readme/gif/order.gif" width="350px">     |
|:----------------------------------------------------------------:|:---------------------------------------------------------------------:|
|                              키워드 안내                              |                              플레이어 순서 안내                               |
|  <img src="./public/images/readme/gif/draw.gif" width="350px">   |   <img src="./public/images/readme/gif/laserPen.gif" width="350px">   |
|                              그림 그리기                              |                              레이저 펜(낙서하기)                              |
|  <img src="./public/images/readme/gif/vote.gif" width="350px">   | <img src="./public/images/readme/gif/game1_result.gif" width="350px"> |
|                             회의 및 투표                              |                                 결과 화면                                 |

### 2번 게임(Find Difference)

|    <img src="./public/images/readme/imageUpload.png" width="350px">     | <img src="./public/images/readme/gif/maskingImage.gif" width="350px"> |
|:-----------------------------------------------------------------------:|:---------------------------------------------------------------------:|
|                                 이미지 업로드                                 |                           이미지 마스킹 및 이미지 생성                            |
| <img src="./public/images/readme/gif/findDifference.gif" width="350px"> |   <img src="./public/images/readme/Game2_Result.png" width="350px">   |
|                                틀린 그림 찾기                                 |                                 결과 화면                                 |



## 게임 플레이 방식

- **Game1 (Catch Spy)**<br><br>
  **1. 키워드 확인**: 게임이 시작되면 화면 중앙에 당신에게 부여된 키워드가 나타납니다.<br>
  **2. 스파이 숨기기**: 스파이를 제외한 모든 플레이어는 동일한 키워드를 받습니다. 스파이는 다른 키워드를 받지만, 자신이 스파이인지 모릅니다. 😉<br>
  **3. 그림 그리기**: 자신의 차례가 되면 부여받은 키워드를 그림으로 표현합니다.<br>
  **4. 비밀 대화**: 그림을 그리는 플레이어를 제외한 나머지 플레이어들은 펜을 사용하여 낙서하며 비밀 대화를 나눌 수 있습니다.<br>
  **5. 스파이 찾기**: 모든 플레이어가 그림을 그린 후, 각자의 그림을 보며 회의하고 스파이로 의심되는 사람에게 투표합니다.<br>
  **6. 승리 조건**: 스파이를 찾아내면 플레이어들의 승리! 찾아내지 못하면 스파이의 승리입니다.<br>
  <br>
  **추가 정보**
    - 그림 실력보다는 키워드를 얼마나 잘 이해하고 표현하는지가 중요합니다.
    - 낙서와 대화를 통해 다른 플레이어들과 협력하여 스파이의 단서를 찾아보세요.
    - 스파이는 최대한 다른 플레이어들의 그림과 비슷하게 그려야 합니다.
      <br>
      <br>


- **Game2 (Find Difference)**<br><br>
  **1. 사진 업로드**: 게임을 시작하고 원하는 사진을 선택하여 업로드합니다. 📸<br>
  **2. 마스킹 영역 선택**: 사진의 왼쪽 위에서 오른쪽 아래 방향으로 드래그하여 변경할 영역을 선택합니다.<br>
  **3. 이미지 생성 요청**: 마스킹 영역을 확인한 후, 버튼을 눌러 이미지 생성을 요청합니다.<br>
  **4. 귀여운 오리 영상**: 이미지 생성 시간 동안 귀여운 오리 영상을 감상하세요! 🦆<br>
  **5. 이미지 확인 및 게임 시작**: 생성된 이미지가 마음에 들면 준비완료 버튼을 누릅니다. 마음에 들지 않으면 다시 생성할 수 있습니다.<br>
  **6. 차이점 찾기**: 다른 플레이어들과 함께 원본 이미지와 생성된 이미지를 비교하며 틀린 부분을 찾아내세요. (원본 이미지는 점점 희미해집니다!)<br>
  **7. 결과 확인**: 모든 라운드가 종료되면 결과 화면에서 플레이어들의 점수를 확인할 수 있습니다. 🏆<br>
  <br>
  **추가 정보**
    - 마스킹 영역을 신중하게 선택하여 난이도를 조절할 수 있습니다.
    - 틀린 부분을 빨리 찾을수록 더 높은 점수를 얻을 수 있습니다.
    - 희미해지는 원본 이미지를 잘 활용하여 차이점을 찾아보세요.
      <br>
      <br>

## 발표 영상

<a href="https://youtu.be/OTDst73LYHs?si=ecBMSHJwPYuIIKQM">유투브 링크</a>

## 아키텍처

<img src="./public/images/readme/architecture1.png"><br>
<img src="./public/images/readme/architecture2.png">

## 포스터

<img src="./public/images/readme/poster.png">