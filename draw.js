function drawOutput(ctx, dataset, neuralNet, min_x=-5, max_x=5, min_y=-5, max_y=5, fineness=1) {
	ctx.clearRect(0, 0, 500, 500)
	drawDataset(ctx, dataset)
	
	
	var scale_x=canvasWidth/(max_x-min_x)
	var scale_y=canvasHeight/(max_y-min_y)
	
	var increment
	var opacity
	if(fineness==1) {
		increment=0.1
		opacity=0.3
		limit=0.0 //0.05
		size=5
	}
	else if(fineness==2) {
		increment=0.02
		opacity=0.2
		limit=0.0 //0.01
		size=1
	}
	for(var x=min_x; x<=max_x; x+=increment) {
		for(var y=min_y; y<=max_y; y+=increment) {
			var output=neuralNet.forward([x,y])
			if(output>0.5-limit && output<0.5+limit)
				ctx.fillStyle = "rgba(0,0,0, 0.8)";
			else
				ctx.fillStyle = "rgba("+(1-output)*255+","+output*255+",0, "+String(opacity)+")";
			ctx.fillRect((x-min_x)*scale_x,(y-min_y)*scale_y, size, size)
		}
	}
}

const colors = {0: "green", 1: "orange"}
function convertOneHotToNumber(onehot) {
	if (typeof onehot === 'number') //if input already is a number, do nothing 
		return onehot;
	return onehot.findIndex(function(value) {return value>0})
}
function drawDataset(ctx, dataset, min_x=-5, max_x=5, min_y=-5, max_y=5, size=5) {
	var scale_x=canvasWidth/(max_x-min_x)
	var scale_y=canvasHeight/(max_y-min_y)
	
	for(var i=0; i<dataset.length; i++) {
		[x,y]=dataset[i]
		ctx.fillStyle = colors[convertOneHotToNumber(y)]
		ctx.fillRect((x[0]-min_x)*scale_x,(x[1]-min_y)*scale_y,size,size)
	}
}
function drawPoints(ctx, points_x, points_y, color="gray", min_x=-5, max_x=5, min_y=-5, max_y=5, size=5) {
	ctx.fillStyle = color
	
	scale_x=canvasWidth/(max_x-min_x)
	scale_y=canvasHeight/(max_y-min_y)
	for(var i=0; i<points_x.length; i++) {
		ctx.fillRect((points_x[i]-min_x)*scale_x,(points_y[i]-min_y)*scale_y,size,size)
	}
}
function drawZippedPoints(ctx, points_xy, color="gray", min_x=-5, max_x=5, min_y=-5, max_y=5, size=5) {
	ctx.fillStyle = color
	
	scale_x=canvasWidth/(max_x-min_x)
	scale_y=canvasHeight/(max_y-min_y)
	for(var i=0; i<points_xy.length; i++) {
		[x,y]=points_xy[i]
		ctx.fillRect((x-min_x)*scale_x,(y-min_y)*scale_y,size,size)
	}
}