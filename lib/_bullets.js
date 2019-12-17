function _bullet(not_create){
    var t = {};
    if(not_create != false){
        not_create = true;
    }
    
    t.gCanvas = gl.gameCanvas;
    t.gContext = gl.gameCanvasContext;
    
    t.typeArr = [];
    
    t.typeArr['b1'] = new _bulletUnit();
    t.typeArr['b1'].color = "red";
    
    t.typeArr['b2'] = new _bulletUnit();
    t.typeArr['b2'].color = "green";
        
    t.type = t.typeArr[gl.bulletType[gl.bulletSelected]];    
    t.destroy = false;
    
    t.x = gl.player.x+gl['spaceship'].width/2;
    t.y = gl.player.y;
    
    t.draw = function(){
        t.y-=1*t.type.speed;
        t.gContext.fillStyle = t.type.color
        t.gContext.fillRect(t.x,t.y,t.type.width,t.type.height);

        for(var i=0,op=null; i<gl.level.opponents.length;i++){
            op = gl.level.opponents[i];
            if(t.x > op.x && t.x < op.x+op.width){
                if(t.y < op.y+op.height && t.y > op.y){
                    op.destroy(i,t.type.power);
                    t.destroy = true;
                    gl.points.innerHTML = parseInt(gl.points.innerHTML)+op.points;
                    if(parseInt(gl.points.innerHTML) >= 1000){
                        gl.playerLifes++;
                        gl.lifes_p.innerHTML = gl.playerLifes;
                        gl.points.innerHTML = parseInt(gl.points.innerHTML-1000);
                    }
                }
                else if(t.y <= 0){
                    t.destroy = true;
                }
            }
        }
    }

    if(not_create == true){
        gl.bulletsArray.push(t);
    }

    return t;
}

function _bulletUnit(){
    var t = {};
    t.basePower = 25; 
    t.baseSpeed = 10;
    t.baseWidth = 3; 
    t.baseHeight = 8; 
    gl.bulletLevel >= 2 ? (t.basePower *= gl.bulletLevel/2): null
    t.power = t.basePower
    t.speed = t.basePower + (gl.bulletLevel * 0.15),
    t.width = t.baseWidth + gl.bulletLevel,
    t.height = t.baseHeight + gl.bulletLevel;
    
    return t;
}
