let state = 0;

function change() {
    if(state == 0){
        state = 1;
        document.getElementById('StartStop').src="../../assets/images/start.png";
    }
    else {
        state = 0;
        document.getElementById('StartStop').src = "../../assets/images/stop.png";
    }
}