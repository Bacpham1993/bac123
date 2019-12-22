function _loader(){
    var t = {};
    t.fContext = gl.foregroundCanvasContext;
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
        'ulcer.png'
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
        for(var i=0; i<t.images.length; i++){
            var name = t.images[i].split(".")[0];
            gl[name] = new Image();
            gl[name].addEventListener("load",function(){
            },false)
            t.countFiles();
            gl[name].src = t.path+t.images[i];
        }
        
        for(var i=0; i<t.audio.length; i++){
            if(Array.isArray(t.audio[i])){
                for(var j=0, max = t.audio[i][1]; j<max; j++){
                   var name = 'audio_'+t.audio[i][0].split(".")[0];
                    gl[name+"_"+j] = new Audio(t.audio_path+t.audio[i][0]);
                    gl[name+"_"+j].addEventListener("canplaythrough",function(){
                    },false)
                    t.countFiles();
                }
            }
            
            else{
               var name = 'audio_'+t.audio[i].split(".")[0];
               console.log(name);
                gl[name] = new Audio(t.audio_path+t.audio[i]);
                gl[name].addEventListener("canplaythrough",function(){
                },false)
                t.countFiles();
            }
        }
    }
    
    t.countFiles = function(){
        t.loaded++;
        gl.getDom("progress").style.width = t.progressUnit*t.loaded+"px";
        gl.getDom("progress").innerText =t.loaded;
        // gl.getDom("welcome").style.opacity= "1";
        if(t.loaded === (t.maxLength)){
            t.game = new _game();
            
            gl.getDom("progress").addEventListener("transitionend", function(){
                gl.getDom("loader").style.display = "none";
                gl.getDom("welcome").style.opacity= "1";
                    setTimeout(() => {
                    gl.getDom("welcome").style.opacity= "0";
                    gl.getDom("introduce").style.opacity= "1";
                    var data = [
                        "Chú ý! Chúng tôi vừa xác định được một Vết loét chân do tiểu đường",
                        "Chúng ta đang thu nhỏ để tiến dần vào vết thương."
                    ];
                    gl.TxtType(document.getElementsByClassName('typewrite')[0], data, 1000);     
                }, 1000);
            }, false);
            t.game.init();
        }
    }

    return t;
}