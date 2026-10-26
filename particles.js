

(function () {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas) return; 

    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var LINK_DISTANCE = 120;  
    var PIXELS_PER_DOT = 16000; 
    var width, height;
    var dots = [];
    var color = '140, 140, 150';


    var mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };

    function readColor() {
        var value = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim();
        if (value) color = value;
    }

    function resize() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2); // sharp on retina screens
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var count = Math.round((width * height) / PIXELS_PER_DOT);
        dots = [];
        for (var i = 0; i < count; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3
            });
        }
        dots.push(mouse);
        if (reduceMotion) draw();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < dots.length; i++) {
            var a = dots[i];

            if (!reduceMotion) {
                a.x += a.vx;
                a.y += a.vy;
                if (a.x < -20 || a.x > width + 20) a.vx = -a.vx;
                if (a.y < -20 || a.y > height + 20) a.vy = -a.vy;
            }

            ctx.fillStyle = 'rgba(' + color + ', 0.75)';
            ctx.beginPath();
            ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
            ctx.fill();

            for (var j = i + 1; j < dots.length; j++) {
                var b = dots[j];
                var dx = a.x - b.x;
                var dy = a.y - b.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DISTANCE) {
                    ctx.strokeStyle = 'rgba(' + color + ', ' + ((1 - dist / LINK_DISTANCE) * 0.9) + ')';
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        draw();
        requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', function () {
        mouse.x = mouse.y = -9999;
    });

    // Wait until the user stops resizing before rebuilding the dots
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });

    window.addEventListener('themechange', function () {
        readColor();
        if (reduceMotion) draw();
    });

    readColor();
    resize();
    if (!reduceMotion) loop();
})();
