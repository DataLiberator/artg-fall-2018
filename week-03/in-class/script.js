{console.log("hello world");}

// OBJECTS: A way of grouping and representing real world data
	const person1 = {
		name: "Libby",
		age: 24,
		faculty: false,
		department: "department1"
		};
		// curly braces denote object, seperated by colon, terminated by comma
	
const person2 = {
		department: "department1"
}
const department1 = {
	name:"camd",
	facultyCount: 20
}
//modify
person1.age = 25
person1.faculty = !(person1.faculty)

console.log(person1.department.facultyCount)

//Arrays = list of objects of equal value and type
const arr1 = [3, 4, 5, 6, -9];
console.log('Simple array has a length of ' + arr1.length);
arr1.push(10);

//indices end at length-1

const a = 9 > 7
if(a){
		console.log('9 greater than 7 is true')
}else{
	console.log('9 greater than 7 is true')
}

console.log(arr1[10]);
//LOOPS: figure out why he formatted this the way he did.
for(let i = 0; i < 10;i++){
	console.log(i+1)
}
console.log("-------------------------------")

const arr2 = [67, 893, -100];
let sum = 0;
for (let i=0; i<arr2.length; i++){
	sum += arr2[i];
}
console.log('Sum of arr2 is ' + sum);

console.log ('-- Testing Math.random()------------')
/*
	for(loop of 1000 iterations){
		generate a random value
		let's put random value in one of 4 buckets
		0 - 0.25
		0.25 - 0.5
		0.5 - 0.75
		0.75 - 1

	Uncaught ReferenceError: math is not defined at ,anonymous>:1:1} */

const sums = {
	bucketQuartile1: 0,
	bucketQuartile2: 0,
	bucketQuartile3: 0,
	bucketQuartile4: 0,
};
for(let i=0; i<1000; i++){
	const num = Math.random();
	if(num < 0.25){
		sums.bucketQuartile1 += 1;
	}else if(num < 0.5){
		sums.bucketQuartile2 += 1;
	}else if(num < 0.75){
		sums.bucketQuartile3
	}else{
		sums.bucketQuartile4 += 1;
	}
}
console.log("The numbers in each bucket is: "
	+ sums.bucketQuartile1 + " / "
	+ sums.bucketQuartile2 + " / "
	+ sums.bucketQuartile3 + " / "
	+ sums.bucketQuartile4 + " / "
);

// Mine messed up and divided numbers into 245 / 276 / 0 / 229. How can I make sure that Math.random() is between 0-1?











