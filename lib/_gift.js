function _gift(x,y){
    var t = {};
    
    t.fCanvas = gl.gameCanvas;
    t.fContext = gl.gameCanvasContext;
    
    //to do rand
    t.bulletTypeIndex = Math.round((Math.random() * 1) + 0);
    
    t.x = x+gl['chicken'].width/2-10;
    t.y = y;
    t.destroy = false;
    
    t.draw = function(){
        var color = null;
        
        if(gl.player){
            if(t.destroy == false){
                if(gl.player.x+gl['spaceship'].width >= t.x && gl.player.x <= t.x+50 ){
                    if((gl.player.y > t.y && gl.player.y < t.y+50) || (gl.player.y+gl['spaceship'].height > t.y && gl.player.y+gl['spaceship'].height < t.y+50)){
                        t.destroy = true;
                        t.addGift();
                    }
                }
                t.y++;
                color = new _bullet(false);
                switch(color.typeArr[gl.bulletType[t.bulletTypeIndex]].color){
                    case "red":
                        t.fContext.drawImage(gl['gift_b1'],t.x,t.y)
                        break;
                    case "green":
                        t.fContext.drawImage(gl['gift_b2'],t.x,t.y)
                        break;
                }
            }
        }
        
    }
    
    t.addGift = function(){
        gl.bulletLevel += 1;
        if(gl.bulletSelected != t.bulletTypeIndex){
            gl.bulletSelected = t.bulletTypeIndex
        }
        gl['audio_gift'].play();
        //console.log(gl.bulletLevel)
    }
    
    return t;
}