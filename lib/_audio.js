function _audio(){
    var t = {};
    
    t.shoot = function(){
        for(var i=0; i<10;i++){
            if(gl['audio_shoot_'+i].paused){
                gl['audio_shoot_'+i].play();
                break;
            }
            
        }
    }
    
    t.explode = function(){
        for(var i=0; i<10;i++){
            if(gl['audio_explode_'+i].paused){
                gl['audio_explode_'+i].play();
                break;
            }
            
        }
    }
    
    t.chicken = function(){
        for(var i=0; i<10;i++){
            if(gl['audio_chicken_'+i].paused){
                setTimeout(function(){
                    gl['audio_chicken_'+i].play();
                },((Math.random()*5) + 1) *1000)
                
                break;
            }
            
        }
    }
    
    return t;
}