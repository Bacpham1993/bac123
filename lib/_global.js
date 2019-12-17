var gl = {
    animatedBackground: 1,
    
    key: {
        k37: false,
        k38: false,
        k39: false,
        k40: false,
        k32: false,
        k27: false,
    },
    keyDone: true,
    
    gameStartVal: 0,
    gameKilledVal: 0,
    gameDiedVal:0,
    
    bulletsArray: [],
    bulletType: ['b1','b2'],
    bulletSelected: 0,
    bulletLevel: 1,
    
    gift: [],
    lastGiftTime:  null,
    
    bombsArray: [],
    acceptedAmountOfBombs: 2,
    amountOfBombs: 2,
    
    explosionsArray: [],
    
    getCanvas: function(name,displayedName,spec){
        gl.getDom(name,displayedName,spec);
        if(displayedName){
            gl[displayedName+"Context"] = gl[displayedName].getContext("2d");
            return gl[displayedName];
        }
        else{
            gl[name+"Context"] = gl[name].getContext("2d");
            return gl[name];
        }
    },
    
    getDom: function(name,displayedName,spec){
        if(name !== ""){
            switch(spec){
                case "class":
                    if(displayedName && displayedName !== ""){
                        return gl[displayedName] = document.getElementsByClassName(name);
                    }
                    else{
                        return gl[name] = document.getElementsByClassName(name);
                    }
                    
                    break;
                case "tag":
                    if(displayedName && displayedName !== ""){
                        return gl[displayedName] = document.getElementsByTagName(name);
                    }
                    else{
                        return gl[name] = document.getElementsByTagName(name);
                    }
                    
                    break;
                    
                default:
                    if(displayedName && displayedName !== ""){
                        return gl[displayedName] = document.getElementById(name);
                    }
                    else{
                        return gl[name] = document.getElementById(name);
                    }
                    
                    break;
            }
        }
    },
    
    show: function(elm,hide){
        hide.style.display = "none"
        elm.style.display = "block";
    },
    
    randomFloat: function(min, max){
        return min + Math.random()*(max-min);
    },
}

