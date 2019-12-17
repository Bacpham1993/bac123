function _mouse(){
    var that = {};
    
    that.handle = function(e){
        var event = e || window.event;
        gl.body[0].style.cursor = "none"
        document.addEventListener("mousemove",function(event){
            gl.player.x = event.clientX;
            gl.player.y = event.clientY;
        },false)
    }

    return that;
}

function _keyboard(e){
    var t = {},
        e = e || window.event;
        
    t.gContext = gl.gameCanvasContext;
    t.gCanvas = gl.gameCanvas;
    t.time = 0;
      
    window.addEventListener("keydown",function(e){
        gl.key['k_'+e.keyCode] = true;
    },false);

    window.addEventListener("keyup",function(e){
        gl.key['k_'+e.keyCode] = false;
        if(gl.player){
            gl.player.isLeft = false;
            gl.player.isRight = false;
            gl.player.isShoot = false;
        }
    },false);

    // check mouse
    gl.getDom("left-btn").addEventListener("mousedown",function(){
        gl.player.leftMouseDown = true;
    }, false);

    gl.getDom("left-btn").addEventListener("mouseup",function(){
        gl.player.leftMouseDown = false;
    }, false);

    gl.getDom("right-btn").addEventListener("mousedown",function(){
        gl.player.rightMouseDown = true;
    }, false);

    gl.getDom("right-btn").addEventListener("mouseup",function(){
        gl.player.rightMouseDown = false;
    }, false);

    gl.getDom("up-btn").addEventListener("mousedown",function(){
        gl.player.upMouseDown = true;
    }, false);

    gl.getDom("up-btn").addEventListener("mouseup",function(){
        gl.player.upMouseDown = false;
    }, false);

    gl.getDom("down-btn").addEventListener("mousedown",function(){
        gl.player.downMouseDown = true;
    }, false);

    gl.getDom("down-btn").addEventListener("mouseup",function(){
        gl.player.downMouseDown = false;
    }, false);

    // check touch event
       gl.getDom("left-btn").addEventListener("touchstart",function(){
        gl.player.leftTouchStart = true;
    }, false);

    gl.getDom("left-btn").addEventListener("touchend",function(){
        gl.player.leftTouchStart = false;
    }, false);

    gl.getDom("right-btn").addEventListener("touchstart",function(){
        gl.player.rightTouchStart = true;
    }, false);

    gl.getDom("right-btn").addEventListener("touchend",function(){
        gl.player.rightTouchStart = false;
    }, false);

    gl.getDom("up-btn").addEventListener("touchstart",function(){
        gl.player.upTouchStart = true;
    }, false);

    gl.getDom("up-btn").addEventListener("touchend",function(){
        gl.player.upTouchStart = false;
    }, false);

    gl.getDom("down-btn").addEventListener("touchstart",function(){
        gl.player.downTouchStart = true;
    }, false);

    gl.getDom("down-btn").addEventListener("touchend",function(){
        gl.player.downTouchStart = false;
    }, false);

    //check shooter
    gl.getDom("shooter-btn").addEventListener("mousedown",function(){
        gl.player.shooterMouse = true;
    }, false);

    gl.getDom("shooter-btn").addEventListener("mouseup",function(){
        gl.player.shooterMouse = false;
    }, false);

    gl.getDom("shooter-btn").addEventListener("touchstart",function(){
        gl.player.shooterTouch = true;
    }, false);

    gl.getDom("shooter-btn").addEventListener("touchend",function(){
        gl.player.shooterTouch = false;
    }, false);
    
    t.handle = function(){
        if(gl.player && !gl.player.destroyBool){
            if(!gl.level.stopped){
                // handle button 

                    if(gl.player.x > 0 && (gl.player.leftMouseDown || gl.player.leftTouchStart)) {
                        if(gl.player.x-gl.player.vx >=0 ){
                            gl.player.x -= gl.player.vx;
                        }
                        else{
                            gl.player.x = 0;
                        }
                        gl.player.isLeft = true;
                    }

                    if((gl.player.rightMouseDown || gl.player.rightTouchStart) && gl.player.x < settings.width-gl['spaceship'].width) {
                        if(gl.player.x < settings.width-gl['spaceship'].width){
                            gl.player.x += gl.player.vx;
                        }
                        else{
                            gl.player.x = settings.width;
                        }
                        gl.player.isRight = true;
                    }

                    if((gl.player.upMouseDown || gl.player.upTouchStart) && gl.player.y > 0) {
                        if(gl.player.y-gl.player.vy >=0 ){
                            gl.player.y -= gl.player.vy;
                        }
                        else{
                            gl.player.y = 0;
                        }
                    }


                    if((gl.player.downMouseDown || gl.player.downTouchStart) && gl.player.y < settings.height-gl['spaceship'].height) {
                        if(gl.player.y < settings.height-gl['spaceship'].height){
                            gl.player.y += gl.player.vy;
                        }
                        else{
                            gl.player.y = settings.height;
                        }
                    }

                // gl.getDom("shooter-btn").addEventListener("mousedown",function(){
                    if(new Date().getTime() - t.time > 200 && (gl.player.shooterMouse || gl.player.shooterTouch)){
                        new _bullet();
                        new _audio().shoot();
                        t.time = new Date().getTime();
                        gl.player.isShoot = true;
                    }
                // },false);  
                // end handle button
               
                if (gl.key['k_37'] && gl.player.x > 0){
                    if(gl.player.x-gl.player.vx >=0 ){
                        gl.player.x -= gl.player.vx;
                    }
                    else{
                        gl.player.x = 0;
                    }
                    gl.player.isLeft = true;
                }
                
                if (gl.key['k_39'] && gl.player.x < settings.width-gl['spaceship'].width){
                    if(gl.player.x < settings.width-gl['spaceship'].width){
                        gl.player.x += gl.player.vx;
                    }
                    else{
                        gl.player.x = settings.width;
                    }
                    gl.player.isRight = true;
                }
                if (gl.key['k_38'] && gl.player.y > 0){
                    if(gl.player.y-gl.player.vy >=0 ){
                        gl.player.y -= gl.player.vy;
                    }
                    else{
                        gl.player.y = 0;
                    }
                }
                if (gl.key['k_40'] && gl.player.y < settings.height-gl['spaceship'].height){
                    if(gl.player.y < settings.height-gl['spaceship'].height){
                        gl.player.y += gl.player.vy;
                    }
                    else{
                        gl.player.y = settings.height;
                    }
                }

                if(gl.key['k_32']){
                    if(new Date().getTime() - t.time > 200){
                        new _bullet();
                        new _audio().shoot();
                        t.time = new Date().getTime();
                        gl.player.isShoot = true;
                    }
                }
              
            }

            if(gl.key['k_27']){
                if(new Date().getTime() - t.time > 200){
                    if(gl.getDom("statScreen").style.display == "block"){
                        gl.getDom("statScreen").style.display = "none"
                        gl.level.stopped = false;
                    }
                    else{
                        var time = new Date().getTime()-gl.gameStartVal;
                        if(time/1000 < 60){
                            gl.game_time.innerHTML = time/1000+"s";
                        }
                        else{
                            minutes = parseInt(time/1000/60);
                            secundes = parseFloat((time/1000)-(minutes*60),2)
                            gl.game_time.innerHTML = minutes+"m"+" "+secundes+"s";
                        }
                        
                        gl.game_killed.innerHTML = gl.gameKilledVal;
                        gl.game_died.innerHTML = gl.gameDiedVal;
                        gl.getDom("statScreen").style.display = "block";
                        gl.level.stopped = true;

                    }
                    t.time = new Date().getTime();
                    
                }
                
            }
        }
    }
    return t;
}
