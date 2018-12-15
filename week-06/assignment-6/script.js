//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);
const m = {t:50, r:50, b:50, l:50};

console.log('test');

data.then(function(rows){
	console.log(rows);
	//rows.forEach(function(d){
		//console.log(d.cost_per_sqft);
	const cSqftMin = d3.min(rows,function(d){
		return d.cost_per_sqft;
	});
	const cSqftMax = d3.max(rows,function(d){
		return d.cost_per_sqft;
	})
	const permitsByBorough = d3.nest()
		.key(function(d){
			return d.borough;
		})
		.entries(rows);
	console.log(permitsByBorough);

	const boroughs = permitsByBorough.map(function(d){
		return d.key;
	})
	console.log(boroughs);
});


function parse(d){
	return {
		applicant_business_name:d.applicant_business_name,
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate:+d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		job_number:+d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage,
		cost_per_sqft: +d.cost_estimate / +d.square_footage
	}
}

var w = 1000
var h = 600

var sampleData = [5, 10, 20, 40, 80, 160];

var svg = d3.select('body')
	.append('svg')
	.attr('width', w)
	.attr('height', h);

var circles = svg.selectAll('circle')
	.data(sampleData)
	.enter()
	.append('circle')
	.attr('cx', function(d,i){
	return (i*50)+50;
	})
	.attr('cy',h/2)
	.attr('r',function(d){
		return d;
	})
	.attr('fill','teal')
	.attr('fill-opacity',0.2);


/* var svg = d3.select('body')
	.append('svg')
	.attr('width',100%)
	.attr('height',100%)
	.attr('fill',red);
	

	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function(d){
			return d[0];
		})
		.attr('cy',function(d){
			return d[1];
		})
		.attr("r",5); */
