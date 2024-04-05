function Initlly(){
    if(localStorage.getItem("usernumber")==null)localStorage.setItem("usernumber",0);
    if(sessionStorage.getItem("loginstate"==null))sessionStorage.setItem("loginstate",0);
}//进入首页时初始化状态

function backlogin(){window.location.replace("login.html");}  //注册完后跳转到登录界面
function backindex(){window.location.replace("../../index.html");}  //登录完后跳转到首页
function intogame(){window.location.replace("html/第0章（序章）/0_video.html");}  //点击开始游戏，进入剧情
function tosave(){window.location.replace("html/save.html");}  //主页跳转到存档
function toachievement(){window.location.replace("html/achievement.html");}  //主页跳转到成就界面
function toindex2(){window.location.replace("../index.html")}  //成就界面回到主页
//去往各项功能界面

function register(){  //此函数为注册功能
    var num=localStorage.getItem("usernumber");
    var inputname=document.getElementById("name").value;
    var inputpassword=document.getElementById("password").value;
    if(inputname=="")
    {
        alert("用户名不能为空");
        return;
    }
    if(inputname.length>12)
    {
        alert("您的用户名过长，请重新输入");
        $("#name").val("");
        return;
    }

    if(inputpassword=="")
    {
        alert("密码不能为空");
        return;
    }

    for(var i=0;i<num;i++)
    {
        var prename=localStorage.getItem("username"+i);
        if(inputname==prename){
            alert("此用户名已被注册，请重新输入");
            $("#name").val("");
            return;
        }
    }
    if(inputpassword.length<6)
    {
        alert("密码长度应至少六位，请重新输入");
        $("#password").val("");
        $("#confirmpassword").val("");
        return;
    }

    localStorage.setItem("username"+localStorage.usernumber,inputname);
    localStorage.setItem("userpassword"+localStorage.usernumber,inputpassword);
    localStorage.setItem("userachievement"+localStorage.usernumber,JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0]));
    localStorage.usernumber++;
    alert("注册成功!即将去往登录页面");
    setTimeout("backlogin()",2000);
}

var NowName=""; //定义一个全局变量，记录当前的用户名

function login(){  //此函数为登录功能
    if(sessionStorage.loginstate==1)
    {alert("您已经登录了");return;}
    var theNowName=document.getElementById("username").value; //局部变量，在登录时获得用户的用户名
    NowName = theNowName  //重新赋值，改变该全局变量
    var inputpassword=document.getElementById("password").value;
    if(NowName=="")
    {
        alert("请输入您的用户名");
        return;
    }
    if(inputpassword=="")
    {
        alert("请输入您的密码");
        return;
    }
    var num=localStorage.getItem("usernumber");
    for(var i=0;i<num;i++)
    {
        var prename=localStorage.getItem("username"+i);
        var prepassword=localStorage.getItem("userpassword"+i);
        if(NowName==prename){
            if(inputpassword==prepassword)
            {
                alert("登录成功！即将返回首页");
                sessionStorage.loginstate=1;
                sessionStorage.setItem("account",NowName);
                setTimeout("backindex()",2000);
            }
            else
            {
                alert("密码错误，请重新输入");
                $("#password").val("");
            }
            return;
        }
    }
    alert("该用户还未注册，请检查您的用户名");
    $("#password").val("");
    $("#username").val("");
}

function IsLogin_1() {//此函数用于跳转到剧情
    if (sessionStorage.loginstate!=1){
        alert("您还未登录，请先登录");
        return;
    }
    else{
        setTimeout("intogame()",100);
    }
}

function IsLogin_2() {//此函数用于跳转到存档
    if (sessionStorage.loginstate!=1){
        alert("您还未登录，请先登录");
        return;
    }
    else{
        setTimeout("tosave()",100);
    }
}

function IsLogin_3() {//此函数用于跳转到成就
    if (sessionStorage.loginstate!=1){
        alert("您还未登录，请先登录");
        return;
    }
    else{
    setTimeout("toachievement()",100);
    }
}

