/* eslint-disable */
interface Key {key: string,
	opts: {
		hMultiplier: number,
		wMultiplier: number,
	}
}

const arr_UK = ['а','б',	
{ key: 'в',
	opts: {
		hMultiplier: 1,
		wMultiplier: 1,
}}, 'г','ґ','д','е','є','ж','з','и',
// 'і'
{key: 'і',
opts: {
	hMultiplier: 1,
	wMultiplier: 2,
}
}
,'ї','й','к',
{key: 'л',
opts: {
	hMultiplier: 1,
	wMultiplier: 1,
}
}
,
'м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я',
	{key: ' ',
		opts: {
			hMultiplier: 1,
			wMultiplier: 1,
		}
	}
];





let row = 4; // необяз
let col = 9; // необяз
let shiftEvenRow = true; // необяз   
let shiftDivider = 3; // необяз
let gridGap = '0.4em'; // необяз
let additionalCol = false; // необяз

// const opt = {
// 	row: 3, // необяз
// 	col: 12, // необяз
// 	shiftEvenRow: true, // необяз
// 	shiftDivider: 3, // необяз
// 	gridGap: '0.4em', // необяз
// 	additionalCol: true,  // необяз
// };

export let style = getKeyboardGridStyleOpt(arr_UK, 'uk');
// console.log('style', style);






function getKeyboardGridStyleOpt(arr: any, lang: string) {
	const style: any = {};
	const accCol = new Map();

	if (row * col < arr.length) {
		throw new Error(
			'Increase rows number or col (buttons qty in rows) to fix this error. Check options: Keyboard -> group.buttons',
		);
	}

	if (shiftDivider < 1 || !shiftEvenRow) { 
		shiftDivider = 1;
	}
	
	let calcGridColsQty = shiftDivider * col + +shiftEvenRow + (additionalCol ? shiftDivider-1 : 0);
	
	style.grid = {
		display: 'grid',
		gridGap: gridGap,
		gridTemplateColumns: `repeat(${calcGridColsQty}, 1fr)`,   
	};

	
	let x = 0;// иди вынести и обнулять после цикла?
	let uniqKeyOpt: any = 0;// иди вынести и обнулять после цикла?
	let shiftAccumulatorRow = 0;
	

	//создаёт ряды
	for (let i = 0; i < row; i++) {
		//накопление сдвига горизонтального
		let shiftAccumulatorStart = 0;
		let shiftAccumulatorEnd = 0;

		//заполняет ряды кнопками +!(i % 2)
		for (let j = 0; j < col+ (!(i % 2) ? +additionalCol : 0); j++) { //????????????????????????????????????????????????
			//не даёт создавать лишние стили
			x = (i * col + j +(i > 0 ? +additionalCol : 0)) ;
			if (x - shiftAccumulatorRow < arr.length) {
				
				uniqKeyOpt = (arr[x-shiftAccumulatorRow] as Key).opts  ?? null;

				//учет накопления горизонтального сдвига конечной позиции кнопки
				if (uniqKeyOpt) {shiftAccumulatorEnd += (uniqKeyOpt.wMultiplier-1);} // 1 - это стартовых 100%
				//учет вертикального сдвига 
				if (uniqKeyOpt && uniqKeyOpt.hMultiplier > 1){
						let a = i+uniqKeyOpt.hMultiplier-1;
					if (accCol.get(a)) {
						accCol.set( a, [	...accCol.get(a), j+shiftAccumulatorRow]);
					} else {
						accCol.set( a, [j+shiftAccumulatorRow]);

					}
				}
				

				//расчёт ширины кнопки
				let startCol = 0; //вынести?
				let endCol = 0; //вынести?
				if (shiftEvenRow) {
					startCol = (1 + (i % 2) + (j + 1) * shiftDivider - shiftDivider + (shiftAccumulatorStart > 0 ? (shiftAccumulatorStart-1)*shiftDivider : 0)) ; //сократить? единицы?
					endCol = (1 + (i % 2) + (j + 1) * shiftDivider + (shiftAccumulatorEnd > 0 ? (shiftAccumulatorEnd-1)*shiftDivider : 0)); //сократить? единицы?
				} else {
					startCol = (1 +  (j + 1) * shiftDivider - shiftDivider + (shiftAccumulatorStart > 0 ? (shiftAccumulatorStart-1)*shiftDivider : 0)) ; //сократить? единицы?
					endCol = (1 + (j + 1) * shiftDivider + (shiftAccumulatorEnd > 0 ? (shiftAccumulatorEnd-1)*shiftDivider : 0)); //сократить? единицы?
				}
				//учет накопления горизонтального сдвига начальной позиции кнопки
				if (uniqKeyOpt) shiftAccumulatorStart += (uniqKeyOpt.wMultiplier-1); // 1 - это стартовых 100%

				
				if ( calcGridColsQty+1 < startCol || calcGridColsQty+1 < endCol) {  // +1 потому что у сетки 37 колонок но 38 границ ( на 1 бальше)
					shiftAccumulatorRow++;
					if (arr.length+shiftAccumulatorRow > (row*col+shiftDivider )) throw new Error('Result of multiplication "row*col" must be greater than number of displayed buttons. Please update one of this options: "row", "col" or "wMultiplier" (in displayed key.opts).');
					continue;
				}
				if ( accCol.get(i) && accCol.get(i).includes(j) ) {  
					shiftAccumulatorRow++;
					if (arr.length+shiftAccumulatorRow > (row*col+shiftDivider ) ) throw new Error('Result of multiplication "row*col" must be greater than number of displayed buttons. Please update one of this options: "row", "col" or "wMultiplier" (in displayed key.opts).');
					continue;
				}
				
				
				//создаёт стиль для кнопки
				style[`${x-shiftAccumulatorRow}_${lang}`] = {
					gridColumn: `${startCol} / ${endCol}`,
					// gridRow: `${startRow} / ${endRow}`,
					gridRow: `${i + 1} / ${i + 2+ ( uniqKeyOpt ? uniqKeyOpt.hMultiplier-1 : 0)}`,
				};
			}
		}
	}
	return style;
}






































































