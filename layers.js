class NeuralNetwork {
	constructor() {
		this.layers=[]
	}
	initializeCanvases() {
		this.ctx=document.getElementById("myCanvas").getContext("2d")
		for(var i=0; i<this.layers.length; i++) {
			this.layers[i].initializeCanvas()
		}
	}
	
	forward(input) {
		var e=input.slice()
		for(var i=0; i<this.layers.length; i++) {
			e=this.layers[i].forward(e)
		}
		return e
	}
	backward(errorVector) {
		var e=errorVector.slice()
		for(var i=this.layers.length-2; i>=0; i--) { //skip softmax layer (-2)
			e=this.layers[i].backward(e)
		}
		return e
	}
	updateParameterGradient(errorVector) {
		var e=errorVector.slice()
		for(var i=this.layers.length-2; i>=0; i--) { //skip softmax layer (-2)
			this.layers[i].updateParameterGradient(e)
			e = this.layers[i].backward(e)
		}
	}
	parameterUpdate(learning_rate=0.1) {
		for(var i=0; i<this.layers.length-1; i++) { //skip softmax
			this.layers[i].parameterUpdate(learning_rate)
		}
	}
	drawIndividualOutputs(dataset) {
		var dataset_x=dataset.map(function(value,index) { return value[0] })
		var e=dataset_x
		for(var i=0; i<this.layers.length-2; i++) {//psa 15.04 dont draw 1d output of last layer
			e = this.layers[i].drawOutput(e)
		}
	}
	drawOutputs(dataset) {
		drawOutput(this.ctx, dataset, this)
	}
}
class Layer { //to inherit from
	constructor() {}
	initializeCanvas() {
		var canvas = document.createElement('canvas')
		canvas.width  = 300
		canvas.height = 300
		document.body.appendChild(canvas)
		this.ctx=canvas.getContext("2d")
		
		var rect = canvas.getBoundingClientRect();
		var textbox = document.createElement('p')
		textbox.style.position="absolute"
		textbox.style.top=String(rect.bottom + 10) + "px"
		textbox.style.left=String(rect.left + 125) + "px"
		document.body.appendChild(textbox)
		this.textbox=textbox
	}
	
	drawOutput(inputs) {
		var outputs=new Array(inputs.length)
		for(var i=0; i<inputs.length; i++) {
			outputs[i]=this.forward(inputs[i])
		}
		this.ctx.clearRect(0, 0, 500, 500)
		drawZippedPoints(this.ctx, outputs.slice(0,100), "green")
		drawZippedPoints(this.ctx, outputs.slice(100), "orange")
		
		
		this.textbox.innerHTML=this.layerToString()
		
		return outputs
	}
	
}
class LinearLayer extends Layer {
	constructor(inputDim, outputDim, scale=1) {
		super()
		this.inputDim=inputDim
		this.outputDim=outputDim
		this.initializeWeights(scale=scale)
		this.intializeGradient()
	}
	initializeWeights(scale=1) {
		this.matrix=new Array(this.outputDim) 
		for(var i=0; i<this.outputDim; i++) {
			var random_row = new Array(this.inputDim)
			for(var j=0; j<this.inputDim; j++)
				random_row[j]=randn_bm()*scale;
			this.matrix[i]=random_row
		}
		this.matrixTranspose=transposeMatrix(this.matrix)
	}
	intializeGradient() {
		this.gradient=new Array(this.outputDim)
		for(var i=0; i<this.outputDim; i++) {
			var zeros = new Array(this.inputDim)	
			for(var j=0; j<this.inputDim; j++)
				zeros[j]=0;
			this.gradient[i]=zeros
		}
		this.gradientCount=0
	}
	
	
	forward(input) {
		this.input=input
		return multiplyMatrixVector(this.matrix, input)
	}
	backward(errorVector) {
		return multiplyMatrixVector(this.matrixTranspose, errorVector)
	}
	updateParameterGradient(errorVector){
		for(var i=0; i<this.outputDim; i++) {
			for(var j=0; j<this.inputDim; j++) {
				this.gradient[i][j]+=this.input[j]*errorVector[i] //stimmt des jetzt eigentlich????
			}
		}
		this.gradientCount++
	}
	parameterUpdate(learning_rate) {
		var scaledAverageGradient=this.gradient.map(x => x.map(y => y * learning_rate / this.gradientCount)) //sieht komisch aus, ist aber richtig
		this.matrix=subtractMatrices(this.matrix, scaledAverageGradient)
		this.matrixTranspose=transposeMatrix(this.matrix)
		
		this.intializeGradient()
	}
	
	layerToString() {
		return matrixToString(this.matrix)
	}
}
class BiasLayer extends Layer {
	constructor(inputDim, outputDim, scale=1) {
		super()
		this.inputDim=inputDim
		this.outputDim=outputDim
		this.initializeWeights()
		this.intializeGradient()
	}
	initializeWeights() {
		this.bias=new Array(this.outputDim) 
		for(var i=0; i<this.outputDim; i++) {
			this.bias[i]=0.1
		}
	}
	intializeGradient() {
		this.gradient=new Array(this.outputDim) 
		for(var i=0; i<this.outputDim; i++) {
			this.gradient[i]=0
		}
		this.gradientCount=0
	}
	
