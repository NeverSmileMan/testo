import {
    useState, useRef, useEffect, useContext,
    SetStateAction, Dispatch, RefObject,
} from 'react';
import { ActiveInputService } from '../../../services/ActiveInputService';
import { MainContext } from '../../../main';
import { IItem } from '../objects/items';
import { getStateInput, IStateInput, getMethodsInput } from '../objects/InputNew';

interface ICallbacksNew {
    addItem: (item: any) => boolean;
    setType: (val: string | null) => any;
    setSelectedItem: Dispatch<SetStateAction<IItem>>;
}

const createMethods = (
    setState: Dispatch<(state: IStateInput) => IStateInput>,
    ref: RefObject<HTMLDivElement>,
) => {

    const methods = getMethodsInput(setState);

    const setNewValue = (getNewValue: SetStateAction<string>) => setState(state => {
        if (typeof getNewValue === 'function')
            return { ...state, value: getNewValue(state.value) };
        return state;
    });

    const attachInput = () => {
        ActiveInputService.setActive(setNewValue);
        return () => ActiveInputService.unsetActive(setNewValue);
    };

    const refreshInput = (valueHTML: string) => {
        if (ref.current) ref.current.innerHTML = valueHTML;
    };
    
    return { ...methods, attachInput, refreshInput };
}

const getNewOnSelect = (callbacksNew: ICallbacksNew) => (item: IItem) => {
        if (item.type === 'ваговий') {
            callbacksNew.addItem({ item });
            return;
        }
        callbacksNew.setType('qtyGoods')();
        callbacksNew.setSelectedItem(item);
    };

const useSearch = () => {
    const [state, setState] = useState<IStateInput>(getStateInput);
    const ref = useRef(null);
    const callbacksNew = useContext(MainContext);

    const [{
        attachInput, refreshInput,
        getValueHTML, setValue, onSelect, _onSelect,
    }] = useState(() => createMethods(setState, ref));

    useEffect(() => {
        onSelect(getNewOnSelect(callbacksNew));
        setValue('');
    }, [callbacksNew]);
    useEffect(() => refreshInput(getValueHTML(state)), [refreshInput, state]);
    useEffect(attachInput, [attachInput]);
    return { ...state, ref, onListSelect: _onSelect };
};

export default useSearch;
