
const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const margin = {t:50, r:50, b:50, l:50};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;
console.log(W)
console.log(H)

//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);

data.then(function(rows){
	
	//data discovery
	console.log (rows.length);

	//boroughs
	const permitsByBorough = d3.nest()
        .key(function(d){ return d.borough })
        .entries(rows);
    permitsByBorough.forEach(function(x){
        console.log(x);
    });

    //cost
    const costMin = d3.min (rows, function(d){ return d.cost_estimate });
    const costMax = d3.max(rows,function(d){return d.cost_estimate });
    const costAvg = d3.mean (rows,function(d) {return d.cost_estimate});

    console.log(costMin, costMax, costAvg);

    //square footage
	const sqftAccessor = function(d){ return d.square_footage };
    const sqftMin = d3.min(rows, sqftAccessor);
    const sqftMax = d3.max(rows, sqftAccessor);
    const sqftAvg = d3.mean(rows, sqftAccessor);
    const sqftMedian = d3.median(rows, sqftAccessor);
    console.group('Sqft')
    console.log(sqftMin, sqftMax)
    console.log(sqftAvg)
    console.log(sqftMedian)
    console.groupEnd()

//sqft
const scaleX = d3.scaleLinear()
	.domain([sqftMin,sqftMax])
	.range([0,w]);

//cost
const scaleY = d3.scaleLinear()
	.domain([costMin,costMax])
	.range([h,0]);

console.group('Scale');
console.log(scaleX.domain());
console.log(scaleX.range());
console.log(scaleX(4000000));
console.groupEnd();

//append DOM

const plot1 = d3.select('#plot-1')
	.append('svg')
	.attr('width', W)
	.attr('height', H)
	.append('g')
	.attr('transform', `translate(${margin.l}, ${margin.t})`);

draw(plot1, rows, scaleX, scaleY);

// rows.forEach(function(d){
// 	const x = scaleX(d.square_footage);
// 	const y = scaleY(d.cost_estimate);

// 	plot1.append('circle')
// 		.attr('cx', x)
// 		.attr('cy', y)
// 		.attr('r', 3)
// 		.style('fill-opacity',0.2);


// });

});

function draw(selection, data, sX, sY){
	// draw function will take data and draw scatterplot under selection
	data.forEach(function(d){
	const x = sX(d.square_footage);
	const y = sY(d.cost_estimate);

	selection.append('circle')
		.attr('cx', x)
		.attr('cy', y)
		.attr('r', 3);
	})
}


function parse(d){
	return {
		applicant_business_name:d.applicant_business_name, //property name if you don't parse. Can name new property whatever you want
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate:+d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`, //creates template, easier than +
		job_number:d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage
	}
}