function Hide(){//该函数默认所有成就不显示
        for(var i=1;i<=8;i++){
        document.getElementById("achimage"+i).style.display="inline"; //显示未知图
        document.getElementById("achimageover"+i).style.display="none";	//不显示翻转图
        document.getElementById("lock"+i).style.display="inline"; //显示问号
        document.getElementById("know"+i).style.display="none";	//不显示成就名字
        }
}

function ShowAchievement(){//该函数显示用户得到的成就
    alert(NowName);
    var inputname=document.getElementById("username").value;
    var num=localStorage.getItem("usernumber");
    for(var i=0;i<num;i++){
        var prename=localStorage.getItem("username"+i);
        if(inputname==prename){ //找到该用户
    var arr=JSON.parse(localStorage.getItem("userachievement"+i));  //arr为储存该用户成就的数组
	for (var i = 1; i <= 8; i++){
        if(arr[i-1]==1){//等于1，显示
            document.getElementById("achimage"+i).style.display="none";
            document.getElementById("achimageover"+i).style.display="inline";
            document.getElementById("lock"+i).style.display="none";
            document.getElementById("know"+i).style.display="inline";}
		    }
        }
    }
}

function GetAchievement(j){//该函数获得成就
        var inputname=document.getElementById("username").value;
        var num=localStorage.getItem("usernumber");
    for(var i=0;i<num;i++){
        var prename=localStorage.getItem("username"+i);
        if(inputname==prename){  //找到该用户
        var arr=JSON.parse(localStorage.getItem("userachievement"+i));
        arr[j]=1;
        localStorage.setItem("userachievement"+i,JSON.stringify(arr));}//更新存档数据
        }
alert("提交成功！");}

{
    window.alert=alert;
        function alert(data) {
            var a = document.createElement("div"),
                p = document.createElement("p"),
                btn = document.createElement("div"),
                textNode = document.createTextNode("提示:\n"+(data ? data : "")),
                btnText = document.createTextNode("确定");
            // 控制样式
            css(a, {
                "position" : "absolute",
                "left" : "0",
                "right" : "0",
                "top" : "20%",
                "width" : "300px",
                "height" : "200px",
                "margin" : "auto",
                "padding":"25px",
                "background-color" : "rgba(231, 231, 231, 0.874)",
                "border-style": "solid",
                "border-width": "5px",
                "border-color": "rgb(132, 112, 255)",
                "border-radius": "30px",
                "color":"black",
                "font" : "30px 华文新魏",
                "text-align" : "center",
            });
            css(btn, {
                "position":"absolute",
                "bottom":"10px",
                "width" : "100px",
                "height" : "50px",
                "left":"35%",
                "margin":"10px",
                "background" : "rgba(77, 75, 75, 0.5)",
                "border-radius": "20px",
                "color":"black",
                "font" : "40px 楷体",
            });

            // 内部结构套入
            p.appendChild(textNode);
            btn.appendChild(btnText);
            a.appendChild(p);
            a.appendChild(btn);
            // 整体显示到页面内
            document.getElementsByTagName("body")[0].appendChild(a);
            //btn.setAttribute("id","alert_btn");
            btn.onmouseenter=function(){
                css(btn,{
                            "background" : "rgba(132, 112, 255,0.5)",
                            "transition-duration":"0.3s",
                            "cursor":"pointer"
                });
            }
            btn.onmouseleave=function(){
                css(btn,{"background" : "rgba(77, 75, 75, 0.5)"});
            }
            // 确定绑定点击事件删除标签
            btn.onclick = function() {
                a.parentNode.removeChild(a);
            }
        }
        function css(targetObj, cssObj) {
            var str = targetObj.getAttribute("style") ? targetObj.getAttribute("style") : "";
            for(var i in cssObj) {
                str += i + ":" + cssObj[i] + ";";
            }
            targetObj.style.cssText = str;
        }
}