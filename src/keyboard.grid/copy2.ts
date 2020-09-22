interface Key {
	key?: string;
	opts: KeyOpts;
}
interface KeyOpts {
	hMultiplier: number;
	wMultiplier: number;
}
interface Opts {
	row: number,
	col: number,
	shiftEvenRow: boolean,
	shiftDivider: number,
	gridGap: string,
	additionalCol: boolean,
}
type Arr = Key | string;
type Style = {
	[propName: string]: GridCell | Grid; 
}

interface Grid  {
	display: string,
	gridGap: string,
	gridTemplateColumns: string,
};

interface GridCell {
	gridColumn: string;
	gridRow: string;
}




const arr_UK = [
	'а',
	'б',
	{
		key: 'в',
		opts: {
			hMultiplier: 1,
			wMultiplier: 1,
		},
	},
	'г',
	'ґ',
	'д',
	'е',
	'є',
	'ж',
	'з',
	'и',
	{
		key: 'і',
		opts: {
			hMultiplier: 1,
			wMultiplier: 1,
		},
	},
	'ї',
	'й',
	'к',
	{
		key: 'л',
		opts: {
			hMultiplier: 1, 
			wMultiplier: 1,
		},
	},
	'м',
	'н',
	'о',
	'п',
	'р',
	'с',
	'т',
	'у',
	'ф',
	'х',
	'ц',
	'ч',
	{
		opts: {
			hMultiplier: 1,
			wMultiplier: 4,
		},
	},
	'ш',
	'щ',
	'ь',
	'ю',
	'я',
	{
		key: ' ',
		opts: {
			hMultiplier: 1,
			wMultiplier: 1,
		},
	},
];

const opt = {
	row: 3,
	col: 13,
	shiftEvenRow: true,
	shiftDivider: 3,
	gridGap: '0.4em',
	additionalCol: false,
};

export let style = getKeyboardGridStyleOpt(opt, arr_UK, 'uk');

function getKeyboardGridStyleOpt(
	{ row = 3, col = 12, shiftEvenRow = true, shiftDivider = 3, gridGap = '0.4em', additionalCol = false }: Opts,
	arr: Arr[],
	lang: string,
) {
	const style: any = {}; //возвращаемый объект стилей 
	const offsetAccVertical = new Map(); //аккумулятор вертикального смещения  ?????название?????

	if (row * col < arr.length) {
		throw new Error('Increase rows number or col (buttons qty in rows) to fix this error. Check options: Keyboard -> group.buttons',);
	}

	if (shiftDivider < 1 || !shiftEvenRow) {
		shiftDivider = 1;
	}

	let calcGridColsQty = shiftDivider * col + +shiftEvenRow + (additionalCol ? shiftDivider - 1 : 0);
	
	style.grid = {
		display: 'grid',
		gridGap: gridGap,
		gridTemplateColumns: `repeat(${calcGridColsQty}, 1fr)`,
	};

	let counter = 0; // от 0 до arr.length
	let keyOpt: KeyOpts | null = null; //индивидуальныеы опции отображения кнопки из arr
	let btnBreakCounter = 0; // счётчик перенесенных букв

	//создаёт ряды
	for (let i = 0; i < row; i++) {
		//накопление горизонтального смещения отдельно взятого ряда
		let offsetAccStart = 0;
		let offsetAccEnd = 0;
		let indent = 0; // отступ 

		//заполняет ряды кнопками 
		for (let j = 0; j < col + (!(i % 2) ? +additionalCol : 0); j++) {
			
			//не даёт создавать лишние стили
			counter = i * col + j + (i > 0 ? +additionalCol : 0);
			if (counter - btnBreakCounter < arr.length) {
				keyOpt = (arr[counter - btnBreakCounter] as Key).opts ?? null;

				//учет накопления горизонтального сдвига конечной позиции кнопки
				if (keyOpt) {
					if ((arr[counter - btnBreakCounter] as Key).key === undefined ) {
						// indent += keyOpt.wMultiplier* shiftDivider;
						offsetAccEnd += keyOpt.wMultiplier;
						offsetAccStart += keyOpt.wMultiplier;
					} else {

						offsetAccEnd += keyOpt.wMultiplier - 1;// 1 - это стартовых 100%
					}
				} 


// console.log(indent, offsetAccEnd, offsetAccStart)



				//учет вертикального сдвига
				if (keyOpt && keyOpt.hMultiplier > 1) {
					let a = i + keyOpt.hMultiplier - 1;
					if (offsetAccVertical.get(a)) {
						offsetAccVertical.set(a, [...offsetAccVertical.get(a), j + btnBreakCounter]);
					} else {
						offsetAccVertical.set(a, [j + btnBreakCounter]);
					}
				}

				//расчёт ширины кнопки
				let startCol = 0; //вынести?
				let endCol = 0; //вынести?
				//сдвиг нечётных рядов
				if (shiftEvenRow) {
					startCol = 1 + (i % 2) +  (j + 1) * shiftDivider - shiftDivider + (offsetAccStart > 0 ? offsetAccStart * shiftDivider : 0); //сократить? единицы - начальные значения сетки '1 / 1'
					endCol = 1 + (i % 2) +  (j + 1) * shiftDivider + (offsetAccEnd > 0 ? offsetAccEnd * shiftDivider : 0); //сократить? единицы - начальные значения сетки '1 / 1'
				} else {
					startCol = 1 +  (j + 1) * shiftDivider - shiftDivider + (offsetAccStart > 0 ? offsetAccStart * shiftDivider : 0); //сократить? единицы - начальные значения сетки '1 / 1'
					endCol = 1 +  (j + 1) * shiftDivider + (offsetAccEnd > 0 ? offsetAccEnd * shiftDivider : 0); //сократить? единицы - начальные значения сетки '1 / 1'
				}
				//учет накопления горизонтального сдвига начальной позиции кнопки
				if (keyOpt && !(arr[counter - btnBreakCounter] as Key).key === undefined ) {

					offsetAccStart += keyOpt.wMultiplier 
				} 
					// offsetAccStart += keyOpt.wMultiplier - 1; // 1 - это стартовых 100%
				// }
				// if (keyOpt) 


				/*  проверка границ  */
				if (calcGridColsQty + 1 < startCol || calcGridColsQty + 1 < endCol) {
					// +1 потому что у сетки из колонок границ на 1 больше
					btnBreakCounter++;
					if (arr.length + btnBreakCounter > (shiftEvenRow ? calcGridColsQty + +additionalCol - row / 2 : row * col)) {

console.log('1');


						// throw new Error('Result of multiplication "row*col" must be greater than number of displayed buttons. Please update one of this options: "row", "col" or swap the buttons.',);
					}
					continue;
				}
				/*  проверка границ  */
				if (offsetAccVertical.get(i) && offsetAccVertical.get(i).includes(j + offsetAccStart)) {
					btnBreakCounter++;
					if ( arr.length + btnBreakCounter > (shiftEvenRow ? calcGridColsQty + +additionalCol - row / 2 : row * col)) {

					console.log('2');

						// throw new Error('Result of multiplication "row*col" must be greater than number of displayed buttons. Please update one of this options: "row", "col" or swap the buttons.',);
					}
						continue;
				}

				//создаёт стиль для кнопки
				style[`${counter - btnBreakCounter}_${lang}`] = {
					gridColumn: `${startCol} / ${endCol}`,
					gridRow: `${i + 1} / ${i + 2 + (keyOpt ? keyOpt.hMultiplier - 1 : 0)}`,
				};
			}
		}
	}
	return style;
}
