import Component from "./Component.js";

class Menubar {
    href;
    content;
    constructor(href, content) {
        this.href = href;
        this.content = content;
    }
}

export default class Nav extends Component {

    setup () {
        this.state = [
            new Menubar("", '<img id= \"home-img\" src=\"src/assets/images/hansung_logo.png\" alt=\"메인로고\"></a>'),
            new Menubar("info", "소개"),
            new Menubar("rank", "랭킹"),
            new Menubar("kind", "종류"),
            new Menubar("", "미정"),
            new Menubar("", "미정"),
        ] ;
    }
    template () {
        return `
          <nav class="top-nav">
            ${(this.state).map(item => `
                <div class="top-nav-layout">
                    <a class="nav-link" href="/${item.href}">${item.content}</a>
                </div>`
            ).join('')}
           </nav>`
    }
}
