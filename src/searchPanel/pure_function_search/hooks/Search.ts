import {
    useState, useRef, useEffect, useContext, useCallback,
    SetStateAction, Dispatch, RefObject,
} from 'react';
import { ActiveInputService } from '../../../services/ActiveInputService';
import { MainContext } from '../../../main';
import { IItem } from '../objects/items';

interface IState {
    value: string;
    isFocus: boolean;
}

const getState = (): IState => ({
    value: '',
    isFocus: false,
});

interface IMethods {
    setValue: (value: string) => void;
    pressKey: (key: string) => void;
    onSelect: (item: IItem, callback: (item: IItem) => void) => void;
    setFocus: () => void;
    blurFocus: () => void;
    getValueHTML: (state: IState) => string;
}

const getMethods = (
    setState: Dispatch<(state: IState) => IState>,
): IMethods => {

    const setFocus = () => setState(state => ({
        ...state,
        isFocus: true,
    }));

    const blurFocus = () => setState(state => ({
        ...state,
        isFocus: false,
    }));

    const pressKey = (key: string) => {
        // const currentValue = this.value;
        try {
            switch(key) {
                case "SPACE":
                    addSymbol(' ');
                    break;
                case "BACKSPACE":
                    delSymbol();
                    break;
                case "CLEAR":
                    setValue('');
                    break;
                case "ENTER":
                    // onSelect();
                    break;         
                default:
                    addSymbol(key);
            }
        } catch(e) {
        //     this._value = currentValue;
        //     this._throwMessage(MessageCode.INTERNAL_ERROR, 'НЕДОПУСТИМИЙ СИМВОЛ!');
        }
    };

    const addSymbol = (value: string) => setState(state => ({
        ...state,
        value: state.value += value,
    }));

    const delSymbol = () => setState(state => ({
        ...state,
        value: state.value.substring(0, state.value.length - 1),
    }));

    const setValue = (value: string = '') => setState(state => ({
        ...state, value: value.toUpperCase(),
    }));

    const getValue = (state: IState) => state.value;


    const getValueHTML = (state: IState) =>
        (' ' + state.value.replace(/ /g, '&nbsp;'));

    // onMessage(message: IMessage) {
    //     this._message = message;
    // }

    const onSelect = (item: IItem, callback: (value: IItem) => void) => callback(item);

    const ifFocus = (state: IState) => state.isFocus;

    // protected _throwMessage(code: MessageCode, text?: string) {
    //     this._message?.sendMessage(code);
    // }

    return { pressKey, setValue, onSelect, setFocus, blurFocus, getValueHTML };
}

interface ICallbacksNew {
    addItem: (item: any) => boolean;
    setType: (val: string | null) => any;
    setSelectedItem: Dispatch<SetStateAction<IItem>>;
}

const changeState = (
    setState: Dispatch<(state: IState) => IState>,
    ref: RefObject<HTMLDivElement>,
) => {
    const { getValueHTML, setValue, onSelect} = getMethods(setState);

    const setNewValue = (getNewValue: SetStateAction<string>) => setState(state => {
        if (typeof getNewValue === 'function')
            setValue(getNewValue(state.value));
        return state;
    });

    const attachInput = () => {
        ActiveInputService.setActive(setNewValue);
        return () => ActiveInputService.unsetActive(setNewValue);
    };
    const refreshInput = (valueHTML: string) => {
        if (ref.current) ref.current.innerHTML = valueHTML;
    };
    return { onListSelect: onSelect, getValueHTML, setValue, attachInput, refreshInput };
}

const changeCallbacksNew = (onListSelect: (item: IItem, callback: (value: IItem) => void) => void, callbacks: ICallbacksNew) => {
    console.log('newCallbacks');
    const onSelectNew = (item: IItem) => {
        if (item.type === 'ваговий') {
            callbacks.addItem({ item });
            return;
        }
        callbacks.setType('qtyGoods')();
        callbacks.setSelectedItem(item);
    }
    return (item: IItem) => onListSelect(item, onSelectNew);
}

const useSearch = () => {
    const [state, setState] = useState<IState>(getState);
    const ref = useRef(null);
    const callbacksNew = useContext(MainContext);
    const [{ attachInput, refreshInput, onListSelect, getValueHTML, setValue }] = useState(
        () => changeState(setState, ref)
    );
    // const onSelectList = useCallback(
    //     (item: IItem) => onListSelect(item, changeCallbacksNew(callbacksNew)), [callbacksNew]);
    const [onSelectList, getOnSelectList] = useState(() => changeCallbacksNew(onListSelect, callbacksNew));
    useEffect(() => {
        getOnSelectList(() => changeCallbacksNew(onListSelect, callbacksNew));
        setValue('');
    }, [callbacksNew]);
    useEffect(() => refreshInput(getValueHTML(state)), [refreshInput, state]);
    useEffect(attachInput, [attachInput]);
    return { ...state, ref, onListSelect: onSelectList };
};

export default useSearch;
