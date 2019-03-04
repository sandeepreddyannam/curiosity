function getFinalOpenedDoors (numDoors) {
	// Good luck!
	var temp = [];
	for (let j=1; j<=numDoors; j++) {
		for(let i=1; i<=numDoors; i++) {
			if(j===1) {
				temp[i] = true;
			}
			else if(i*j <= 100) {
				temp[i*j] = !temp[i*j];
			}
		}
	}

	var final = [];
	var idx = temp.indexOf(true);
	while (idx != -1) {
		final.push(idx);
		idx = temp.indexOf(true, idx + 1);
	}

	console.log(temp, final);
	return final;
}
getFinalOpenedDoors(100);

function sprialMatrix() {
	var a = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];
	let r1=0,r2 = 4, c1=0, c2 = 4, i;
	while(r1<r2 && c1<c2) {
		for(i=c1; i<c2; i++) {
			console.log(a[r1][i]);
		}
		r1++;
		for(i=r1; i<r2; i++) {
			console.log(a[i][c2-1]);
		}
		c2--;
		if(r1<r2) {
			for(i=c2-1; i>=c1; i--) {
				console.log(a[r2-1][i]);
			}
			r2--;
		}
		if(c1<c2) {
			for(i=r2-1;i>=r1; i--) {
				console.log(a[i][c1]);
			}
			c1++;
		}
	}
	// 0,0 0,1 0,2 0,3 
	// 1,0 1,1 1,2 1,3 
	// 2,0 2,1 2,2 2,3 
	// 3,0 3,1 3,2 3,3
}

function diagonalMatrix() {
	var a = [
		[1, 2, 3, 4, 5],
		[5, 6, 7, 8, 6],
		[9, 10, 11, 12, 7],
		[13, 14, 15, 16, 8]
	];
	let r1 = 0,
		r2 = 4,
		c1 = 0,
		c2 = 5,
		i, j;

	while (r1 < r2 && c1 < c2) {
		i=r1;
		j=0;
		while(i>=0 & j<=c1) {
			console.log(a[i][j]);
			i--;
			j++;
		}
		console.log('______');
		r1++;
		c1++;
	
	}
	i=0;
	j=0;
	r1=0;
	c1=0;
	
	while(r1 <= r2-1 && c1 <= c2) {
	
	i=r2-1;
	j=c1+1;
	while(i>=r1 && j<=c2) {
		console.log(a[i][j]);
		i--;
		j++;
	}
	
		r1++
		c1++;
	console.log('_____');
	}
	/*  00 01 02 03 04
		10 11 12 13
		20 21 22 23
		30 31 32 33 
		40
		*/
}

function zigzag() {
	var a = [
		[1, 2, 3, 4, 'a'],
		[5, 6, 7, 8, 'b'],
		[9, 10, 11, 12, 'c'],
		[13, 14, 15, 16, 'd']
		];
	let r1 = 0,
		r2 = 4,
		c1 = 0,
		c2 = 5,
		i, j;
		
	while(r1<r2) {
		for(i=c1; i<c2; i++) {
			console.log(a[r1][i]);
		
		}
		r1++;
		
		for(i=c2-1; i>=0; i--) {
			console.log(a[r1][i]);
		}
		r1++
	}
}

function printZ() {
	var a = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16]
		];
	let r1 = 0,
		r2 = 4,
		c1 = 0,
		c2 = 4,
		i, j;
		
		
	for(i=0; i<c2; i++) {
		console.log(a[0][i]);
	
	}
	i=r1+1; j=c2-2;
	while(i<r2 && j>0) {
		console.log(a[i][j]);
		i++;
		j--;
	}
	for(i=0; i<c2; i++) {
		console.log(a[r2-1][i]);
	}
		/*  00 01 02 03
			10 11 12 13
			20 21 22 23
			30 31 32 33 
		*/
}

function validChessBoard() {
	var a = [
		[0, 1, 0, 1],
		[1, 0, 1, 0],
		[0, 1, 0, 1],
		[1, 0, 1, 0]
		];
		let i, j;
		
		//i j,  i j+1, i j-1, i-1 j, i+1 j;
		let isValid = true
		
		for(i=0; i<4; i++) {
			for(j=0; j<4; j++) {
				if(
				(j+1<3 && a[i][j] == a[i][j+1]) ||
				(j-1>0 && a[i][j] == a[i][j-1] ) ||
				(i-1>0 && a[i][j] == a[i-1][j]) ||
				(i+1<3 && a[i][j] == a[i+1][j])
				) {
					isValid =false;
							console.log('not matched');
					return;
				}
			}
		}
		if(isValid) {
			console.log('matched');
		}
		
		
		
		
		/*  00 01 02 03
			10 11 12 13
			20 21 22 23
			30 31 32 33 
		*/
}
let animate = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];

  
  /*  00 01 02 03
	  10 11 12 13
	  20 21 22 23
	  30 31 32 33 
   */

/* backtracking with permutations */

  var str = ['A', 'B', 'C'];

  function swap(x, i, j, next) {
   /* console.log('before swap', x, next) */;
	let temp = '';
	temp = x[i];
	x[i] = x[j];
	x[j] = temp;
	console.log('swapped', x, i, j);
	return x;
  }
  
  function permute(temp, l, r) {
	//console.log('func', temp, l, r);
	if (l === r) {
	  console.log('final', temp);
	} else {
	  for (let i = l; i <= r; i++) {
		temp = swap(temp, l, i);
		permute(temp, l + 1, r);
		console.log('__________')
	   temp = swap(temp, l, i, 'next swap');
	  }
	}
  }
  
  permute(str, 0, 2);
  