import {
    useState, useRef, useEffect, useContext,
    SetStateAction, Dispatch, RefObject,
} from 'react';
// import ActiveInputService from '../services/ActiveInputService';
import { ActiveInputService } from '../../../services/ActiveInputService';
import { InputList, IInputList, IStateInput } from '../objects/InputListNumber';
import { Props } from '../components//Search';

import { MainContext } from '../../../main';
import { IItem } from '../objects/items';

interface IcallbacksNew {
    addItem: (item: any) => boolean;
    setType: (val: string | null) => any;
    setSelectedItem: Dispatch<SetStateAction<IItem>>;
}

const changeState = (
    input: IInputList,
    setState: Dispatch<() => IStateInput<string>>,
    ref: RefObject<HTMLDivElement>,
    callbacks: IcallbacksNew, // Props['callbacks'],
) => {
    // const activeInputService = ActiveInputService.getInstance();
    input.onChange(setState);
    // input.onSelect(callbacks.onSelect);
    // callbacks.resetSearch(() => input.setValue(''));
    const onListSelect = input._onSelect;
    // const attachInput = () => {
    //     activeInputService.setActiveInput(input);
    //     return () => activeInputService.delActiveInput(input);
    // };
    const setValue = (getNewValue: SetStateAction<string>) => {
        if (typeof getNewValue === 'function')
            input.setValue(getNewValue(input.getValue()));
    };
    const attachInput = () => {
        ActiveInputService.setActive(setValue);
        return () => ActiveInputService.unsetActive(setValue);
    };
    const refreshInput = (valueHTML: string) => {
        if (ref.current) ref.current.innerHTML = valueHTML;
    };
    return { onListSelect, attachInput, refreshInput };
}

const changeCallbacksNew = (input: IInputList, callbacks: IcallbacksNew) => {
    const onSelectNew = (item: IItem) => {
        if (item.type === 'ваговий') {
            callbacks.addItem({ item });
            return;
        }
        callbacks.setType('qtyGoods')();
        callbacks.setSelectedItem(item);
    }
    input.onSelect(onSelectNew);
}

const useSearch = (callbacks: Props['callbacks']) => {
    const [input] = useState(() => new InputList());
    const [{ isFocus, value, valueHTML }, setState] = useState(input.getStateObject);
    const ref = useRef(null);
    const callbacksNew = useContext(MainContext);
    const [{
        attachInput, refreshInput, onListSelect,
    }] = useState(() => changeState(input, setState, ref, callbacksNew));
    useEffect(() => {
        changeCallbacksNew(input, callbacksNew);
        input.setValue('');
    }, [input, callbacksNew]);
    useEffect(() => refreshInput(valueHTML), [refreshInput, valueHTML]);
    useEffect(attachInput, [attachInput]);
    return { isFocus, value, ref, onListSelect };
};

export default useSearch;
