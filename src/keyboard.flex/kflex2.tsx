import React, { useContext } from 'react';
import { LayoutContext } from './keyboard.flex';
import Button from './button';
import { makeStyles } from '@material-ui/styles';

const arr_EN = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['z','x','c','v','b','n','m',' ']];
const arr_RU = [['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],['ф','ы','в','а','п','р','о','л','д','ж','э','ё'],['я','ч','с','м','и','т','ь','б','ю',' ']];
const arr_UK = [['й','ц','у','к','е','н','г','ш','щ','з','х','ї'],['ф','і','в','а','п','р','о','л','д','ж','є','ґ'],['я','ч','с','м','и','т','ь','б','ю',' ']];

const alphabet = {
	keys: {
		en: arr_EN,
		ru: arr_RU,
		uk: arr_UK,
	},
	action: 'add',
};

  const useStyles = makeStyles({
    keyboardAlphabet: {
      // justifyContent: 'space-around', //
      // alignContent:'space-around', //
		display: 'flex',
    flexDirection: 'column',
		height: '100%',
    width: '100%',
    boxSizing: 'border-box',
  },
  row: {
		display: 'flex',
    flexGrow: 1,
    // marginTop: '0.2em',
    // marginBottom: '0.2em',
    boxSizing: 'border-box',


  },
  spacer: {
    margin: '0.2em',
  },
  offset: {
    width: '30%',
  },
  space: {
    width: '300%',
  },
	alphabetBtn: {

		// display: 'flex',
		// boxSizing: 'border-box',
		// flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // alignContent:'space-around',

    // width: '95%',
  },
});

export default function Kflex2({ opts, service }: any) {
	const layout = useContext(LayoutContext);

  const classes = useStyles();

console.log(alphabet);
console.log(alphabet.keys);
console.log(layout.name);

	return (
		<div className={classes.keyboardAlphabet}>
			{alphabet.keys[layout.name].map((item, i) => {
				return (
          <>
            <div key={`${i}x`} className={classes.row}>
              {(i%2) ?<div key={`${i}i`} className={classes.offset}></div> : null}
              {item.map((item, index) => (
                <Button
                  key={index}
                  value={item}
                  callback={service[opts.action]}
                  className={classes.alphabetBtn + ' ' + (item === ' ' ? classes.space : '')}
                />
              ))}
            {!(i%2) ?<div key={`${i}o`} className={classes.offset}></div> : null}
            </div>
            {(i < (alphabet.keys[layout.name].length - 1)) ?<div key={`${i}z`} className={classes.spacer}></div> : null}
          </>
				);
			})}
		</div>
	);
}
