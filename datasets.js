
function get2BlopDataset() {
	black_x=[]
	black_y=[]
	for(var i=0; i<100; i++) {
		black_x.push(randn_bm()+2.5)
		black_y.push(randn_bm()+2.5)
	}

	white_x=[]
	white_y=[]
	for(var i=0; i<100; i++) {
		white_x.push(randn_bm()-2.5)
		white_y.push(randn_bm()-2.5)
	}

	dataset=[]
	for(var i=0; i<black_x.length; i++) {
		data_x=[black_x[i], black_y[i]]
		data_y=0
		dataset.push([data_x, data_y])
	}
	for(var i=0; i<white_x.length; i++) {
		data_x=[white_x[i], white_y[i]]
		data_y=1
		dataset.push([data_x, data_y])
	}
	
	return dataset
}

function get4BlopDataset(scale=0.7) {
	black_x=[]
	black_y=[]
	for(var i=0; i<100; i++) {
		black_x.push(randn_bm()*scale+2.5)
		black_y.push(randn_bm()*scale+2.5)
	}
	for(var i=0; i<100; i++) {
		black_x.push(randn_bm()*scale-2.5)
		black_y.push(randn_bm()*scale-2.5)
	}

	white_x=[]
	white_y=[]
	for(var i=0; i<100; i++) {
		white_x.push(randn_bm()*scale+2.5)
		white_y.push(randn_bm()*scale-2.5)
	}
	for(var i=0; i<100; i++) {
		white_x.push(randn_bm()*scale-2.5)
		white_y.push(randn_bm()*scale+2.5)
	}
				
	dataset=[]
	for(var i=0; i<black_x.length; i++) {
		data_x=[black_x[i], black_y[i]]
		data_y=0
		dataset.push([data_x, data_y])
	}
	for(var i=0; i<white_x.length; i++) {
		data_x=[white_x[i], white_y[i]]
		data_y=1
		dataset.push([data_x, data_y])
	}
	
	return dataset
}

function get4PartDataset() {
	black_x=[]
	black_y=[]
	for(var i=0; i<100; i++) {
		black_x.push(Math.random()*5)
		black_y.push(Math.random()*5)
	}
	for(var i=0; i<100; i++) {
		black_x.push(-Math.random()*5)
		black_y.push(-Math.random()*5)
	}

	white_x=[]
	white_y=[]
	for(var i=0; i<100; i++) {
		white_x.push(Math.random()*5)
		white_y.push(-Math.random()*5)
	}
	for(var i=0; i<100; i++) {
		white_x.push(-Math.random()*5)
		white_y.push(Math.random()*5)
	}
				
	dataset=[]
	for(var i=0; i<black_x.length; i++) {
		data_x=[black_x[i], black_y[i]]
		data_y=0
		dataset.push([data_x, data_y])
	}
	for(var i=0; i<white_x.length; i++) {
		data_x=[white_x[i], white_y[i]]
		data_y=1
		dataset.push([data_x, data_y])
	}
	
	return dataset
}
function getCrossDataset() {
	black_x=[]
	black_y=[]
	for(var i=0; i<100; i++) {
		var r=Math.random()*3+Math.sqrt(1)
		var theta=Math.random()*Math.PI/6+Math.PI/6
		black_x.push(r*Math.cos(theta))
		black_y.push(r*Math.sin(theta))
	}
	for(var i=0; i<100; i++) {
		var r=Math.random()*3+Math.sqrt(1)
		var theta=Math.random()*Math.PI/6+7*Math.PI/6
		black_x.push(r*Math.cos(theta))
		black_y.push(r*Math.sin(theta))
	}

	white_x=[]
	white_y=[]
	for(var i=0; i<100; i++) {
		var r=Math.random()*3+Math.sqrt(1)
		var theta=Math.random()*Math.PI/6+4*Math.PI/6
		white_x.push(r*Math.cos(theta))
		white_y.push(r*Math.sin(theta))
	}
	for(var i=0; i<100; i++) {
		var r=Math.random()*3+Math.sqrt(1)
		var theta=Math.random()*Math.PI/6+10*Math.PI/6
		white_x.push(r*Math.cos(theta))
		white_y.push(r*Math.sin(theta))
	}
				
	dataset=[]
	for(var i=0; i<black_x.length; i++) {
		data_x=[black_x[i], black_y[i]]
		data_y=0
		dataset.push([data_x, data_y])
	}
	for(var i=0; i<white_x.length; i++) {
		data_x=[white_x[i], white_y[i]]
		data_y=1
		dataset.push([data_x, data_y])
	}
	
	return dataset
}

function getCircularDataset() {
	black_x=[]
	black_y=[]
	for(var i=0; i<100; i++) {
		black_x.push(randn_bm()*0.5)
		black_y.push(randn_bm()*0.5)
	}
	
	white_x=[]
	white_y=[]
	for(var i=0; i<100; i++) {
		var next_rnd_x=randn_bm()*1.5
		var next_rnd_y=randn_bm()*1.5
		while(Math.sqrt(Math.pow(next_rnd_x,2) + Math.pow(next_rnd_y,2))<3) {
			next_rnd_x=randn_bm()*1.5
			next_rnd_y=randn_bm()*1.5
		} 
		
		white_x.push(next_rnd_x)
		white_y.push(next_rnd_y)
	}

	dataset=[]
	for(var i=0; i<black_x.length; i++) {
		data_x=[black_x[i], black_y[i]]
		data_y=0
		dataset.push([data_x, data_y])
	}
	for(var i=0; i<white_x.length; i++) {
		data_x=[white_x[i], white_y[i]]
		data_y=1
		dataset.push([data_x, data_y])
	}
	
	return dataset
}

function getTinyRandomDataset(n=2, m=3) { //n=number of points of category 1, m=number of points of category 2
	black_x=[]
	black_y=[]
	for(var i=0; i<n; i++) {
		black_x.push(randn_bm()*0.5)
		black_y.push(randn_bm()*0.5)
	}
	
	white_x=[]
	white_y=[]
	for(var i=0; i<m; i++) {
		var next_rnd_x=randn_bm()*1.5
		var next_rnd_y=randn_bm()*1.5
		while(Math.sqrt(Math.pow(next_rnd_x,2) + Math.pow(next_rnd_y,2))<3) {
			next_rnd_x=randn_bm()*1.5
			next_rnd_y=randn_bm()*1.5
		} 
		
		white_x.push(next_rnd_x)
		white_y.push(next_rnd_y)
	}
	
	dataset=[]
	for(var i=0; i<black_x.length; i++) {
		data_x=[black_x[i], black_y[i]]
		data_y=0
		dataset.push([data_x, data_y])
	}
	for(var i=0; i<white_x.length; i++) {
		data_x=[white_x[i], white_y[i]]
		data_y=1
		dataset.push([data_x, data_y])
	}
	
	return dataset
}