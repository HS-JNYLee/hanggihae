import Component from "../components/Component.js";
import Nav from "../components/Nav.js";

export default class Home extends Component {
    mapOptions = {
        center: new naver.maps.LatLng(37.5825084, 127.0102929),
        zoom: 17
    };
    map;
    async convertCSVtoJSON(csvFilePath) {
        const response = await fetch(csvFilePath);
        const data = await response.text();

        const lines = data.split('\n');
        const headers = lines[0].split(',');
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentLine = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }

            result.push(obj);
        }

        return JSON.stringify(result, null, 2);
    }

    makeMarker(jsonData) {
        let mapPointer = this.map;
        console.log(jsonData);
        jsonData.forEach((value, index) => {
            let address = value['address'];

            address && naver.maps.Service.geocode({
                query: address
            }, function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('totalCount' + response.v2.meta.totalCount);
                }

                var item = response.v2.addresses[0];
                console.log(item);
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(parseFloat(item.y), parseFloat(item.x)),
                    map: mapPointer
                });
                jsonData[index]['coords'] = `${item.y},${item.x}`;
                /*naver.maps.Event.addListener(marker, 'click', function (e) {
                    console.log(e);
                    console.log(`${e.coord.y},${e.coord.x}`);
                    const info = jsonData.filter((value, index) => {
                        console.log(value['coords'], `${e.coord.y},${e.coord.x}`);
                        return value['coords'] == `${e.coord.y},${e.coord.x}`
                    })
                    console.log(info);
                    rerender(info);
                });*/
            });
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    template(jsonData) {
        let name = "이름";
        let address = "주소";
        let time = "시간";
        let review = "리뷰";
        let phone = "전화번호";
        let site = "사이트주소";

        if (jsonData) {
            const randomData = jsonData[this.getRandomInt(0, jsonData.length - 1)];
            name = randomData["name"];
            address = randomData["address"];
            time = randomData["mondayTime"];
            review = randomData["review"];
            phone = randomData["phone"];
            site = randomData["site"];
        }

        return '<div id="main-banner">\n' +
            '        <img id="main-banner-img" src="../assets/images/imagine_turtle.png" alt="한성부기">\n' +
            '        <span id="main-banner-text">안녕하세요, 저희는 한끼해 프로젝트입니다.</span>\n' +
            '    </div>\n' +
            '    <div id="map-wrapper">\n' +
            '        <div id="map-iframe">\n' +
            '        </div>\n' +
            '        <div id="review-wrapper">\n' +
            '            <div id="review-question">\n' +
            '                <img id="location-mark" src="../assets/images/marker.png">\n' +
            '                <span id="question-text">학교 근처에 맛집은 어디?</span>\n' +
            '            </div>\n' +
            '            <div id="review">\n' +
            '                <div id="review-top">\n' +
            '                    <div id="restaurant-title">\n' +
            '                        <span id="restaurant-name">' + name + '</span>\n' +
            '                        <div id="review-img">\n' +
            '                            <img id="review-img-1" src="../assets/images/review1.png">\n' +
            '                            <div id="review-img-side">\n' +
            '                                <img id="review-img-2" src="../assets/images/review2.png">\n' +
            '                                <img id="review-img-3" src="../assets/images/review3.png">\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div id="restaurant-text">\n' +
            '                        <span class="restaurant-text-inline" id="restaurant-address">' + address + '</span>\n' +
            '                        <span class="restaurant-text-inline" id="restaurant-open">' + time + '</span>\n' +
            '                        <span class="restaurant-text-inline" id="restaurant-guide">' + review + '</span>\n' +
            '                        <span class="restaurant-text-inline" id="detail">상세보기</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div id="review-bottom">\n' +
            '                    <div id="star-score">\n' +
            '                        <img class="star" id="star-1" src="../assets/images/inactive_star.png">\n' +
            '                        <img class="star" id="star-2" src="../assets/images/inactive_star.png">\n' +
            '                        <img class="star" id="star-3" src="../assets/images/active_star.png">\n' +
            '                        <img class="star" id="star-4" src="../assets/images/active_star.png">\n' +
            '                        <img class="star" id="star-5" src="../assets/images/active_star.png">\n' +
            '                    </div>\n' +
            '                    <div id="phone-number">' + phone + '</div>\n' +
            '                    <div id="site-address">' + site + '</div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
    }

    async render() {
        this.$target = document.getElementById('app');
        var target = this.$target;
        // CSV 파일 경로 지정 후 변환 함수 호출
        const csvFilePath = '../assets/db.csv'; // 여기에 실제 CSV 파일 경로를 입력하세요
        let jsonData2;

        await this.convertCSVtoJSON(csvFilePath)
            .then(jsonData => {
                    jsonData2 = JSON.parse(jsonData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        this.mapOptions = {
            center: new naver.maps.LatLng(37.5825084, 127.0102929),
            zoom: 17
        };
        target.innerHTML =  new Nav(target) + this.template(jsonData2);
        this.map = new naver.maps.Map('map-iframe', this.mapOptions);
        jsonData2 && this.makeMarker(jsonData2);
    }
}

new Home().render();