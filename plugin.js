/**
 * Author - Shan Dhiviyarajan, CMS Pvt Ltd.
 * prashasoft@gmail.com
 */

    (function () {
        'use strict';
        //  console.log("Sombal.js a lazyloader plugin");
        var sombal = function () {
            var imgs = document.getElementsByClassName("sombal");
            var i = imgs.length;
            if (!i) {
                window.removeEventListener("scroll", sombal);
            }
            while (i--) {

                var innerHeight = window.innerHeight;
                var offset = 5;
                var url = "";
                var thisImg = "";
                var progressBar = "";
                var yPosition = imgs[i].getBoundingClientRect().top - innerHeight;
                var xmlHTTP = new XMLHttpRequest();
                if (yPosition <= offset) {
                    thisImg = imgs[i];
                    //show progress bar
                    if (thisImg.getAttribute("data-progress") == "true") {
                        url = thisImg.getAttribute("data-src");

                        progressBar = document.createElement("div");
                        thisImg.parentNode.appendChild(progressBar);

                        xmlHTTP.open('GET', url, true);
                        xmlHTTP.responseType = 'arraybuffer';
                        xmlHTTP.onload = function (e) {
                            var blob = new Blob([this.response]);
                            thisImg.src = window.URL.createObjectURL(blob);
                            setTimeout(function () {
                                thisImg.parentNode.removeChild(progressBar);
                            }, 300);
                        };
                        xmlHTTP.onprogress = function (e) {
                            thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
                            progressBar.style.width = thisImg.completedPercentage + "%";
                            console.log(thisImg.completedPercentage);
                        };
                        xmlHTTP.onloadstart = function () {
                            thisImg.completedPercentage = 0;
                        };
                        xmlHTTP.send();
                    }

                    //without progress bar
                    imgs[i].src = imgs[i].getAttribute("data-src");
                    imgs[i].addEventListener('load', function () {
                        var self = this;
                        setTimeout(function () {
                            self.classList.remove("sombal");
                        }, 300);
                    });


                }
            }
        };
        sombal();
        window.addEventListener("scroll", sombal);
    }());