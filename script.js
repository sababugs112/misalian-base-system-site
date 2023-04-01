function factorize(num){

	function isIntiger(num){
		return Math.floor(num) === num;
	}

	let factors = [];

	for (let i = 1 ; i < num/2;i++){
		if(isIntiger(num/i)){
			factors.push(i);
			factors.push(num/i);
		}
	}
	
	factors = factors.filter(function (value, index, array) { 
		return array.indexOf(value) === index;
	});

	factors.sort((a,b)=>{
		return a > b;
	});

	factors.pop();
	factors.shift();


	return factors;

}

function generateBaseString(number){
	let factors = factorize(number);


	let minDiff = Infinity;
	let n1,n2;

	for(let i = 0; i <factors.length;i++){
		let num1 = factors[i];
		let num2 = number/factors[i];
		

		if(minDiff > Math.abs(num1-num2)){
			minDiff = Math.abs(num1-num2);
			n1 = num1;
			n2 = num2;
		}
	}


	let preffix ="";
	let suffix="";

	if(n1 > n2) {
		let t = n2;
		n2 = n1;
		n1 = t;
	}


	let perfixes = ['','','bi','tri','tetra','penta','hexa','hepta','octo','enna','deca','leva','doza','baker'];

	for(let i = 0 ; i < perfixes.length ; i++)
		if(i == n1)preffix+= perfixes[i];
	



	if(n1 == 17) preffix+= 'mal';
	if(n1 == 20) preffix+= 'icosi';
	if(n1 == 36) preffix+= 'feta';
	if(n1 == 100)preffix+= 'hecto';


	if(preffix=== '')
		if(isPrime(n1)) preffix= 'hen' + generateBaseString(n1 - 1) + 'sna';
		else preffix= generateBaseString(n1) + 'sna';

	

	let suffixes = ['nullary','unary','binary','trinary','quaternay','quinary','sexsimal','septimal','ctal','nonary','decimal','levenary','dozenal',"baker's dozenal"];

	for(let i = 0 ; i < suffixes.length ; i++)
		if(i == n2)suffix+= suffixes[i];


	if(n2 == 16) suffix = 'hex';
	if(n2 == 17) suffix = 'suboptimal';
	if(n2 == 20) suffix = 'vigesimal';
	if(n2 == 36) suffix = 'niftimal';
	if(n2 == 100)suffix = 'centesimal';

	
	if(suffix=== '')
		if(isPrime(n1)) suffix= 'hen' + generateBaseString(n2 - 1);
		else suffix= generateBaseString(n2);


	
	return preffix+suffix;
};



let isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}


document.getElementById("button").addEventListener("click",()=>{
	let number = document.getElementById("num").value;
	let res = "";

	
	if(isPrime(number)) {
		res +='un' + generateBaseString(number - 1);
	}else{
		res = generateBaseString(number);
	}
	
	
	
	
	if(number == 16) res = 'hex';
	if(number == 17) res = 'suboptimal';
	if(number == 20) res = 'vigesimal';
	if(number == 36) res = 'niftimal';
	if(number == 100)res = 'centesimal';

	let qfactors = ['nullary','unary','binary','trinary','quaternay','quinary','sexsimal','septimal','octal','nonary','decimal','elevenary','dozenal',"baker's dozenal"];

	for(let i = 0 ; i <= 13;i++){
		if(i == number){
			res = qfactors[number];
			break;
		}
	}

	document.getElementById("result").innerHTML = res;
})

document.getElementById("copy").addEventListener("click",()=>{
	let text = document.getElementById("result");
	navigator.clipboard.writeText(text.innerHTML);
})