//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse); //JS Promise
const m = {t:50, r:50, b:50, l:50};

data.then(function(rows){

	const permitsByBorough = d3.nest()
		.key(function(d){return d.job_type})
		.key(function(d){return d.borough })
		.entries(rows); // this is an array

		const rootNode = d3.hierarchy({
			key:'root',
			values:permitsByBorough
		}, function(d){return d.values})
		.sum(function(d){ return d.cost_estimate});

		const rootNodebyCost = rootNode.sum();
		const rootNodebyCount = rootNode.count();

	console.log(rootNodebyCost);
	console.log(rootNodebyCount);

	console.log(rootNode);

})

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
		cost_per_sqft: +d.square_footage > 0 ? (+d.cost_estimate /+d.square_footage):0
	}
}