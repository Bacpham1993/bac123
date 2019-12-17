///move background!


function _stars(){
    var t = {};
    t.fCanvas = gl.foregroundCanvas;
    t.fContext = gl.foregroundCanvasContext;

    t.create = function() {
        t.x = Math.floor((Math.random() * settings.width) + 0);
        t.y = Math.floor((Math.random() * settings.height) + 0);
        t.r = (Math.random() * 5) + 1;
        t.rFinal = null
        t.s = (Math.random() * 20) + 1;
        t.date = new Date();
        t.startTime = t.date.getTime();
        t.currentTime = t.date.getTime();
        t.timeToLive = parseInt((Math.random() * 200 ) +100);
        t.endOfLive = false;
        t.sV = 0.25;
        t.dir = "plus";
        t.dx = 0.1;
        t.dy = t.dx;
        t.freeArea = 100;
        t.xOrY = Math.round((Math.random()*2) +0)
    }

    t.draw = function() {
        t.fContext.globalAlpha = 0.7;
        t.fContext.fillStyle = "#fff";
        t.fContext.beginPath();
        t.fContext.arc(t.x,t.y,t.r,0,2*Math.PI,true);
        t.fContext.shadowColor = "#fff";
        t.fContext.shadowBlur = t.s;
        t.fContext.closePath();
        t.fContext.fill();
    }
    
    t.move = function() {
        if(t.currentTime - t.startTime >= t.timeToLive && !t.endOfLive){
            t.r > 0.02 ? t.r-=0.01 : t.r=0
            if(t.r == 0){
                t.endOfLive = true
                t.x = Math.floor((Math.random() * settings.width) + 0);
                t.y = Math.floor((Math.random() * settings.height) + 0);
                t.rFinal = (Math.random() * 5) + 1;
            }
        }
        else{
            t.currentTime++;
        }
        
        if(t.endOfLive){
            if(t.r < t.rFinal){
                t.r+=0.01;
            }
            if(parseInt(t.r) == parseInt(t.rFinal)){
                t.rFinal = null
                t.date = new Date();
                t.startTime = t.date.getTime();
                t.currentTime = t.date.getTime();
                t.timeToLive = parseInt((Math.random() * 1000 ) +500);
                t.endOfLive = false;
                t.xOrY = Math.round((Math.random()*2) +0)
            }
        }
        

        switch(t.xOrY){
            case 2:
                t.x = t.x+t.dx;
                t.y = t.y+t.dy;
                break;
            case 1:
                t.x = t.x+t.dx;
                break;
            case 0:
                t.y = t.y+t.dy;
                break;
        }

        if(t.s >19){
            t.dir = "minus"
        }
        else if(t.s <1){
            t.dir = "plus"
        }

        switch(t.dir){
            case "minus":
                t.s-=t.sV;
                break;
            case "plus":
                t.s+=t.sV;
                break;
        }
        if(t.x > settings.width+t.freeArea || t.x < 0-t.freeArea){
            t.dx*=-1
        }

        if(t.y > settings.height+t.freeArea || t.y < 0-t.freeArea){
            t.dy*=-1
        }
        
    }
    
    return t;
}

function _explosion(x, y, colors){
    var t = {};
    
    t.gContext = gl.gameCanvasContext;
    t.gCanvas = gl.gameCanvas;
    
    t.x = x;
    t.y = y+gl['spaceship'].height/2;
    t.particlesNumber = 60;
    t.particlesArray = [];

    t.init = function(){
        for(var i=0; i<t.particlesNumber; i++){
            t.particlesArray.push(new _explosionParticle(t.x,t.y, colors))
        }
        
        for(var i=0, angle=0; angle<360; angle+= 360/t.particlesNumber, i++){
            t.particlesArray[i].angle = angle;
            t.particlesArray[i].vx = Math.cos(angle * Math.PI/180);
            t.particlesArray[i].vy = Math.sin(angle * Math.PI/180);
        }
        new _audio().explode();
    }

    t.draw = function(){
        for(var i=0; i<t.particlesArray.length; i++){
            t.particlesArray[i].draw();
        }
    }
    
    return t;
}

function _explosionParticle(x,y,colors){
    var t = {};
    
    t.gContext = gl.gameCanvasContext;
    t.gCanvas = gl.gameCanvas;
    t.angle = null;
    t.x = x;
    t.y = y;
    t.vx = settings.width*0.02;
    t.vy = settings.height*0.022;
    t.colors = colors;
    t.color = t.colors[Math.round((Math.random() * 3) + 0)]
    t.radius = Math.round((Math.random() * 35) + 10);
    t.timeToLive = Math.round((Math.random() * 30) + 10) * 1000;
    t.createdTime = new Date().getTime();
    t.thisIsTheEnd = false
    t.scaleSpeed = Math.round((Math.random() * 10) + 1) /30;
 
    t.draw = function(){
        t.x += t.vx;
        t.y += t.vy;
        
        if(t.radius >= 0){
            t.radius -= t.radius*t.scaleSpeed;
        }
        else{
            t.radius = 0;
        }
        
        if(new Date().getTime() - t.createdTime > t.timeToLive){
            t.thisIsTheEnd  = true;
        }
        
        if(!t.thisIsTheEnd){
            t.gContext.beginPath();
            t.gContext.arc(t.x, t.y, t.radius, 0, 2 * Math.PI, false);
            t.gContext.fillStyle = t.color;
            t.gContext.fill();
        }
    }
    
    return t;
}