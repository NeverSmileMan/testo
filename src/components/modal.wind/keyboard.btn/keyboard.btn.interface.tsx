import React from 'react';

export interface StyleProp {
    borderColor?: string;
    colorBtn?: string;
    textColor?: string;
}

export interface Prop extends StyleProp {
    nameClass?: string | undefined;
    onClick: ()=>void;
}