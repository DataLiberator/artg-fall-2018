
const promises = [d3.csv('libby-data/ratio-plus-index.csv', parse),d3.json('libby-data/countries.geojson')];

const w3 = document.querySelector('.plot-3').clientWidth;
const h3 = document.querySelector('.plot-3').clientHeight;

const plot3SVG = d3.select('.plot-3').append('svg')
			.attr('width',w3)
			.attr('height',h3);


//////////////////// begin huge promise.all function ////////////////////////////////////
Promise.all(promises).then(function(responseData){ 
	const data = responseData[0];
	const geodata = responseData[1];
	console.log(data);
	console.log(geodata);


	/////// function to render mercator map ///////////

function renderMercatorMap(geo, dom, data){
	console.log('Render world map in Mercator projection');
	console.log(data);

	// Append DOM
	const w = 960;
	const h = 480;


	const plot = d3.select('.plot').append('svg')
		.attr('width', w)
		.attr('height', h);

	// Create a projection function
	const projection = d3.geoMercator()
		.translate([w/2-30, h/2+100]);

	console.group('Mercator projection properties');
	console.log(`Scale: ${projection.scale()}`)
	console.log(`Center: ${projection.center()}`)
	console.log(`Translate: ${projection.translate()}`);
	console.groupEnd();

	// Create a geoPath generator
	const pathGenerator = d3.geoPath(projection);

	//Render geo path
	plot.selectAll(".geoPath")
		.data(geo.features)
		.enter()
		.append("path")
		.attr('d', pathGenerator)
		.attr('stroke','white')
		.attr('stroke-width','1px')
		.on('click',clicked)
		.on("mousemove", function(d) { //////// tooltip stuff
			console.log(d);
		})
		.on("mousemove", function(d) { 

            tooltip.transition()    
            .duration(200)  
            .style("opacity", 0.9);

            tooltip.html(d.properties.ADMIN +' : ' + dataValue + ' students per teacher') 
            .style("left", (d3.event.pageX-60) + "px")   
            .style("top", (d3.event.pageY-675) + "px");
          })         
          .on("mouseout", function(d) {   
            tooltip.transition()    
            .duration(500)    
            .style("opacity", 0); 
          })
		.attr("fill", function(d) {
			
			for (var i = 0; i < data.length; i++) {				
				//Grab country name
				var dataCountry = data[i].country;
				if(dataCountry === d.properties.ADMIN) {
					var dataValue = data[i].latest_ratio;

					console.log(d.properties.ADMIN, dataValue);
				};
			};

			if(1<=dataValue && dataValue <= 9){
				return '#cccccc'
			};

			if(10<=dataValue && dataValue <= 19){
				return '#a5a5a5'
			};

			if(20<=dataValue && dataValue <= 29){
				return '#7e7e7e'
			};

			if(30<=dataValue && dataValue <=39){
				return '#565656'
			};

			if (dataValue>=40){
				return '#cf0000'
			};
			if (dataValue== NaN){
				return '#000000'
			};

		});
};


	renderMercatorMap(geodata, document.getElementById('plot'),data); //references the renderMercatorMap function created down below.

//////// Merge the edu data and GeoJSON ////////////
					
		for (var i = 0; i < data.length; i++) {//Loop through once for each edu data value
			var dataCountry = data[i].country; //Grab country name
			var dataValue = data[i].latest_ratio; //Grab data value

			for (var j = 0; j < geodata.features.length; j++) { //Find the corresponding country inside the GeoJSON
				var geoCountry = geodata.features[j].properties.ADMIN;

				if (dataCountry == geoCountry) {
					geodata.features[j].properties.value = dataValue; //Copy the data value into the JSON
						
					break; //Stop looking through the JSON
					
				};
			};		
		};

//Create tooltip
 const tooltip = d3.select(".hereTooltip").append("div") 
        .attr("class", "hereTooltip");

		

//Create ratio box and dots on the side

const teacher = plot3SVG.append('circle')
		.attr('cx',w3/2)
		.attr('cy',(h3/2)-60)
		.attr('r',20)
		.style('fill','red');

function clicked(d){

	for (var i = 0; i < data.length; i++) {//Loop through once for each edu data value
			var dataCountry = data[i].country; //Grab country name
			var dataValue = data[i].latest_ratio; //Grab data value

			for (var j = 0; j < geodata.features.length; j++) { //Find the corresponding country inside the GeoJSON
				var geoCountry = geodata.features[j].properties.ADMIN;

				if (dataCountry == geoCountry) {
					geodata.features[j].properties.value = dataValue; //Copy the data value into the JSON
						
					break; //Stop looking through the JSON
					
				};
			};		
		};

	for(i=0;i<=dataValue;i++){
	plot3SVG.append('circle')
			.attr('cx', 15+Math.random()*(w3-30))
			.attr('cy', 15+Math.random()*(h3-30))
			.attr('r',10)
			.attr('opacity',0.6)
};

console.log('The data value is ' + dataValue); // It's going all the way to Zimbabwe and just counting that dataValue
console.log('The geoCountry is  ' + geoCountry);

	}
	// for (i=0; i<=dataValue; i++){
		

//////// clicked function /////////////

}); //end main promise function. Srsly, the scoping stuff was killing me so to get anything done I had to make that section cover everything.

////////////// parse function for edu data //////////////////////

function parse(d){
	return {
		country:d.country,
		hdi_rank_2017:+d.hdi_rank_2017,
		edu_index_2017:+d.edu_index_2017,
		ratio_1990:+d.ratio_1990,
		ratio_1995:+d.ratio_1995,
		ratio_2000:+d.ratio_2000,
		ratio_2005:+d.ratio_2005,
		ratio_2010:+d.ratio_2010,
		ratio_2011:+d.ratio_2011,
		ratio_2012:+d.ratio_2012,
		ratio_2013:+d.ratio_2013,
		ratio_2014:+d.ratio_2014,
		ratio_2015:+d.ratio_2015,
		ratio_2016:+d.ratio_2016,
		ratio_2017:+d.ratio_2017,
		latest_ratio:+d.latest_ratio,
		latest_ratio_year:d.latest_ratio_year
	}
}