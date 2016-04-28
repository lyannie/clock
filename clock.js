/*var date = document.getElementById("date");
var time = document.getElementById("time");

function getDateTime(){
	var datenow = new Date();
	var timenow = new Date();
	var year = datenow.getFullYear().toString();
	var month = datenow.getMonth().toString();
	var day = datenow.getDate().toString();
	var hour = timenow.getHours().toString();
	var minute = timenow.getMinutes().toString();
	var second = timenow.getSeconds().toString();

	date.innerHTML = year + "." + month + "." + day;
	time.innerHTML = hour + ":" + minute + ":" + second;

}

var showTime = setInterval(getDateTime, 1000);
*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);

function drawClock(){
	drawTime(ctx, radius);
	drawFace(ctx, radius);
	drawNum(ctx, radius);
	
}
function drawFace(ctx, radius){
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
	ctx.fillStyle = "#000";
	ctx.fill();
	ctx.stroke();
}

function drawNum(ctx, radius){
	var num;
	var angle;
	ctx.font = radius * 0.15 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for(num = 1; num < 13; num++){
		angle = num * Math.PI / 6;
		ctx.rotate(angle);
		ctx.translate(0, -radius * 0.85);
		ctx.rotate(-angle);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(angle);
		ctx.translate(0, radius * 0.85);
		ctx.rotate(-angle);
	}
}
function drawTime(ctx, radius){
	ctx.clearRect(-radius, -radius,  2 * radius, 2 * radius);
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();

	//Hour
	hour = hour % 12;
	var hourPos = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
	drawHand(ctx, hourPos, 10, 100);
	//Minute
	var minutePos = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minutePos, 5, 120);
	//Second
	var secondPos = second * Math.PI / 30;
	drawHand(ctx, secondPos, 3, 140);

}

function drawHand(ctx, pos, width, length){
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();	
	ctx.rotate(-pos);
}
