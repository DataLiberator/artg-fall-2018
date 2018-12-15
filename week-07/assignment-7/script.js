//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse); // finds data and runs the parse function
const m = {t:50, r:50, b:50, l:50}; // sets margins around plot
const w = d3.select('.plot').node().clientWidth - m.l - m.r; // selects plot and subtracts 50px each from l and r (width)
const h = d3.select('.plot').node().clientHeight - m.t - m.b;// selects plot and subtracts 50px each from t and b (height)


//Scales
const scaleCost = d3.scaleLog().range([h, 0]); // sets cost on the y axis scale to h px
const scaleSqft = d3.scaleLog().range([0, w]); // sets sqft on x axis to w px
const scalePerSqft = d3.scaleLog().range([h, 0]); // sets persqft to h px on the y axis
const scaleBorough = d3.scaleOrdinal(); // sets Borough to be an ordinal scale
const scaleSize = d3.scaleSqrt().range([0,30]); // *** sets y axis to be a power scale from 0-30(?)

//Append <svg>
const plot = d3.select('.plot') // selects class "plot" from DOM tree
	.append('svg') // appends svg element with no properties
	.attr('width', w + m.l + m.r) // sets svg width to width + l + r (why not just use clientWidth?)
	.attr('height', h + m.t + m.b) // sets svg height to height + t + b (why not just use clientHeight?)
	.append('g')// appends g element to svg
	.attr('transform', `translate(${m.l}, ${m.t})`);// transforms svg location to 50px down and to the right.
plot.append('g') // *** Since the svg's 1st g is selected, this appends a g element to that preexisting g.
	.attr('class', 'axis-y'); // the g is given a class called "axis-y"
plot.append('g') // *** the svg's 1st g is selected again, and another g is appended.
	.attr('class', 'axis-x') // the g is given a class called "axis-x"
	.attr('transform', `translate(0, ${h})`); // "axis-x" g is transformed down h px. 

data.then(function(rows){ //Once the parsed data is uploaded, runs a function called 'rows' to return the following:
	//Data discovery
	//Range of cost_estimate
	const costMin = d3.min(rows, function(d){ return d.cost_estimate }); //returns minimum cost estimate for all permits
	const costMax = d3.max(rows, function(d){ return d.cost_estimate }); //returns maximum cost estimate for all permits
	console.log(costMin, costMax); // console logs cost min and cost max
	//Range of square_footage
	const sqftMin = d3.min(rows, function(d){ return d.square_footage }); //returns minimum square footage for all permits
	const sqftMax = d3.max(rows, function(d){ return d.square_footage }); //returns maximum square footage for all permits
	console.log(sqftMin, sqftMax); // console logs square footage min and max
	//Range of cost_per_sqft
	const perSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft }); //returns minimum perSqft for all permits
	const perSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft }); // returns maximum perSqft for all permits
	console.log(perSqftMin, perSqftMax); // console logs perSqft min and max
	//The boroughs
	const boroughs = d3.nest() // creates a new nest generator called "boroughs"
		.key(function(d){ return d.borough }) // adds a level to the nest hierarchy, returns d.borough 
		.entries(rows) // applies the nest operator to the array called 'rows' (*** when did we call the array rows? Thought it was just the name of the function.)
		.map(function(d){ return d.key }); // *** returns a mapped array of d.key (which is borough names)
	console.log(boroughs); // console logs the array "boroughs", which shows d.key, or the names of all 5 boroughs.

	//Use the data gathered during discovery to set the scales appropriately

	scaleCost.domain([1, costMax]); // sets Cost domain to 1-costMax
	scaleSqft.domain([1, sqftMax]); // sets Sqft domain to 1-sqftMax
	scalePerSqft.domain([1, perSqftMax]); // sets perSqft domain to 1-perSqft Max
	scaleBorough.domain(boroughs).range(d3.range(boroughs.length).map(function(d){ // sets Borough scale to 5 elements, calls map function
		return (w-100)/(boroughs.length-1)*d + 50; //Spaces the ordinal scale by returning width-100px / (5-1)*d +50 (*** how can you multiply by d? Does it have a value? How does this function work technically?)
	}));// closes scale.Borough range function
	scaleSize.domain([0, costMax]); // sets Size domain to 0-costMax

	//Plot per sqft cost vs. borough
	perSqftChart(rows.slice(0,1000)); // *** What is this command doing? What argument is "rows" satisfying? What type is perSqft? var, function, method?

	//Plot cost vs. sqft
	//costVsSqftChart(rows);

	//PART 2: toggle between the two plots
	d3.select('#cost-vs-sqft')
		.on('click', function(){
			d3.event.preventDefault();
			costVsSqftChart(rows.slice(0,1000));
			console.log('cost-vs-sqft');
			/* YOUR CODE HERE*/
		});

	d3.select('#per-sqft-vs-borough')
		.on('click', function(){
			d3.event.preventDefault();
			perSqftChart(rows.slice(0,1000));
			console.log('per-sqft-vs-borough');
			/* YOUR CODE HERE*/
		});

});

