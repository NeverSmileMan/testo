import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/List';
// import { IItem } from '../data/Item';
import { IItem } from '../data/items';
import useList from '../hooks/List';

type Props = {
    filter: string;
    onSelect: (item: IItem) => void;
} & WithStyles;

function List({ classes, filter, onSelect }: Props) {
    const { itemsArray, setFilter, onItemSelect } = useList(onSelect);
    useEffect(() => setFilter(filter), [setFilter, filter]);

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) =>
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={classes.list} onClick={onItemSelect}>
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

/*
function List({ input }: { input: string }) {
    const classes = useStyles();
    const [{ filter, data = null }, setState] = useState({ filter: input } as { filter: string, data: IItem[] | null });
    const { addItem, setType, setSelectedItem } = useContext(MainContext);
  
    useEffect(() => {
      if (!input) {
        setState(() => ({ filter: '', data: null }));
        return;
      }
      if (input === filter) return;
      const data = itemsData.filter(item => item.name.toUpperCase().includes(input.toUpperCase()));
      setState(() => ({ filter: input, data }));
    }, [input]);
  
    if (!data) return null;
    const onClickItemList = (item:IItem) => {
      if (item.type==='ваговий') {
        addItem({item:item})
      } else {
        setType('qtyGoods')();
        setSelectedItem(item)
      }
    }
    const items = data.map((item, i) =>
      <li
        key={i}
        data-item-index={i}
        onClick={() => onClickItemList(item) }
      > {/****** плохАААААААААА!!! *****//*}
        <span>{item.code}</span>
        <span>{item.name}</span>
      </li>
    );
    return (
      <div className={classes.list}>
        {items.length
          ? <ul>{items}</ul>
          : <div className='not-found'>НІЧОГО НЕ ЗНАЙДЕНО</div>
        }
      </div>
    );
  }
  
  export default List;
  */