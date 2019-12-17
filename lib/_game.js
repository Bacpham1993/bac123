function _game(){
    var t = {};

    t.fCanvas = gl.foregroundCanvas;
    t.fContext = gl.foregroundCanvasContext;
    t.bContext = gl.backgroundCanvasContext;
    t.bCanvas = gl.backgroundCanvas;
    t.gContext = gl.gameCanvasContext;
    t.gCanvas = gl.gameCanvas;
    t.stars = [];
    
    t.init = function(){
        window.requestAnimationFrame(t.gameLoop);
        t.createBackground();
        gl.gameStartVal = new Date().getTime();
    }
    
    t.gameLoop = function(e){
        window.requestAnimationFrame(t.gameLoop);
        if(gl.start){
            gl.restart.style.display = "none"
            gl.points.innerHTML = "0"
            if(!gl.player){
                //to do
                gl.playerLifes = 3;
                gl.player = new _player();
                gl.player.showUp();
                gl.level = new _levels();
                gl.level.level2.init();
            }
            gl.start = false;
        }

        if(gl.player){
            if(!gl.level.stopped){
                t.gContext.clearRect(0,0,t.gCanvas.width,t.gCanvas.height)
                for(var bi=0; bi<gl.bombsArray.length; bi++){
                    gl.bombsArray[bi].draw();
                }

                for(var gi=0; gi<gl.gift.length; gi++){
                    gl.gift[gi].draw();
                }

                for(var ge=0; ge<gl.explosionsArray.length; ge++){
                    gl.explosionsArray[ge].draw();
                }

                gl.player.draw();
                !gl.level.stopped ? gl.level.render() : null;
                   
            }
            if(gl.handlingON){
                gl.handling.handle(); 
            }
        }

        if(gl.animatedBackground == 1){
             t.bgY -= 1*2;
                if(Math.abs(t.bgY) == gl.background.height){
                    t.bgY = 0;
                }
            
            // t.animateBackground();
            //optimize!
            /// Them background
            t.bContext.drawImage(gl['background'], 0, t.bgY)
        }
    }
    
    t.createBackground = function(){
        t.bgY = 0;
        
        for(var i=0; i<100; i++){
            t.stars[i] = new _stars();
            t.stars[i].create();
            
        }
    }
    
    t.animateBackground = function(){  
        t.fContext.clearRect(0,0,t.fCanvas.width,t.fCanvas.height);
            
        for(var i=0; i<t.stars.length; i++){
            if(!gl.handlingON){
                t.stars[i].dy = 10;
            }
            t.stars[i].move();
            t.stars[i].draw();
        }
        
        // t.fContext.globalAlpha = 1;
        // t.fContext.fillStyle = "#fff";
        // t.fContext.beginPath();
        // t.fContext.arc(settings.width/2,settings.height/2,90,0,2*Math.PI,true);
        // t.fContext.shadowColor = "#fff";
        // t.fContext.shadowBlur = 100;
        // t.fContext.closePath();
        // t.fContext.fill();
    }

    return t;
}