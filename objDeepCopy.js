console.clear();
const obj = {
	"id": 1,
	"name": "Leanne Graham",
	"username": "Bret",
	"email": "Sincere@april.biz",
	"address": {
		"street": "Kulas Light",
		"suite": "Apt. 556",
		"city": "Gwenborough",
		"zipcode": "92998-3874",
		"geo": {
			"lat": "-37.3159",
			"lng": "81.1496"
		}
	},
	"phone": "1-770-736-8031 x56442",
	"website": "hildegard.org",
	"company": {
		"name": "Romaguera-Crona",
		"catchPhrase": "Multi-layered client-server neural-net",
		"bs": "harness real-time e-markets"
	}
};

class DeepCopy {
	#copyObj = null;

	constructor(origObj) {
		if (this.#isPrimitive(origObj)) { return origObj; }

		this.#main(origObj);
		return this.#copyObj;
	}

	#main(origObj) {
		if (Array.isArray(origObj)) {
			this.#copyObj = [];
		} else {
			this.#copyObj = {};
		}
		this.#copyObj = this.#copying(origObj);
	}

	#copying(obj) {
		let result = {};
		if (Array.isArray(obj)) {
			result = [];
		} else {
			result = {};
		}

		for (const key in obj) {
			if (this.#isPrimitive(obj[key])) {
				result[key] = obj[key];
			} else {
				result[key] = this.#copying(obj[key]);
			}
		}
		return result;
	}

	#isPrimitive(value) {
		return (
			typeof value !== 'object' && 
			!Array.isArray(value) ||
			value == null 
		)
	}
};

const objCopy = new DeepCopy(obj);
console.log('\n===========================\n');
console.log(obj);
console.log('\n');
console.log(objCopy);

// ===================================
// ======== TEST's ZONE ====================
// ============================
{
	const objCopy = new DeepCopy(obj);
	testExpr(objCopy.name != undefined, true);
}
{
	const objCopy = new DeepCopy(obj);
	objCopy.name = 'Suren';
	testExpr(objCopy.name != obj.name, true);
}
{
	const objw = {
		name: 'Bob',
		friends: {
			Frenk: 30,
		}
	};
	const objCopy = new DeepCopy(objw);
	delete objw.friends;
	testExpr(objCopy.friends != undefined, true);
	testExpr(objCopy.friends == objw.friends, false);
	testExpr(objCopy.friends == objw.friends, false);
}
{
	testWrite(() => {
		const objCopy = new DeepCopy(obj);
		objCopy.company.name = 'Test';
		testExpr(obj.company.name == objCopy.company.name, false);
	});
}

{
	testWrite(() => {
		const objw = {
			name: 'Bob',
			friends: {
				Frenk: 30,
			}
		};
		const objCopy = new DeepCopy(objw);
		objw.friends.Bob = 60;
		testExpr(objCopy.friends.Bob == undefined, true);
	});
}
{
	const arr = [1, 2, 3, 'four'];
	const objCopy = new DeepCopy(arr);
	testExpr(JSON.stringify(objCopy) == JSON.stringify(arr), true);
	testExpr(objCopy == arr, false);
}

// =====================================
// FUNCTION's for tests ========
function testWrite(testCase) { // if have error, but dont stop programm work
	try{
		testCase();
	} catch(e) {
		console.log('<<<<<<<<<<');
		console.log('have error');
		console.log('>>>>>>>>>>>');
	}
}

function testExpr(expression, expectedResult) {
	// console.log('------------------');

	if (expression == expectedResult) {
		console.log('test PASSED')
	} else {
		console.log('test FAILED')
	}
}

// function baseTest(expression, testPassed, testFailed) {
// 	console.log('------------------');

// 	if (expression) {
// 		testPassed();
// 	} else {
// 		testFailed();
// 	}
// }