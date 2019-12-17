function _loader(){
    var t = {};
    
    t.path = "images/";
    t.audio_path = "audio/";
    t.images = [
        'background.png',
        'bomb.png',
        'chicken.png',
        'spaceship.png',
        'gift_b2.png',
        'gift_b1.png',
        'bomb_1.png',
        'wing_left.png',
        'wing_right.png',
        'eat_1.png',
        'boss.png',
        'boss_wing_left.png',
        'boss_wing_right.png',
    ];
    t.audio = [
        'eat.wav',
        ['explode.wav',10],
        'gift.wav',
        ['shoot.wav',10],
        ['chicken.wav', 10]
        //'falling_bomb.wav'
    ];
    t.loaded = 0;
    t.maxLength = t.images.length + t.audio.length+9+9+9;
    t.progressWidth = parseInt(window.getComputedStyle(gl.getDom("loader")).getPropertyValue("width"));
    t.progressUnit = t.progressWidth/t.maxLength;
    
    t.load = function(){
        for(var i=0, name=null; i<t.images.length; i++){
            name = t.images[i].split(".")[0];
            gl[name] = new Image();
            gl[name].addEventListener("load",function(){
                t.countFiles();
            },false)
            gl[name].src = t.path+t.images[i];
        }
        
        for(var i=0, name=null; i<t.audio.length; i++){
            if(Array.isArray(t.audio[i])){
                for(var j=0, max = t.audio[i][1]; j<max; j++){
                    name = 'audio_'+t.audio[i][0].split(".")[0];
                    gl[name+"_"+j] = new Audio(t.audio_path+t.audio[i][0]);
                    gl[name+"_"+j].addEventListener("canplaythrough",function(){
                        t.countFiles();
                    },false)
                }
            }
            else{
                name = 'audio_'+t.audio[i].split(".")[0];
                gl[name] = new Audio(t.audio_path+t.audio[i]);
                gl[name].addEventListener("canplaythrough",function(){
                    t.countFiles();
                },false)
            }
        }
    }
    
    t.countFiles = function(){
        t.loaded++;
        gl.getDom("progress").style.width = t.progressUnit*t.loaded+"px";
        
        if(t.loaded == (t.maxLength)){
            t.game = new _game();
            
            gl.getDom("progress").addEventListener("transitionend", function(){
                gl.getDom("loader").style.display = "none";
                gl.getDom("startMenu").style.opacity = "1";
            }, false);
            t.game.init();
        }
    }

    return t;
}