console.log('4-1');
console.log(d3)

//Selection exercise
d3.selectAll('.container')
  .style('height','700px',)
  .style ('border', '1px solid black')
  .style ('margin', '20px');

const blocks = d3.selectAll ('.container')
  .select ('.block');

  blocks
  	.style('width', '400px')
  	.style ('height', '300px')
  	.attr('class', 'block-yellow block')
  	// adding a space in between (ex. 'block-yellow block')gives it multiple classes
  	.classed('block', true)

blocks
	.append ('div')
	.classed('block-child', true)
	.style('width', '50%')
	.style('height','50%')
	.style('background','red')
	// my yellow squares disappeared at this point. Why?


//In #container-4, draw a chromatic scale



/* d3.selectAll('.container') // grabbing 5
	.each(function(){
		//this function takes one element from the selection at a time, and does something with it.
		d3.select(this).style('background','purple')
	}) */


//In #container-5, experiment with drawing <svg> elements
//circle, rect, line, text, <g>