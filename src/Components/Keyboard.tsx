import React, { useState } from 'react';
import KeyboardObject from '../data.structure/Keyboard';
import KeyboardLayoutUA from './KeyboardLayoutUA';
import KeyboardLayoutEN from './KeyboardLayoutEN';
import KeyboardLayoutNUMS from './KeyboardLayoutNUMS';
import KeyboardLayoutFUNC from './KeyboardLayoutFUNC';
import { IDifferentKeys } from './KeyboardLayoutStyles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'keyboard': {
        display: 'flex',
        padding: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '1.5rem',
        '& .letters': {
            width: '60%',
            display: 'flex',
            marginRight: '2%',
        },
        '& .nums': {
            flex: '1 0 0',
            display: 'flex',
            marginRight: '3%',
        },
        '& .func': {
            width: '7%',
            display: 'flex',
        },
    },
});

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    let keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

const getLangHandler = (setLang: React.Dispatch<(lang: string) => string>) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
        
        const target = event.target as HTMLDivElement;
        const currentLang = target.dataset['nextLang'];
        if (currentLang) {
            setLang(() => currentLang);
            console.log(currentLang);
            const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
            console.log(nextLang);
            //target.innerHTML = nextLang;
            target.setAttribute('data-next-lang', nextLang);
            console.log('TEST');
        }
};

const getDiffKeys = (setLang: React.Dispatch<(lang: string) => string>) => {
    const differentKeys: IDifferentKeys = {
        'LANG': {
            width: 1,
            text: 'EN',
            attr: { onClick: getLangHandler(setLang), 'data-next-lang': 'EN', 'data-key': '', },
        },
    }
    return differentKeys;
};


// const getLangHandler = (setLang: React.Dispatch<(lang: string) => string>) =>
//     (event: React.MouseEvent<HTMLDivElement>) => {
//         const target = event.target as HTMLElement;
//         let keyElem: HTMLElement | null = target.closest('[data-key]');
//         if (!keyElem) {
//             keyElem = target.closest('[data-next-lang]');
//             if (!keyElem) return;
//             const currentLang = target.dataset['nextLang'];
//             if (currentLang) {
//                 setLang(() => currentLang);
//                 const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
//                 target.innerHTML = nextLang;
//                 target.setAttribute('data-next-lang', nextLang);
//             }
//             return;
//         }
//         const key = keyElem.dataset['key'];
//         key && keyboard.onClick(key);
// };

function Keyboard() {
    const classes = useStyles();
    const [lang, setLang] = useState('UA');
    //const [changeLang] = useState(() => getLangHandler1(setLang));

    //const nextLang = lang === 'UA' ? 'EN' : 'UA';
 
    const [diffKeys] = useState(() => {

        const differentKeys: IDifferentKeys = {
            'LANG': {
                width: 1,
                text: 'EN',
                attr: { onClick: getLangHandler(setLang), 'data-next-lang': 'EN', 'data-key': '', },
            },
        }
        return differentKeys;
    });

    return (
        <div className={`${classes.keyboard} keyboard`} onClick={onClick}>
            {/* <div className='title'>KEYBOARD</div> */}
            <div className='letters'>
                {lang === 'UA' && <KeyboardLayoutUA />}
                {lang === 'EN' && <KeyboardLayoutEN />}
            </div>
            <div className='nums'>
                <KeyboardLayoutNUMS />
            </div>
            <div className='func'>
                <KeyboardLayoutFUNC diffKeys={diffKeys}/>
            </div>
            {/* <div className='key'
                onClick={changeLang}
                data-next-lang={nextLang}>
                {nextLang}
            </div> */}
        </div>
    );
}

export default Keyboard;
