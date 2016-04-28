var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);

function drawClock(){
	
	drawFace(ctx, radius);
	drawGraduation(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius){
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = "#aaa";
	ctx.fill();
	ctx.strokeStyle = "#fff";
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
	ctx.fillStyle = "#fff";
	ctx.fill();
	ctx.strokeStyle = "#fff";
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.03, 0, 2 * Math.PI);
	ctx.fillStyle = "#000";
	ctx.fill();
	ctx.stroke();	
}
function drawGraduation(ctx, radius){
	var num;
	var angle;
	for(num = 1; num < 13; num ++){
		angle = num * Math.PI / 6;
		ctx.rotate(-angle);
		ctx.translate(0, -radius * 0.9);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(0, 10);
		ctx.lineTo(0, 25);
		ctx.strokeStyle = "#000";
		ctx.stroke();
		ctx.translate(0, radius * 0.9);
		ctx.rotate(angle);

	}
}
function drawTime(ctx, radius){
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();

	//Hour
	hour = hour % 12;
	var hourPos = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
	drawHand(ctx, hourPos, 6, 100,"hour");
	//Minute
	var minutePos = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minutePos, 4, 120,"minute");
	//Second
	var secondPos = second * Math.PI / 30;
	drawHand(ctx, secondPos, 2, 140,"second");

}
function drawHand(ctx, pos, width, length, type){
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	if(type == "second"){
		ctx.strokeStyle = "red";
	}else{
		ctx.strokeStyle = "#000";
	}
	ctx.stroke();
	ctx.rotate(-pos);
}