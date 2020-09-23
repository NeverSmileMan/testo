import React, {
    useState, useRef, useEffect, useContext,
    SetStateAction, Dispatch, RefObject,
} from 'react';
import { ActiveInputService } from '../../../services/ActiveInputService';
import { InputList, IInputList, IStateInput } from '../objects/InputListNumber';
import { Props } from '../components/Search';
import {ModalContext} from '../../../components/modal.wind/modal.context';
import { MainContext } from '../../../main/main';
import { IItem, ItemType } from '../../data/Item';
import ModalQtyGoods from '../../../components/modal.wind/modal.qty.goods/modal.qty.goods'

interface IcallbacksNew {
    addItem: (item: any) => boolean;
    setSelectedItem: Dispatch<SetStateAction<any>>; //IItem
}

const changeState = (
    input: IInputList,
    setState: Dispatch<() => IStateInput<string>>,
    ref: RefObject<HTMLDivElement>,
    callbacks: IcallbacksNew,
) => {
    input.onChange(setState);
    const onListSelect = input._onSelect;
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

const changeCallbacksNew = (input: IInputList, callbacks: IcallbacksNew, setModalType:Function) => {
    const onSelectNew = (item: IItem) => {
        if (item.type === ItemType.WEIGHT) {
            callbacks.addItem({ item });
            return;
        } else {
            setModalType()
        callbacks.setSelectedItem(item);}
    }
    input.onSelect(onSelectNew);
}

const useSearch = (callbacks: Props['callbacks']) => {
    const [input] = useState(() => new InputList());
    const [{ isFocus, value, valueHTML }, setState] = useState(input.getStateObject);
    const ref = useRef(null);
    const callbacksNew = useContext(MainContext);
    const {setModalContent} = useContext(ModalContext);

    const [{
        attachInput, refreshInput, onListSelect,
    }] = useState(() => changeState(input, setState, ref, callbacksNew));
    const ModalType = () => setModalContent (<ModalQtyGoods modalClose={()=>setModalContent(null)}/>)
    
    useEffect(() => {
        changeCallbacksNew(input, callbacksNew, ModalType);
        input.setValue('');
    }, [input, callbacksNew]);
    useEffect(() => refreshInput(valueHTML), [refreshInput, valueHTML]);
    useEffect(attachInput, [attachInput]);

    return { isFocus, value, ref, onListSelect };
};

export default useSearch;
