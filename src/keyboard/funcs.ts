interface Key {
	key: string;
	opts: {
		hMultiplier: number;
		wMultiplier: number;
		indentLeft?: number;
	};
}
interface KeyOpts {
	hMultiplier: number;
	wMultiplier: number;
	indentLeft?: number;
}
interface Opts {
	row: number;
	col: number;
	shiftEvenRow: boolean;
	shiftDivider: number;
	gridGap: string;
	additionalCol: boolean;
}
type Arr = Key | string;
type Style = {
	[propName: string]: GridCell | Grid;
};

interface Grid {
	display: string;
	gridGap: string;
	gridTemplateColumns: string;
}

interface GridCell {
	gridColumn: string;
	gridRow: string;
}

export function createGrid(keys: any, options: any) {
	const grid = {};
	Object.keys(keys).forEach((item)=>Object.assign(grid,getKeyboardGridStyle(options[item], keys[item], item)));
	return grid;
}

export function getKeyboardGridStyle(
	{ row = 3, col = 12, shiftEvenRow = false, shiftDivider = 3, gridGap = '0.5em', additionalCol = false }: Opts,
	arr: Arr[],
	lang: string = '',
) {
	const style: any = {}; //возвращаемый объект стилей
	const offset = new Map(); //аккумулятор смещения

	if (shiftDivider < 1 || !shiftEvenRow) {
		shiftDivider = 1;
	}

	const calcGridColsQty = shiftDivider * col + +shiftEvenRow + (additionalCol ? shiftDivider - 1 : 0);

	style[`grid_${lang}`] = {
		display: 'grid',
		gridGap: gridGap,
		gridTemplateColumns: `repeat(${calcGridColsQty}, 1fr)`,
		gridTemplateRows: `repeat(${row}, 1fr)`,
	};

	let keyOpt: KeyOpts | null = null; //индивидуальныеы опции отображения кнопки из arr
	let createdKeyCounter = 0;
	//создаёт ряды
	for (let i = 0; i < row; i++) {
		//заполняет ряды кнопками
		for (let j = 0; j < col + (!(i % 2) ? +additionalCol : 0); j++) {
			if (offset.get(i) && offset.get(i).includes(j)) {
				/*  добаыить отступ  */
				continue;
			} else {
				//не даёт создавать лишние стили
				if (createdKeyCounter < arr.length) {
					keyOpt = (arr[createdKeyCounter] as Key).opts ?? null;
					//обработка кнопки с опциями h/w
					if (keyOpt && keyOpt.wMultiplier >= 1 && keyOpt.hMultiplier >= 1) {
						for (let k = i; k <= i + keyOpt.hMultiplier - 1; k++) {
							for (let n = j; n < j + keyOpt.wMultiplier; n++) {
								if (offset.get(k)) {
									offset.set(k, [...offset.get(k), n]);
								} else {
									offset.set(k, [n]);
								}
							}
						}
					}
					style[`${createdKeyCounter}_${lang}`] = {
						gridColumn: `${1 + (shiftEvenRow ? i % 2 : 0) + j * shiftDivider} / ${1 + (shiftEvenRow ? i % 2 : 0) + (1 + j) * shiftDivider + (keyOpt ? (keyOpt.wMultiplier - 1) * shiftDivider : 0)}`,
						gridRow: `${i + 1} / ${i + 2 + (keyOpt ? keyOpt.hMultiplier - 1 : 0)}`,
					};
				}
				createdKeyCounter++;
			}
		}
	}
	return style;
}
