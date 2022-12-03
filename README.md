https://judeyong.github.io/react-todolist

리액트를 사용해서 만들어 본 todolist 앱입니다.

먼저 class 형태로 만들어본 후 hooks를 이용해서 function 형태로 바뀌었습니다.

(src/app2.js 는 class형태)

css에서는 tailwindcss 라이브러리를 사용하였습니다. css 라이브러리 사용법을 경험해 보는 시간이었습니다.

drop and drag 기능을 구현하기 위해 react-beautiful-dnd를 사용해 보왔습니다. 아직 익숙하지 않기 때문에 

자주 사용해 봐야 합니다. 

react-beautiful-dnd는 리액트 18버전에서 충돌이 일어나서 수정해야 하는 부분이 있습니다. (index.js 부분 strictMode 제거.)

상위 컴포넌트에서 하위 컴포넌트로  props로 함수를 줄 때 혹은 상위 컴포넌트가 다시 렌더링 될 때 등

렌더링이 계속 일어나는 것을 방지하기 위해서 React.memo와 useCallback을 사용해 봤습니다.

서버에 연결하지 않기 때문에 db를 사용할 수 없어 localStorage도 사용해 보았습니다.
