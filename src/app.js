import Nav from "./components/Nav.js";

export default class App {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        new Nav(this.$target).render();
        const $main = document.createElement('main');
        $main.setAttribute('id', 'page_content');
        this.$target.appendChild($main);
    }
}