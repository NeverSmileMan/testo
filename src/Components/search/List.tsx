import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/List';
import Input from '../../data.structure/Input';

const list = Input.getInputListInstance().getListInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && list.selectItem(+itemIndex);
}

let setState: React.Dispatch<{}>;
const changeState = () => {
    list.onChange(
        () => setState({})
    );
    return {};
};

function List({ classes }: WithStyles) {

    [, setState] = useState(changeState);

    const itemsArray = list.getItems();

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) => 
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={classes.list} onClick={onClick}>
            {items.length?
                <ul>
                    {items}
                </ul> :
                <div className='not-found'>
                    ЗБІГИ ВІДСУТНІ
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(List);
