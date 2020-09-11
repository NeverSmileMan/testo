import React from 'react';
import { IDifferentKeys, IKeyAttr } from './KeyboardStyles';
import { ISizeOfElements, toUnits } from '../../functions/keyboardFunc';

interface Props {
    keyboardSet: string[];
    differentKeys: IDifferentKeys;
    sizeOfElements: ISizeOfElements;
}

function KeyboardKeys({ keyboardSet, differentKeys, sizeOfElements }: Props): React.ReactElement[] {

    const keys = keyboardSet.map((key, i) => {

            const diffKey = differentKeys[key];
            let style = {};
            let attr: IKeyAttr = { 'data-key': key };
            let content: string | React.ReactElement = key;
             
            if (diffKey) {

                if (diffKey.width) {
                    const { keyWidth, keySpace } = sizeOfElements;
                    const width = Math.round(diffKey.width * (keyWidth + keySpace) - keySpace);
                    if (width) style = { width:  toUnits(width) };
                }
                
                attr = diffKey.attr || attr;
                content = diffKey.content || key;
            }

            return (
                <div
                    className='key'
                    key={i}
                    style={style}
                    {...attr}>
                    {content}
                </div>
            );
        }
    );

    return keys;
}

export default KeyboardKeys;