//------------------------------------------------------------------------------------ before Y

// // const arr_EN = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
// // {key: ' ',
// // 	opts: {
// // 		hMultiplier: 1,
// // 		wMultiplier: 10,
// // 	}
// // }
// // ];


// // const style_en = getKeyboardGridStyleOpt(arr_EN, 'en');

// // style = Object.assign(style, style_en);









// //----------------------------------------------------------
// /* eslint-disable */
// interface Key {key: string,
// 	opts: {
// 		hMultiplier: number,
// 		wMultiplier: number,
// 	}
// }

// const arr_UK = ['а','б',	
// { key: 'в',
// 	opts: {
// 		hMultiplier: 1,
// 		wMultiplier: 1,
// }}, 'г','ґ','д','е','є','ж','з','и',
// // 'і'
// {key: 'і',
// opts: {
// 	hMultiplier: 1,
// 	wMultiplier: 1,
// }
// }
// ,'ї','й','к',
// {key: 'л',
// opts: {
// 	hMultiplier: 1,
// 	wMultiplier: 1,
// }
// }
// ,
// 'м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я',
// 	{key: ' ',
// 		opts: {
// 			hMultiplier: 1,
// 			wMultiplier: 1,
// 		}
// 	}
// ];





// let row = 3; // необяз
// let col = 12; // необяз
// let shiftEvenRow = true; // необяз   если false - shiftDivider = 1
// let shiftDivider = 3; // необяз
// let gridGap = '0.4em'; // необяз
// let additionalCols = 0; // необяз

// const opt = {
// 	row: 3, // необяз
// 	col: 12, // необяз
// 	shiftEvenRow: true, // необяз
// 	shiftDivider: 3, // необяз
// 	gridGap: '0.4em', // необяз
// 	additionalCols: 0,  // необяз
// };

// export let style = getKeyboardGridStyleOpt(arr_UK, 'uk');
// // console.log('style', style);







// function getKeyboardGridStyleOpt(arr: any, lang: string) {
// 	const style: any = {};

// console.log('arr.length', arr.length)



// 	if (row * col < arr.length) {
// 		throw new Error(
// 			'You must provide more buttons to display them all. increase rows number or buttons qty in rows to fix this error. Check options: Keyboard -> group.buttons',
// 		);
// 	}

// 	if (additionalCols < 0 ) {
// 		throw new Error(`Option "additionalCols" must be more than 0. Check options: Keyboard -> group.buttons`);
// 	}

	
// 	if (shiftDivider < 1 || !shiftEvenRow) {  // подружить c shiftEvenRow если false - ставить 1 или разделить рачсёт
// 		// можнo добавить Error
// 		shiftDivider = 1;
// 	}
	
// 	let calcGridColsQty = shiftDivider * col + +shiftEvenRow + additionalCols;
	