	forward(input) {
		this.input=input
		return vectorAddition(input, this.bias)
	}
	backward(errorVector) {
		return errorVector.slice()
	}
	
	updateParameterGradient(errorVector){
		for(var i=0; i<this.outputDim; i++) {
			this.gradient[i]+=errorVector[i] //stimmt des jetzt eigentlich????
		}
		this.gradientCount++
	}
	parameterUpdate(learning_rate) {
		var scaledAverageGradient=this.gradient.map(x => x * learning_rate / this.gradientCount) //sieht komisch aus, ist aber richtig
		this.bias=vectorSubtraction(this.bias, scaledAverageGradient)
		
		this.intializeGradient()
	}
	layerToString() {
		return this.bias.join(", ")
	}
}
class AffineLayer extends Layer {
	constructor(inputDim, outputDim, scale=1) {
		super()
		this.inputDim=inputDim
		this.outputDim=outputDim

		this.biasLayer=new BiasLayer(inputDim, outputDim, scale=scale)
		this.linearLayer=new LinearLayer(inputDim, outputDim, scale=scale)
	}

	forward(input) {
		this.input=input
		return this.biasLayer.forward(this.linearLayer.forward(input)) 
	}
	backward(errorVector) {
		return this.linearLayer.backward(errorVector)
	}
	updateParameterGradient(errorVector){
		this.biasLayer.updateParameterGradient(errorVector)
		this.linearLayer.updateParameterGradient(errorVector)
	}
	parameterUpdate(learning_rate) {
		this.biasLayer.parameterUpdate(learning_rate)
		this.linearLayer.parameterUpdate(learning_rate)
	}
	layerToString() {
		return this.linearLayer.layerToString() + this.biasLayer.layerToString()
	}
}
class FeedForwardLayer extends Layer  {
	constructor(inputDim, outputDim, activation_function, activation_function_derivative, scale=1) {
		super()
		this.inputDim=inputDim
		this.outputDim=outputDim
		
		this.activation_function=activation_function
		this.activation_function_derivative=activation_function_derivative
		
		this.affineLayer=new AffineLayer(inputDim, outputDim, scale=scale)
	}

	forward(input) {
		this.input=input
		this.affineOutput=this.affineLayer.forward(input)
		return this.activation_function(this.affineOutput)
	}
	backward(errorVector) {
		var e=hadamardProduct(this.activation_function_derivative(this.affineOutput),errorVector)
		return this.affineLayer.backward(e)
	}
	updateParameterGradient(errorVector){
		var e=hadamardProduct(this.activation_function_derivative(this.affineOutput),errorVector)
		this.affineLayer.updateParameterGradient(e)
	}
	parameterUpdate(learning_rate) {
		this.affineLayer.parameterUpdate(learning_rate)
	}
	layerToString() {
		return this.affineLayer.layerToString()
	}
}
class Identity extends Layer  { 
	constructor() {
		super()
	}
	forward(input) {
		if(Array.isArray(input))
			return input.slice();
		return input
	}
	backward(errorVector) { 
		return errorVector.slice()
	}
}

class ToScalar extends Layer  { 
	constructor() {
		super()
	}
	forward(input) { //converts 1x1 vector to number
		return input[0]
	}
	backward(errorVector) { 
		return errorVector.slice()
	}
}
class SoftmaxLayer extends Layer  { 
	constructor() {
		super()
	}
	forward(input) { //converts 1x1 vector to number
		return 1/(1+Math.exp(-input[0]))
	}
	backward(errorVector) { //actual gradient is computed together with the losslayer, so just identity here
		return errorVector.slice()
	}
}
class SigmoidLayer extends Layer  { //psa 13.05: nur was ausprobieren
	constructor() {
		super()
	}
	forward(input) { //converts 1x1 vector to number
		return 1/(1+Math.exp(-input[0]))
	}
	backward(errorVector) { //actual gradient is computed together with the losslayer, so just identity here
		var output=this.forward(errorVector)
		return [output*(1 - output)]
	}
	updateParameterGradient(errorVector){
	}
	parameterUpdate(learning_rate) {
	}
}
class Loss {
	constructor() {}
	forward(pred, tru) { // pred and tru are numbers
		return -tru*Math.log(pred)-(1-tru)*Math.log(1-pred)
	}
	backward(pred, tru) { //RETURNS GRADIENT OF SOFTMAX + LOSS; pred and true are two numbers
		return [pred - tru]
	}
}
class L2Loss {
	constructor() {}
	forward(pred, tru) { // pred and tru are numbers
		return 0.5 * Math.pow(pred - tru, 2)
	}
	backward(pred, tru) { //RETURNS GRADIENT OF SOFTMAX + LOSS; pred and true are two numbers
		return [pred - tru]
	}
}