import React, { useState } from 'react';
import KeyboardObject from '../data.structure/Keyboard';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { KeyboardLayoutOptionsEN, KeyboardLayoutOptionsUA, KeyboardLayoutOptionsNUMS, KeyboardLayoutOptionsFUNC } from './KeyboardLayoutOptions';
import KeyboardLayout from './KeyboardLayout';

const useStyles = makeStyles((theme: Theme) => ({
    'keyboard': {
        display: 'flex',
        padding: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '1rem',
        '& .letters': {
            width: '60%',
            display: 'flex',
            marginRight: '2%',
        },
        '& .nums': {
            flex: '1 0 0',
            display: 'flex',
            marginRight: '1.8%',
        },
        '& .func': {
            width: '15%',
            display: 'flex',
        },
    },
}));

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
        if (!currentLang) return;
        setLang(() => currentLang);
        const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
        target.setAttribute('data-next-lang', nextLang);
};

const getDiffKeys = (setLang: React.Dispatch<(lang: string) => string>) => {
    return {
        'LANG': {
            content: 'EN',
            attr: {
                onClick: getLangHandler(setLang),
                'data-next-lang': 'EN',
            },
        },
    };
};

function Keyboard() {
    const classes = useStyles();
    const [lang, setLang] = useState('UA');
    const [diffKeys] = useState(() => getDiffKeys(setLang));

    const className = classes.keyboard + ' keyboard';
    return (
        <div className={className} onClick={onClick}>
            <div className='letters'>
                {lang === 'UA' && <KeyboardLayout options={KeyboardLayoutOptionsUA} />}
                {lang === 'EN' && <KeyboardLayout options={KeyboardLayoutOptionsEN} />}
            </div>
            <div className='nums'>
                <KeyboardLayout options={KeyboardLayoutOptionsNUMS} />
            </div>
            <div className='func'>
                <KeyboardLayout options={KeyboardLayoutOptionsFUNC} diffKeys={diffKeys}/>
            </div>
        </div>
    );
}

export default Keyboard;
