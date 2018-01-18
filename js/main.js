(function() { appInit(); }());

var results = {
    name: '',
    result: '',
    prize: ''
}
var div_moving = document.getElementById('stick');
var parent_div = 'gameContainer';

function appInit() {

    var winLoseOpt = document.getElementsByClassName('wlLabel');
    for (var i = 0; i < winLoseOpt.length; i++) {
        winLoseOpt[i].addEventListener('click', getWinLose);
    }

    document.getElementById("gameSetup").addEventListener('submit',  gameSetup)
}

var resultSelect = '';
function getWinLose() {
    var winLoseVal = document.getElementsByName('result');

    for (var i = 0; i < winLoseVal.length; i++) {
     if (winLoseVal[i].checked) {
        var prizeHolder = document.getElementById('prizeHolder');
        if (winLoseVal[i].value == 'win') {
            prizeHolder.classList.add('active');
        } else {
            prizeHolder.classList.remove('active');
            setTimeout(function() {
                var dropDown = document.getElementById("prize");
                dropDown.selectedIndex = 0;
            }, 350);
        }
        resultSelect = winLoseVal[i].value;
        break;
     }
    }
}

function gameSetup() {
    results.name = document.getElementById('name').value;
    results.result = resultSelect
    results.prize = document.getElementById('prize').value;
    
    gameInit();
}

function gameInit() {
    console.log('Game Init');
    console.table(results);

    document.getElementById('gameArea').classList.add('gameon');

    document.getElementById(parent_div).addEventListener('mousemove', function(e){
        mouseXY = movingDiv.getCoords(e);
        div_moving.style.left = mouseXY.xp + 20 +'px';
        div_moving.style.top = mouseXY.yp - 200 +'px';
    });
}

var movingDiv = {
    mouseXY: {},
    getXYpos: function(elm) {
            x = elm.offsetLeft;
            y = elm.offsetTop;
            elm = elm.offsetParent;

            while(elm != null) {
                x = parseInt(x) + parseInt(elm.offsetLeft);
                y = parseInt(y) + parseInt(elm.offsetTop);
                elm = elm.offsetParent;
            }
            return {'xp':x, 'yp':y};
    },
    getCoords: function(e) {
        var xy_pos = this.getXYpos(e.target);

        x = e.pageX;
        y = e.pageY;

        x = x - xy_pos['xp'];
        y = y - xy_pos['yp'];

        return {'xp':x, 'yp':y};
    }
};
