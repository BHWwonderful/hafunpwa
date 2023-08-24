# HAFUN 프로젝트

[HAFUN 배포 링크](https://hafun-4d476.web.app/)

해당 프로젝트는 다음과 같은 목적으로 진행되고 있습니다


1. 영국 생활에 적응해야 하는 영어 초보자들을 위한 강의 플랫폼 제공
2. 친구(추후에 관리자 페이지 완성 후 권한 제공)의 강의 스타일을 이식할 수 있는 인터넷 공간 제공
3. React 실력 향상, 같은 기능에 다양한 상태 관리 라이브러리, 비동기 상태 처리 라이브러리 테스트를 통해 차이점을 이해 
4. 파이어베이스를 이용한 백엔드 기능 맛보기

## 사용한 기술
React, Redux, Firebase, CSS module

## 주요 기능

### 레벨 테스트


재밌고 동적인 레벨 테스트 기능을 만들고자 듀오링고의 문제 풀기 기능을 참조했습니다.

![Animation](https://github.com/BHWwonderful/hafunpwa/assets/131639108/ff1da38e-e558-4d9d-aca8-eebe9d7a7c02)

:+1: 레벨 테스트 세부 기능
1. 사용자가 선택지를 누르기 전에는 제출 버튼이 비활성화됩니다.
2. 사용자가 현재 풀고 있는 문제의 레벨에 따라 진행바의 색상이 바뀝니다.
3. 사용자는 문제를 풀며 각 정답을 맞출 시 Redux가 가진 사용자 정보에서 총 점수가 문제에 할당한 만큼 더해지며 각 레벨 별 beginner/intermediate/fluent/advanced 문제를 다 풀었을 경우, 내부에 부여한 점수 컷을 넘기지 못 한다면 결과 컴포넌트가 출력됩니다.

### 영어 강의 기능


유저가 강의 컨텐츠를 영국 발음으로 들을 수 있게 버튼을 클릭 시 음성이 출력되도록 설정했습니다.
아직은 Alphabet 컨텐츠만 열람 가능합니다

![topic](https://github.com/BHWwonderful/hafunpwa/assets/131639108/eff375c6-2382-4e77-9cd8-59d47105c1c4)

:+1: 영어 강의 세부 기능
사용자가 Topic 페이지 내에서 어느 위치에서든 새로운 Topic을 찾을 수 있도록 검색 기능을 추가했습니다.

![topicSearch](https://github.com/BHWwonderful/hafunpwa/assets/131639108/dce54c04-1be0-4254-8539-a7242258564f)


### 영어와 연관된 유투브 동영상 컨텐츠 제공(추후 제작 예정)


Youtube data API를 활용하여 영어 발음, 영국 문화에 관한 컨텐츠를 넣을 예정입니다.

### 회원가입, 로그인 기능

회원가입 기능으로는 사용자가 물음표를 클릭했을 때 해당 정보가 왜 웹 사이트에서 필요한지, 어디에 사용할 것인지 알려줍니다.

또한 사용자가 제출한 데이터가 설정한 정규식 기준에 맞지 않을 경우 빨간색 느낌표를 통해 해당 데이터를 다시 입력할 것을 알려줍니다. 이 때 물음표를 클릭하면 조건식에 대한 정보를 볼 수 있습니다.

![Sign up](https://github.com/BHWwonderful/hafunpwa/assets/131639108/caf5f2c2-b607-4b27-948e-f379b43fd04f)

로그인 과정의 경우 기존 회원가입 때 사용한 이메일, 비밀번호를 사용하며 로그인이 성공 시 프로필 페이지로 이동합니다.

![Log in](https://github.com/BHWwonderful/hafunpwa/assets/131639108/516e3f65-770e-478e-9478-a4c0813f3ecd)

:+1: 로그인 세부 기능
구글 소셜 로그인 기능을 통해 구글 계정으로 로그인을 진행할 수 있습니다.

![Google Login](https://github.com/BHWwonderful/hafunpwa/assets/131639108/5c4a1503-0b6e-44d2-ba83-d80d24b167c5)

### 프로필 기능

소셜 로그인을 사용했을 경우 구글에서 제공해주는 아이디의 프로필 사진, 계정 이름을 그대로 받아옵니다. 또한 Edit 기능을 통해 프로필 이미지, 유저 이름을 변경할 수 있습니다.

![Profile](https://github.com/BHWwonderful/hafunpwa/assets/131639108/fe2b0782-e301-4b75-ae35-b1d52b722fee)

일반 로그인을 사용했을 경우 기본 이미지가 프로필에 적용됩니다. 또한 로그인할 때 사용했던 이름을 해당 웹 사이트에서 유저 이름으로 사용할 수 있습니다.

![Alexxandra Login](https://github.com/BHWwonderful/hafunpwa/assets/131639108/0c46c147-0003-406c-a8c3-a63ab3d3e18e)

:+1: 프로필 세부 기능

Log out 버튼을 클릭하면 웹 사이트에서 로그아웃 할 수 있으며 가입할 떄 사용했던 이메일, 비밀번호를 재입력하여 계정을 삭제할 수 있습니다.

![Deleting Account](https://github.com/BHWwonderful/hafunpwa/assets/131639108/a885b68e-5f2f-4d1f-8c9d-c48281a0c241)

### Q&A 커뮤니티 기능


질문을 하고 싶은 유저가 질문을 작성하고 답변자가 댓글을 작성하여 답변할 수 있습니다.







