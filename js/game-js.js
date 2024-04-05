function Clear() {
    if(confirm("注意：重置游戏会清空所有存档和已获得成就记录，是否继续？")) {
        init();
    }
}


function chapInit() {
    sessionStorage.setItem('cnt', 1)
    document.getElementById('option').style.opacity = 0
    document.getElementById('dialog').style.opacity = 1
}
function chapInit_last() {
    sessionStorage.setItem('cnt', 1)
    document.getElementById('option').style.opacity = 0
    document.getElementById('dialog_last').style.opacity = 1
}

function dialog(t, c, cnt) {
    let dialog = document.getElementById("dialog")
    let name = document.getElementById("name")
    if (cnt % 2 == 0) {
        let text = t[cnt / 2]
        name.innerHTML = c[cnt / 2]
        dialog.innerHTML = '';
        let timer = null;
        if (text == undefined) return
        let limit = text.length
        let index = 0;
        timer = setInterval(function () {
            if (index == limit) {
                clearInterval(timer);
            } else if (dialog.innerHTML == text) {
                clearInterval(timer);
                dialog = text;
            }
            dialog.innerHTML = text.substr(0, index);
            index++;
        }, 30);
    } else {
        dialog.innerHTML = t[(cnt - 1) / 2]
        name.innerHTML = c[(cnt - 1) / 2]
    }
};
function dialog_last(t, c, cnt) {
    let dialog = document.getElementById("dialog_last")
    let name = document.getElementById("name")
    if (cnt % 2 == 0) {
        let text = t[cnt / 2]
        name.innerHTML = c[cnt / 2]
        dialog.innerHTML = '';
        let timer = null;
        if (text == undefined) return
        let limit = text.length
        let index = 0;
        timer = setInterval(function () {
            if (index == limit) {
                clearInterval(timer);
            } else if (dialog.innerHTML == text) {
                clearInterval(timer);
                dialog = text;
            }
            dialog.innerHTML = text.substr(0, index);
            index++;
        }, 30);
    } else {
        dialog.innerHTML = t[(cnt - 1) / 2]
        name.innerHTML = c[(cnt - 1) / 2]
    }
};

function jump() {
    document.getElementById('dialog').style.opacity = 0;
    document.getElementById('name').style.opacity= 0;
    document.getElementById('option').style.opacity = 1;
}
function jump_last() {
    document.getElementById('dialog_last').style.opacity = 0;
    document.getElementById('name').style.opacity= 0;
    document.getElementById('option').style.opacity = 1;
}

function save() {
    let obj = {
        [document.title]: location.pathname
    }
    let arr = JSON.parse(localStorage['archive'])
    console.log(arr)
    arr.push(JSON.stringify(obj))
    localStorage.setItem('archive', JSON.stringify(arr))
    promtshow()
}
function promtshow() {
    let prom = document.getElementById("save")
    prom.style.opacity = 1;
    prom.style.zIndex = 100000;
}
function promtdown() {
    let prom = document.getElementById("save")
    prom.style.opacity = 0;
    prom.style.zIndex = -100000;
}
function promtshowupdate() {
    let prom = document.getElementById("update")
    prom.style.opacity = 1;
    prom.style.zIndex = 100000;
}


function load() {
    let arr = JSON.parse(localStorage['archive'])
    let opt = document.getElementById('storage')
    for (let i = 1; i < arr.length; i++) {
        let obj = JSON.parse(arr[i])
        let name = Object.keys(obj)
        let p = document.createElement('p')
        opt.appendChild(p)
        let a = document.createElement('a')
        p.appendChild(a)
        a.href = obj[name]
        let text = document.createTextNode(name)
        a.appendChild(text)
    }
    if (arr.length == 1) promtshow()
}
function msplay() {
    let  music = document.getElementById("bgm");//获取ID      
    if (music.paused) { //判断是否播放  
        music.paused=false;
        music.play(); //没有就播放 
    }    
}

function achieve(pos) {
    let arr = JSON.parse(localStorage['achievement'])
    arr[pos] = 1;
    localStorage['achievement'] = JSON.stringify(arr)
}

function init() {
    let str = JSON.stringify({
        ['EXAM']: 'exam'
    })
    let arr = []
    arr.push(str)
    localStorage['memory'] = JSON.stringify([0, 0, 0, 0, 0])
    localStorage['archive'] = JSON.stringify(arr)
    localStorage['achievement'] = JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    localStorage['emo'] = '4'
    alert("您已经初始化游戏！")
}

function changeCharacter(cnt,aim,characterid,charactersrc,opa) {
    if(cnt/2==aim||(cnt-1)/2==aim){
        let cha=document.getElementById(characterid)
        cha.src=charactersrc
        cha.style.opacity=opa
    }
}

function changeBackground(cnt,aim,url) {
    if(cnt/2==aim||(cnt-1)/2==aim){
        document.getElementById('wrapper').style.background=`url(${url})`
    }
}

function g1init(flag, s) {
    if (flag == 1) {
        let arr = [
            ['6-2.html', '我也不知道。'],
            ['6-5.html', '你又是为什么来这座山？']
        ]
        localStorage.setItem('choice1', JSON.stringify(arr))
    } else {
        let arr = JSON.parse(localStorage['choice1'])
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == s) {
                arr[i][0] = '-1'
                break;
            }
        }
        localStorage.setItem('choice1', JSON.stringify(arr))
    }
}
function g2init(flag, s) {
    if (flag == 1) {
        let arr = [
            ['6-3.html', '你能理解我吗？'],
            ['6-4.html', '可以试着去做点别的。']
        ]
        localStorage.setItem('choice2', JSON.stringify(arr))
    } else {
        let arr = JSON.parse(localStorage['choice2'])
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == s) {
                arr[i][0] = '-1'
                break;
            }
        }
        localStorage.setItem('choice2', JSON.stringify(arr))
    }
}