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
  
  // HTML과의 통합
  document.addEventListener('DOMContentLoaded', () => {
    const $target = document.querySelector('.app'); // 내비게이션 바를 렌더링할 요소 선택자로 변경
    const nav = new Nav($target);
  });
  