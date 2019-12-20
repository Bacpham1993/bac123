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
    TxtType: function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    },
    tick: function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
    
        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
        var that = this;
        var delta = 50 - Math.random() * 100;
    
        if (this.isDeleting) { delta /= 2; }
    
        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }
        if (this.loopNum < 1 || this.txt !== fullTxt) {
            setTimeout(function() {
            that.tick();
            }, delta);
        } else {
           this.getDom("introduce").style.opacity = 0;
           this.getDom("startMenu").style.opacity = 1;
        }
    }

}

