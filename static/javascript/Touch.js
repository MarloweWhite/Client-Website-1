

    var canvas,canvasTwo;

    var mouseX,mouseY,mouseDown=0;

    var touchX,touchY;

    var lastX,lastY=-1;

    function drawLine(canvasTwo,x,y,size) {

        if (lastX==-1) {
            lastX=x;
	    lastY=y;
        }

        r=0; g=0; b=0; a=255;

        canvasTwo.strokeStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

        canvasTwo.lineCap = "round";

        canvasTwo.beginPath();

	canvasTwo.moveTo(lastX,lastY);


	canvasTwo.lineTo(x,y);


        canvasTwo.lineWidth = size;
        canvasTwo.stroke();

        canvasTwo.closePath();


	lastX=x;
	lastY=y;
    }

function clearCanvas(canvas,canvasTwo) {
        canvasTwo.clearRect(0, 0, canvas.width, canvas.height);
    }


    function signaturePad_mouseDown() {
        mouseDown=1;
        drawLine(canvasTwo,mouseX,mouseY,6);
    }


    function signaturePad_mouseUp() {
        mouseDown=0;


        lastX=-1;
        lastY=-1;
    }


    function signaturePad_mouseMove(e) {

        getMousePos(e);


        if (mouseDown==1) {
            drawLine(canvasTwo,mouseX,mouseY,6);
        }
    }


    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }


    function signaturePad_touchStart() {

        getTouchPos();

        drawLine(canvasTwo,touchX,touchY,6);

        event.preventDefault();
    }

    function signaturePad_touchEnd() {

        lastX=-1;
        lastY=-1;
    }


    function signaturePad_touchMove(e) {

        getTouchPos(e);

        drawLine(canvasTwo,touchX,touchY,6);

        event.preventDefault();
    }

    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) {
                var touch = e.touches[0];
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }



    function init() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('signaturePad');


        if (canvas.getContext)
            canvasTwo = canvas.getContext('2d');


        if (canvasTwo) {

            canvas.addEventListener('mousedown', signaturePad_mouseDown, false);
            canvas.addEventListener('mousemove', signaturePad_mouseMove, false);
            window.addEventListener('mouseup', signaturePad_mouseUp, false);


            canvas.addEventListener('touchstart', signaturePad_touchStart, false);
            canvas.addEventListener('touchend', signaturePad_touchEnd, false);
            canvas.addEventListener('touchmove', signaturePad_touchMove, false);
        }
    }