// 	style.grid = {
// 		display: 'grid',
// 		gridGap: gridGap,
// 		gridTemplateColumns: `repeat(${calcGridColsQty}, 1fr)`,   
// 	};

	
// 	let x = 0;// иди вынести и обнулять после цикла?
// 	let uniqKeyOpt: any = 0;// иди вынести и обнулять после цикла?
// 	let shiftAccumulatorRow = 0;
	
// 	let shiftAccumulatorCol = 0;

// 	//создаёт ряды
// 	for (let i = 0; i < row; i++) {
// 		//накопление сдвига горизонтального
// 		let shiftAccumulatorStart = 0;
// 		let shiftAccumulatorEnd = 0;

// 		//заполняет ряды кнопками
// 		for (let j = 0; j < col; j++) {
// 			//не даёт создавать лишние стили
// 			x = (i * col + j) ;
// 			if (x - shiftAccumulatorRow < arr.length) {
				

// 				uniqKeyOpt = (arr[x-shiftAccumulatorRow] as Key).opts  ?? null;

// 				//учет накопления горизонтального сдвига конечной позиции кнопки
// 				if (uniqKeyOpt) {shiftAccumulatorEnd += (uniqKeyOpt.wMultiplier-1);} // 1 - это стартовых 100%
				
				
// 				//расчёт ширины кнопки
// 				let startCol = 0; //вынести?
// 				let endCol = 0; //вынести?
// 				if (shiftEvenRow) {
// 					startCol = (1 + (i % 2) + (j + 1) * shiftDivider - shiftDivider + (shiftAccumulatorStart > 0 ? (shiftAccumulatorStart-1)*shiftDivider : 0)) ; //сократить? единицы?
// 					endCol = (1 + (i % 2) + (j + 1) * shiftDivider + (shiftAccumulatorEnd > 0 ? (shiftAccumulatorEnd-1)*shiftDivider : 0)); //сократить? единицы?
// 				} else {
// 					startCol = (1 +  (j + 1) * shiftDivider - shiftDivider + (shiftAccumulatorStart > 0 ? (shiftAccumulatorStart-1)*shiftDivider : 0)) ; //сократить? единицы?
// 					endCol = (1 + (j + 1) * shiftDivider + (shiftAccumulatorEnd > 0 ? (shiftAccumulatorEnd-1)*shiftDivider : 0)); //сократить? единицы?
// 				}
// 				//учет накопления горизонтального сдвига начальной позиции кнопки
// 				if (uniqKeyOpt) shiftAccumulatorStart += (uniqKeyOpt.wMultiplier-1); // 1 - это стартовых 100%



// 				// console.log('calcGridColsQty', calcGridColsQty);
// 				if ( calcGridColsQty+1 < startCol || calcGridColsQty+1 < endCol) {  // +1 потому что у сетки 37 колонок но 38 границ ( на 1 бальше)
// 					shiftAccumulatorRow++;
// 					if (arr.length+shiftAccumulatorRow > row*col ) throw new Error('Result of multiplication "row*col" must be greater than number of displayed buttons. Please update one of this options: "row", "col" or "wMultiplier" (in displayed key.opts).');
// 					continue;
// 				}
				
				
// 				//создаёт стиль для кнопки
// 				style[`${x-shiftAccumulatorRow}_${lang}`] = {
// 					gridColumn: `${startCol} / ${endCol}`,
// 					// gridRow: `${startRow} / ${endRow}`,
// 					gridRow: `${i + 1} / ${i + 1}`,
// 				};
// 				console.log('startCol endCol calcGridColsQty', calcGridColsQty, startCol, endCol, `${x-shiftAccumulatorRow}_${lang}`, shiftAccumulatorRow );
// 				// console.log('st', style[`${x-shiftAccumulatorRow}_${lang}`] );
// 				// console.log('j , i', j , i)
// 			}
// 		}
// 	}
// 	return style;
// }


// //защита передлинения
// //расчёт высоты
// //в расчёт +1 переменную, которая будет исправлять смежные ряды

// //throw new Error(`Please check options of key ${} or try to use 'additionalCols' option`)






// //------------------------------------------------------------------------------------

// // const arr_EN = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
// // {key: ' ',
// // 	opts: {
// // 		hMultiplier: 1,
// // 		wMultiplier: 10,
// // 	}
// // }
// // ];


// // const style_en = getKeyboardGridStyleOpt(arr_EN, 'en');

// // style = Object.assign(style, style_en);