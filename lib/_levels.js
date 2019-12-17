//interface
function _levels(){
    var t = {};
    
    t.space = null;
    t.opponents = [];
    t.currentLevel = null;
    t.stopped = false;
    t.gContext = gl.gameCanvasContext;
    t.gCanvas = gl.gameCanvas;
    
    t.level1 = {
        init: function(){
            var oW = gl['chicken'].width,
                o = new _opponent(),
                oG = o.opponentGap;
            t.opponents = [];
            for(var i=0,oH=0,space=null; i<4; i++){
                t.space = null;
                
                
                for(var j=0, max=7; j<max; j++){
                    if(j==0){
                        space = (max*oW+max*oG);
                        space = settings.width - space;
                        space = space/2;
                        t.space = space;
                    }
                    
                    t.opponents.push(new _opponent(t.space,oH));
                    t.space += (oW+oG);
                    
                }
                oH += gl['chicken'].height+10;
            }
            t.currentLevel = "1";
            gl.level.stopped = false;
        }
    };
    
    t.level2 = {
        showed: false,
        init: function(){
            var oW = gl['chicken'].width,
                o = new _opponent(),
                oG = o.opponentGap,
                placesNumber = 20,
                maxInOnePlace = 5,
                minInOnePlace = 0,
                posX = null;
            t.opponents = [];
            for(var i=0, inOnePlace = null, posY = 0; i<placesNumber; i++){
                inOnePlace = Math.round((Math.random() * Math.round(maxInOnePlace)) + Math.round(minInOnePlace));
                maxInOnePlace += 0.1
                minInOnePlace += 0.1
                posX = t.level2.generateX(posX)
                posY = t.level2.generateY(posY)

                for(var j=0; j<inOnePlace; j++){
                    t.opponents.push(new _opponent(posX,posY*(-1)));
                    posX += oG+oW;
                }
                posX = null;
            }
            t.currentLevel = "2";
            gl.level.stopped = false;
        },
        generateY: function(lastY){
            return Math.round((Math.random() * 100) + lastY+gl['chicken'].height*2);
        },
        generateX: function(posX){
            return Math.round((Math.random() * settings.width/2) + 0);
        }
    }
    
    t.level3 = {
        init: function(){
            var oW = gl['boss'].width,
                o = new _boss(),
                oG = o.opponentGap;
            
            t.opponents = [];
            t.opponents.push(new _boss(settings.width/2-gl['boss'].width/2 , settings.height/2 - gl['boss'].height));
            t.currentLevel = "3";
            gl.level.stopped = false;
        }
    }
    
    t.render = function(){
        if(t.opponents.length > 0){
            switch(gl.level.currentLevel){
                case "1":
                    for(var i=0;i<t.opponents.length;i++){
                        t.opponents[i].draw();
                    }
                    break;
                    
                case "2":
                    for(var i=0;i<t.opponents.length;i++){
                        t.opponents[i].moveDown();
                        t.opponents[i].draw();
                        if(!t.level2.showed && t.opponents[i].y >= 0){
                            t.level2.showed = true;
                        }
                    }
                    if(!t.level2.showed){
                        t.gContext.font = "20px Arial";
                        t.gContext.fillStyle = "#fff"
                        t.gContext.fillText("Bạn có 20 giây để tiêu diệt các mạch máu xấu",settings.width/2-150,settings.height/2-20);
                    }
                    
                    break;
                    
                case "3":
                    t.opponents[0].draw();
                    
                    break;
            }
        }
        else{
            gl.level.stopped = true;
            switch(gl.level.currentLevel){
                case "1":
                    gl.level.level2.init();
                    break;
                case "2":
                    gl.level.level3.init();
                    break;
                case "3":
                    gl.level.stopped = false;
                    gl.handlingON = false;
                    t.gContext.font = "20px Arial";
                    t.gContext.fillStyle = "#fff"
                    t.gContext.fillText("Hoàn thành",settings.width/2-40,settings.height/2-20);
            }
        }
        
    }
    
    return t;
}
