function _opponent(x,y){
    var t={};
    
    t.gCanvas = gl.gameCanvas;
    t.gContext = gl.gameCanvasContext;
    t.x = x;
    t.y = y;
    t.vx = settings.width*0.02;
    t.vy = settings.height*0.0022;
    t.width = gl['chicken'].width
    t.height = gl['chicken'].height
    t.opponentGap = 10;
    t.createDate = new Date().getTime();
    t.actualDate = null;
    t.lifePoints = 100;
    t.bombArr = [];
    t.destroyBool = false;
    t.points = 20;
    t.createBomb = false;
    t.dont = false;
    t.bombIndex = null;
    t.timeAfterGift = new Date().getTime();
    t.wingX = t.x+5
    t.wingY = t.y+15
    t.flyY = 0;
    t.flyVY = ((Math.random() * 5) + 1)/10;
    t.windRotate = 0;
    t.wingRotateVY = ((Math.random() * 10) + 1)/5;
    
    t.draw = function(){
        if(t.destroyBool == false){
            if(gl.player && !gl.player.destroyBool){
                // if(t.bombIndex){
                //     try{
                //         if(gl.bombsArray[t.bombIndex].destroyBool == true){
                //             t.createBomb = true;
                //         }
                //     }
                //     catch(e){
                //         //console.log(e)
                //     }
                // }
                // wings
                t.windRotate += t.wingRotateVY;
                if(t.windRotate >= 9 || t.windRotate <= -3){
                    t.wingRotateVY *= -1;
                }
                
                // movement
                t.flyY += t.flyVY;
                if(t.flyY >= 3 || t.flyY <= -3){
                    t.flyVY *= -1;
                }
                
                t.y += t.flyY;
                t.wingX = t.x+5
                t.wingY = t.y+15

                // t.gContext.save();
                // t.gContext.beginPath();
                // t.gContext.translate(t.wingX+gl['wing_left'].width/2+3, t.wingY+gl['wing_left'].height/2); 
                // t.gContext.rotate(t.windRotate * Math.PI / 180); 
                // t.gContext.drawImage(gl['wing_left'],-(gl['wing_left'].width/2),-(gl['wing_left'].height/2));
                // t.gContext.restore();  
                
                // t.gContext.save();
                // t.gContext.beginPath();
                // t.gContext.translate(t.wingX+gl['wing_right'].width/2+gl['chicken'].width-58, t.wingY+gl['wing_right'].height/2); 
                // t.gContext.rotate(-1*t.windRotate * Math.PI / 180); 
                // t.gContext.drawImage(gl['wing_right'],-(gl['wing_right'].width/2),-(gl['wing_right'].height/2));
                // t.gContext.restore(); 
                
                t.gContext.drawImage(gl['chicken'],t.x,t.y);
                
                t.actualDate = new Date().getTime();
                if(t.actualDate - t.createDate >= (100*10) && t.dont == false) {
                    t.createBomb = true;
                    t.dont = true;
                }
                
                // if(t.createBomb && gl.amountOfBombs > 0 && gl.player.endShowing){
                //     var rand = Math.round((Math.random()*1) +0);
                //     if(rand == 1){
                //         var bomb = new _bomb(t.x,t.y+gl['chicken'].height-10);
                //         gl.bombsArray.push(bomb);
                //         t.bombIndex = gl.bombsArray.length - 1;
                //         t.createBomb = false;
                //         gl.amountOfBombs--;
                //     }
                // }
                
                if(gl.player.x+gl['spaceship'].width >= t.x && gl.player.x <= t.x+25 ){
                    if((gl.player.y > t.y && gl.player.y < t.y+25) || gl.player.y+gl['spaceship'].height > t.y && gl.player.y+gl['spaceship'].height < t.y+25){
                        t.destroyBool = true;
                        gl.player.destroyBool = true;
                        t.explosion = new _explosion(t.x, t.y, ['#440000', '#d31200', '#feb300']);
                        t.explosion.init();
                        gl.explosionsArray.push(t.explosion);

                    }
                }

            }
        }
    }
    
    t.moveDown = function(){
        if (t.y < settings.height){
            t.y += t.vy*1.5;
            t.vy += 0.001;
            t.wingY = t.y+15
        }
        else{
            gl.level.opponents.splice(gl.level.opponents.indexOf(t),1)
        }
    }
    
    t.destroy = function(index,p){
        var time = new Date().getTime(),
            returned_index = null;
        t.lifePoints -= p;
        if(t.lifePoints <= 0){
            var explosion = new _explosion(t.x+gl['chicken'].width/2, t.y, ['#fff', '#fff', '#ccc']);
            explosion.init();
            gl.explosionsArray.push(explosion);
            
            if(Math.round((Math.random() *1) +0) == 1){
                if(time - t.timeAfterGift >= 5000 && (gl.lastGiftTime == null || time-gl.lastGiftTime >= 5000)){
                    returned_index = gl.gift.push(new _gift(t.x,t.y));
                    gl.gift[returned_index-1].draw();
                    gl.lastGiftTime = new Date().getTime();
                }
                
                
            }
            gl.level.opponents.splice(index,1);
            gl.gameKilledVal++;
        }
    }
    
    return t;
}