console.log('Assignment 4');

//Append a <svg> element to .chart, and set its width and height attribute to be the same as .chart
//Hint: first, you have to find the width and height of .chart. See example for width below
const width = d3.select('.chart').node().clientWidth;
console.log(width)
const height = d3.select('.chart').node().clientHeight;
console.log(height)

let svg = d3.select('.chart')
		.append('svg')
		.attr('height',height)
		.attr('width',width);

for(let i=0; i<=width; i+=50){
	svg.append('line')
		.attr('x1',i)
		.attr('x2',i)
		.attr('y1',0)
		.attr('y2',height)
		.style('stroke-width', 1)
		.style('stroke', 'darkgray');
}

for(let i=0; i<=height; i+=50){
	svg.append('line')
		.attr('x1',0)
		.attr('x2',width)
		.attr('y1',i)
		.attr('y2',i)
		.style('stroke-width', 1)
		.style('stroke', 'darkgray');
}
svg.append('circle')
	.attr('class','circles')
	.attr('cx',50)
	.attr('cy',50)
	.attr('r',50);

svg.append('circle')
	.attr('class','circles')
	.attr('r',75)
	.attr('transform','translate (300, 200)');

svg.append('rect')
	.attr('width',50)
	.attr('height',70)
	.attr('x', 400)
	.attr('y',height-70)
	.attr('fill',d3.rgb(50,50,50));

//Then append the following elements under <svg>:

// ------- Horizontal and vertical grid lines, spaced 50px apart
//Hint: use a loop to do this

//----- Circle, radius 50px, center located at (50,50)

//------- Another circle, radius 75px, center located at (300,200)
//Do this without setting the "cx" and "cy" attributes

//------ A rectangle, offset from the left edge by 400px and anchored to the bottom
//with a width of 50px and a height of 70px

// !*!*!*!*! Label the centers of the two circles with their respective coordinates

//------- Give the <rect> element a fill of rgb(50,50,50), and no stroke
//Do this without using CSS

// ------ Give the two <circle> elements no fill, and a 2px blue outline
//Do this by giving them a class name and applying the correct CSS

/* d3.selectAll('circle')
	.transition()
	.duration(3000)
	.attr('r', 200); */