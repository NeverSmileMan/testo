import { IDifferentKeys } from "../components/keyboard/KeyboardOptions";

export interface IKeyboardOptions {
    keyboardSet: string[];
    keyCountByRow: number[]; // keyCountByRow = [9, 10, 8].length = keyboardSet.length
    differentKeys: IDifferentKeys;
    k1: number; // розрахункова відстань між кнопками (відносно ширини кнопки)
    k2: number; // фактична відстань між кнопками (відносно k1)
    k3: number; // висота кнопки (відносно висоти ряду)
}

export interface ISizeOfElements {
    keyWidth: number,
    keyHeight: number,
    keySpace: number,
}

export interface ISizeOfElementsInUnits {
    keyWidth: string,
    keyHeight: string,
    keySpace: string,
}

export function toUnits(value: number, unit: 'px' | '%' = '%') {
    return `${value}${unit}`;
}

export function getSizeOfElements(options: IKeyboardOptions) {
    const { keyboardSet, differentKeys,  keyCountByRow, k1, k2, k3 } = options;
    const additionalCount = Object.values(differentKeys).reduce((r, { width }) => r + (width ? width - 1 : 0), 0);
    const keyCount = keyboardSet.length + additionalCount;
    const rowCount = keyCountByRow.length;
    const keyWidth = Math.round(100 * rowCount / keyCount / ( 1 + k1));
    const keyHeight = 100 / rowCount * k3;
    const keySpace = Math.round(keyWidth * k1 * k2);

    return {
        keyWidth,
        keyHeight,
        keySpace,
    };
}

export function getSizeOfElementsInUnits(sizeOfElements: ISizeOfElements): ISizeOfElementsInUnits {
    const sizeInUnits = {
        keyWidth: toUnits(sizeOfElements.keyWidth),
        keyHeight: toUnits(sizeOfElements.keyHeight),
        keySpace: toUnits(sizeOfElements.keySpace),
    };

    return sizeInUnits;
}
