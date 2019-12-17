var elements = ["startScreen","gameScreen","settingsScreen","optionsMenu","backgroundCanvas","foregroundCanvas","gameCanvas"],
    settings = new _settings();

for(var i=0, currentElm = null; i<elements.length; i++){
    if(elements[i].indexOf("Canvas") !== -1){
        currentElm = gl.getCanvas(elements[i]);
        currentElm.width = settings.width;
        currentElm.height = settings.height;
    }
    else{
        currentElm = gl.getDom(elements[i]);
        currentElm.style.width = settings.width+"px";
        currentElm.style.height = settings.height+"px";
    }
}

//game handling
// gl.handling = new _mouse();
gl.handling = new _keyboard();
gl.handlingON = true;

//startscreen
gl.getDom("startGame","startGameBtn").addEventListener("click",function(){
    gl.show(gl.gameScreen,this.parentNode);
    gl.start = true;
},false)
gl.getDom("options","optionsBtn").addEventListener("click",function(){
    gl.show(gl.settingsScreen,this.parentNode);
    gl.optionsMenu.style.opacity = "1";
    gl.settingsScreen.style.zIndex = "50"
},false);
gl.getDom("go_back").addEventListener("click",function(){
    gl.startMenu.style.display = "block"
    gl.settingsScreen.style.zIndex = "-1"
    gl.optionsMenu.style.opacity = "0";
},false);
gl.getDom("exit","exitBtn").addEventListener("click",function(){
    window.close();
},false);

gl.getDom("body","","tag");
gl.getDom("points");
gl.getDom("lifes_p");
gl.getDom("version").innerHTML = "LDQ";
gl.getDom("restart");
gl.getDom("reload").addEventListener("click",function(){
    gl.start = true;
},false)
gl.getDom("game_time");
gl.getDom("game_killed");
gl.getDom("game_died");



//settings
gl.getDom("animated_background").addEventListener("click",function(){
    var val = gl.getDom("animated_background").value;

    val == 1 ? (gl.getDom("animated_background").value=0):(gl.getDom("animated_background").value=1)
    gl.animatedBackground =  gl.getDom("animated_background").value;
},false);
