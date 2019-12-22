function _bomb(x,y,vx,vy){
    var t={};
    
    t.gCanvas = gl.gameCanvas;
    t.gContext = gl.gameCanvasContext;
    
    t.x = x+gl['chicken'].width/2-10;
    t.y = y;
    vx ? t.dx = vx : t.dx = 0;
    vy ? t.dy = vy : t.dy = settings.height*(((Math.random()*3) +1)/1000);
    t.destroyBool= false;
    t.index = null;
    t.bombImage = gl['bomb'];
    t.deadTime = null;
    t.timeAfterDead = 4000;
    t.bombOpacity = 1
    
    t.draw = function(){
        if(!t.destroyBool){
            if(!t.deadTime && gl.player.x+gl['spaceship'].width >= t.x && gl.player.x <= t.x+25 ){
                if((gl.player.y > t.y && gl.player.y < t.y+25) || (gl.player.y+gl['spaceship'].height > t.y && gl.player.y+gl['spaceship'].height < t.y+25)){
                    t.destroyBool = true;
                    gl.player.destroyBool = true;
                    t.explosion = new _explosion(t.x, t.y, ['#440000', '#d31200', '#feb300']);
                    t.explosion.init();
                    gl.explosionsArray.push(t.explosion);
                    
                }
            }
            // if(t.y+40 >= settings.height){
            //     t.bombImage = gl['bomb_1'];
            //     t.dy = 0;
            //     (!t.deadTime) ? t.deadTime = new Date().getTime() : null;
                
            //     if(gl.amountOfBombs == 0){
            //         gl.acceptedAmountOfBombs += 2;
            //         gl.amountOfBombs = gl.acceptedAmountOfBombs 
            //     }
            // }
            
            if(t.deadTime){
                t.time = new Date().getTime();
                if(t.time - t.deadTime > t.timeAfterDead){
                     t.destroyBool = true;
                }
            }

            t.gContext.drawImage(t.bombImage,t.x += t.dx,t.y+=t.dy);
        }
        else{
            t.bombOpacity -= 0.1;
            t.gContext.globalAlpha  = t.bombOpacity;
        }
        
        if(t.bombOpacity > 0){
            t.gContext.save();
            t.gContext.globalAlpha  = t.bombOpacity;
            t.gContext.drawImage(t.bombImage,t.x,t.y+=t.dy);
            t.gContext.restore();
            t.gContext.globalAlpha = 1;
        }
    }
    
    t.destroy = function(){
        if(gl.player.x+gl['spaceship'].width >= t.x && gl.player.x <= t.x+25 ){
            if((gl.player.y > t.y && gl.player.y < t.y+25) || gl.player.y+gl['spaceship'].height > t.y && gl.player.y+gl['spaceship'].height < t.y+25){
                gl.player.destroyBool = true;
                gl.player.destroy();    
               
            }
        }
    }
    
    t.setIndex = function(index){
        t.index = index;
    }
    
    return t;
}