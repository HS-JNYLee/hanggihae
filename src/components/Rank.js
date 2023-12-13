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
    
      for (let i = 0; i < 10; i++) {
        const $newRectangle = document.createElement("div");
        $newRectangle.innerHTML = `
          <div class="small-rectangle left-small-rectangle"> <div class="circle">${
            i + 1
          }
            </div>
            <div class="text-inside-small-rectangle">오사이 초밥</div>
            <!-- 사진1 -->
            <img src="../assets/images/사진1.png" alt="사진1" class="image-1">
          </div>
          <div class="small-rectangle right-small-rectangle">
            <!-- 사진2 -->
            <img src="../assets/images/사진2.png" alt="사진2" class="image-2">
            <!-- 사각형6 -->
            <div class="rectangle-6">
              <p>서울 동승로 4길 12</p>
              <p><span style="color: red;"></span>한끼해(~ 11:00)</p>
              <p>네이버 평점 4.8점(만 점: 5점), 오늘 먹은 초밥은 정말 맛있었다. 다음에 또 와서 먹을 것이다.</p>
              <div class="detail-text">상세보기</div>
              <div class="contact-info">02-111-1111</div>
              <div class="website-info">www.nitip.com</div>
              <div>
                <img src="../assets/images/사진3.png" alt="사진3" class="image-3">
                <img src="../assets/images/사진4.png" alt="사진4" class="image-4">
                <div class="rectangle-7">남자친구랑 연극보고 너무 재밌었다.</div>
              </div>
            </div>
          </div>
        `;
        $newRectangle.classList.add("rectangle");
        $whiteSquare.appendChild($newRectangle);
      }
    });
    