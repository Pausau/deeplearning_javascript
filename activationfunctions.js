
function relu(x) { //vector x
	result=new Array(x.length)
	for(var i=0; i<x.length; i++) {
		result[i]=Math.max(x[i], 0)
	}
	return result
}
function reluDerivative(x) { //vector x
	result=new Array(x.length)
	for(var i=0; i<x.length; i++) {
		if(x[i]>0)
			result[i]=1;
		else
			result[i]=0;
	}
	//console.log(result)
	return result
}
