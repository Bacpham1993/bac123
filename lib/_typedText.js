// var TxtType = function(el, toRotate, period) {
//     this.toRotate = toRotate;
//     this.el = el;
//     this.loopNum = 0;
//     this.period = parseInt(period, 10) || 2000;
//     this.txt = '';
//     this.tick();
//     this.isDeleting = false;
// };

// TxtType.prototype.tick = function() {
//     var i = this.loopNum % this.toRotate.length;
//     var fullTxt = this.toRotate[i];

//     if (this.isDeleting) {
//     this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//     this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

//     var that = this;
//     var delta = 100 - Math.random() * 100;

//     if (this.isDeleting) { delta /= 2; }

//     if (!this.isDeleting && this.txt === fullTxt) {
//     delta = this.period;
//     this.isDeleting = true;
//     } else if (this.isDeleting && this.txt === '') {
//     this.isDeleting = false;
//     this.loopNum++;
//     delta = 500;
//     }
//     // console.log(i, this.loopNum)
//     if (this.loopNum < 1 || this.txt !== fullTxt) {
//         setTimeout(function() {
//         that.tick();
//         }, delta);
//     } else {
//     //    var intro = document.getElementById('introduce');
//     //    intro.style.opacity = 0;
//     //    gl.show(gl.gameScreen,this.parentNode);
//     //    gl.start = true;
//     }
// };

// window.onload = function() {
//     // var elements = document.getElementsByClassName('typewrite');
//     // for (var i=0; i<elements.length; i++) {
//     //     var toRotate = elements[i].getAttribute('data-type');
//     //     var period = elements[i].getAttribute('data-period');
//     //     // console.log(toRotate, JSON.parse(toRotate));
//     //     if (toRotate) {
//     //       new TxtType(elements[i], JSON.parse(toRotate), period);
//     //     }
//     // }
//     var data = [
//         "Chú ý! Chúng tôi vừa xác định được một Vết loét chân do tiểu đường",
//         "Chúng ta đang thu nhỏ để tiến dần vào vết thương."
//     ];
//     new TxtType(document.getElementsByClassName('typewrite')[0], data, 1000);
//     // INJECT CSS
//     var css = document.createElement("style");
//     css.type = "text/css";
//     css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
//     document.body.appendChild(css);
// };