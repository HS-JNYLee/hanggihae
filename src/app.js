export default class App {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        const $main = document.createElement('main');
        $main.setAttribute('id', 'page_content');
        this.$target.appendChild($main);
    }
}