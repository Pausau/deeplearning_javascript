/*function multiplyMatrices(m1, m2) {
	var result = [];
	for (var i = 0; i < m1.length; i++) {
		result[i] = [];
		for (var j = 0; j < m2[0].length; j++) {
			var sum = 0;
			for (var k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
}*/
function multiplyMatrixVector(mat, vec) {
	var result = new Array(mat.length);
	for (var i = 0; i < mat.length; i++) {
		var sum=0
		for (var j = 0; j < vec.length; j++) {
			sum+=mat[i][j] * vec[j]
		}
		result[i]=sum
	}
	return result
}
function subtractMatrices(mat1, mat2) {
	var result=new Array(mat1.length)
	for (var i = 0; i < mat1.length; i++) {
		result[i]=new Array(mat1[0])
		for (var j = 0; j < mat1[0].length; j++) {
			result[i][j]=mat1[i][j] - mat2[i][j]
		}
	}
	return result
}
function vectorAddition(vec1, vec2) {
	var result=new Array(vec1.length)
	for(var i=0; i<vec1.length; i++) {
		result[i]=vec1[i]+vec2[i]
	}
	return result
}
function vectorSubtraction(vec1, vec2) {
	var result=new Array(vec1.length)
	for(var i=0; i<vec1.length; i++) {
		result[i]=vec1[i]-vec2[i]
	}
	return result
}
function hadamardProduct(vec1, vec2) {
	var result=new Array(vec1.length)
	for(var i=0; i<vec1.length; i++) {
		result[i]=vec1[i]*vec2[i]
	}
	//console.log(result)
	return result
}
function transposeMatrix(mat) {
	return mat[0].map((_, colIndex) => mat.map(row => row[colIndex]))
}
function matrixToString(mat) {
	var str=""
	for (var i = 0; i < mat.length; i++) {
		str+="["+mat[i].join(", ")+"] <br />"
	}
	return str
}