// Component.js
class Component {
  $target;
  state;

  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }

  setup() {}
  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

// Nav.js
class Menubar {
  href;
  content;

  constructor(href, content) {
    this.href = href;
    this.content = content;
  }
}

class Nav extends Component {
  setup() {
    this.state = [
      new Menubar("", '<img id="home-img" src="../assets/images/hansung_logo.png" alt="메인로고"></a>'),
      new Menubar("info", "소개"),
      new Menubar("rank", "랭킹"),
      new Menubar("kind", "종류"),
      new Menubar("", "미정"),
      new Menubar("", "미정"),
    ];
  }

  template() {
    return `
      <nav class="top-nav">
        ${this.state
          .map(
            (item) => `
            <div class="top-nav-layout">
              <a class="nav-link" href="/${item.href}">${item.content}</a>
            </div>
          `
          )
          .join('')}
      </nav>`;
  }
}


document.addEventListener('DOMContentLoaded', () => {
const $target = document.querySelector('.app'); // 내비게이션 바를 렌더링할 요소 선택자로 변경
const nav = new Nav($target);

// $whiteSquare 정의
const $whiteSquare = document.querySelector('.white-square');

// 새로운 사각형 추가 코드
for (let i = 0; i < 11; i++) {
  const $newRectangle = document.createElement('div');
  $newRectangle.classList.add('rectangle-7', 'rectangle-6', 'text', 'rectangle', 'small-rectangle', 'left-small-rectangle', 'circle', 'image-1', 'text-inside-small-rectangle', 'image-2', 'right-small-rectangle'); // 필요한 클래스 추가
  $newRectangle.style.top = '400px'; // 사각형의 top 위치 조정
  $whiteSquare.appendChild($newRectangle);
}
});