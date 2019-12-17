function _player(){
    var t = {};
    
    t.gCanvas = gl.gameCanvas;
    t.gContext = gl.gameCanvasContext;
    t.x = settings.width/2-gl['spaceship'].width/2;
    t.y = settings.height - 150;
    t.vx = settings.width*0.01;
    t.vy = settings.height*0.022;
    t.playerWidth = 0;
    t.playerHeight = 0;
    t.destroyBool = false;
    t.afterDeath = false;
    t.isRight = false;
    t.isLeft = false;
    t.isShoot = false;
    t.playerAlpha = 1;
    t.showingUp = false;
    t.endShowing = false
    t.timeShow = null;
    t.timeAfterShow = 4000;
    t.gameAlpha = 
    
    gl.lifes_p.innerHTML = gl.playerLifes;
    
    t.draw = function(e){
        if(t.showingUp){
            if(t.y > settings.height - 150){
                t.y -= t.vy;
            }
            else{
                t.showingUp = false;
                t.timeShow = new Date().getTime();
            }
            
            t.gContext.drawImage(gl['spaceship'],t.x,t.y);
            return;
        }
        
        if(t.destroyBool == false){
            if(new Date().getTime() - t.timeShow >= t.timeAfterShow){
                t.endShowing = true;
            }
            
            for(var i=0;i<gl.bulletsArray.length; i++){
                var bullet = gl.bulletsArray[i];
                if(!bullet.destroy){
                    bullet.draw();
                }
            }
            
            if(!gl.handlingON){
                t.goAway();
            }
            
            if(t.isLeft){
                t.gContext.save();
                t.gContext.beginPath();
                t.gContext.translate(t.x+gl['spaceship'].width/2, t.y+gl['spaceship'].height/2); 
                t.gContext.rotate(-10 * Math.PI / 180); 
                t.gContext.drawImage(gl['spaceship'],-(gl['spaceship'].width/2),-(gl['spaceship'].height/2));
                t.gContext.restore();  
            }
            else if(t.isRight){
                t.gContext.save();
                t.gContext.beginPath();
                t.gContext.translate(t.x+gl['spaceship'].width/2, t.y+gl['spaceship'].height/2); 
                t.gContext.rotate(10 * Math.PI / 180); 
                t.gContext.drawImage(gl['spaceship'],-(gl['spaceship'].width/2),-(gl['spaceship'].height/2));
                t.gContext.restore();  
            }
            else if(t.isShoot){
                t.y += 5;
                t.gContext.drawImage(gl['spaceship'],t.x,t.y)
                t.y -= 5;
            }
            else{
                t.gContext.drawImage(gl['spaceship'],t.x,t.y)
            }
            
        }
        else{
            if(t.afterDeath == false){
                if(t.playerAlpha <= 0){
                    t.destroy();
                }
                else{
                    t.playerAlpha -= 0.1
                    t.gContext.save();
                    t.gContext.globalAlpha = t.playerAlpha;
                    t.gContext.drawImage(gl['spaceship'],t.x,t.y)
                    t.gContext.restore();  
                }
            }
        }
    }
    
    t.goAway = function(){
        gl.player.y -= 15
    }
    
    t.destroy = function(){
        gl.bombsArray = [];
        gl.acceptedAmountOfBombs = 2;
        gl.amountOfBombs = 2;
        gl.bulletsArray = [];
        gl.gift = [];
        gl.player = null;
        gl.gameDiedVal++;
        
        if(gl.playerLifes > 1){
            gl.player = new _player();
            gl.player.showUp();
            gl.level["level"+gl.level.currentLevel].init();
            gl.playerLifes--;
            gl.lifes_p.innerHTML = gl.playerLifes;

            if(gl.bulletLevel >= 4){
                gl.bulletLevel -= 3
            }
            else{
                gl.bulletLevel = 1;
            }
        }
        else{
            gl.player = null;
            gl.restart.style.display = "block";
            t.afterDeath = true;
        }
    }
    
    t.showUp = function(){
        t.showingUp = true;
        t.y = settings.height+300;
    }

    return t;
}