function perSqftChart(data){

	const nodes = plot.selectAll('.node')
		.data(data)

	/*
 	 * Complete this function
	 * YOUR CODE HERE*/

	 const nodesEnter=nodes.enter() //ENTER set
	 		.append('circle')
	 		.attr('class','node');
	 nodesEnter.merge(nodes) // ENTER + UPDATE set *** where is the exit set?
	 	.transition()
	 	.attr('r',function(d){return scaleSize(d.cost_estimate)})
	 	.style('fill','teal')
	 	.style('fill-opacity',0.2)
	 	.attr('cx', function(d){return scaleBorough(d.borough)})
	 	.attr('cy',function(d){return scalePerSqft(d.cost_per_sqft)});

	 //Exit selection
	 const nodesExit = nodes.exit()
	 	.remove();


	/*nodes.exit().remove();//identify and remove all extra nodes not needed for 1:1 ratio

	nodes.enter()//select all nodes via 'nodes' variable and tell it to see how many extra shapes we need
		.append('circle')
			.attr('cx', function(d){
				return d.square_footage
			})
			.attr('cy', function(d){
				return d.cost_estimate
			})
			.attr('r',7)
		
			.style('opacity',0.3);*/

	//Draw axes
	//This part is already complete, but please go through it to see if you understand it
	const axisY = d3.axisLeft()//generates axis on the left
		.scale(scalePerSqft) // sets scale to scalePerSqft, previously defined on line 11
		.tickSize(-w); //sets ticks to go across whole width towards the right *** why -w to go right?
	const axisX = d3.axisBottom() // crates axis on the bottom
		.scale(scaleBorough); // sets scale to scaleBorough, previously defined on line 12
		//*** where do we show that we want a tick mark above each borough on the scale?

	plot.select('.axis-y') // selects plot, then axis-y (*** How did axisY know to be under plot?)
		.transition() // schedules a transition (but we haven't put more info there yet)
		.call(axisY) // calls a selection (is this selection.call or transition.call based on its location?)
		.selectAll('line') // selects all lines in the current selection
		.style('stroke-opacity', 0.1); // makes the lines 0.1 opacity.
	plot.select('.axis-x') //selects a plot and then axis-x
		.transition() //schedules a transition
		.call(axisX); // calls the selection axisX
}

function costVsSqftChart(data){ //creates a function costVsSqftChart using data variable as the input. *** Do we have any promise that the data here is already parsed? Not in .then section.) A. Yes. Function is defined below, but called in .then section.

	const nodes = plot.selectAll('.node')// creates a variable for nodes that is a selection of all nodes in class = plot.
		.data(data); // binds all selected nodes to data.
		/* .append('circle')
			.attr('r',10)
			.attr('opacity',0.3)
			.attr('color','') */
	/*
 	 * Complete this function
	 * YOUR CODE HERE*/
	 const nodesEnter = nodes.enter()
	 		.append('circle')
	 		.attr('class','node');

	 		nodes.merge(nodesEnter)// combines selection nodes + nodesEnter so all the stuff changes simultaneously.
	 			.transition()
	 			.attr('r',2)
	 			.style('fill','teal')
	 			.style('fill-opacity',0.2)
	 			.attr('cx',function(d){return scaleSqft(d.square_footage)})
	 			.attr('cy',function(d){return scaleCost(d.cost_estimate)});
	 

	//Draw axes
	//This part is already complete, but please go through it to see if you understand it
	const axisY = d3.axisLeft() // creates a left axis
		.scale(scaleCost) // sets scale to scaleCost
		.tickSize(-w); // creates ticks going right for the whole width
	const axisX = d3.axisBottom() // creates a bottom axis
		.scale(scaleSqft); // sets bottom scale to scaleSqft

	plot.select('.axis-y') // selects y axis
		.transition() // schedules transition
		.call(axisY) // calls axis y
		.selectAll('line') // selects all lines
		.style('stroke-opacity', 0.1); // sets stroke opacity to 0.1
	plot.select('.axis-x') // selects x axis
		.transition() // schedules transition
		.call(axisX); // calls x axis 
}

function parse(d){ // begins command to parse the data (*** How does it know to pull from 'data' variable? Ohhhh. Probably the data var knows to run this function, bc it's called for in the 2nd argument.)
	return { // will return the following
		applicant_business_name:d.applicant_business_name, //returns same value
		borough:d.borough, //returns same value
		community_board:d.community_board, //returns same value
		cost_estimate:+d.cost_estimate, //converts string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //converts string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`, //*** why back ticks and looking like transform?
		job_number:+d.job_number, // converts string to #
		job_type:d.job_type, //returns same value
		job_type2:d.job_type2, //returns same value
		permit_type:d.permit_type, //returns same value
		permit_issuance_date:new Date(d.permit_issuance_date), // *** creates new [property?] called Date, same value and style as permit_issuance_date. Just for ease of reference?
		square_footage:+d.square_footage, // turns string to number
		cost_per_sqft: +d.square_footage > 0?(+d.cost_estimate / +d.square_footage):0 // creates new variable cost_per_sqft and defins it as "if square_footage">0, then cost/sqft. If not, = 0.
	} //ends return
} // ends parse function