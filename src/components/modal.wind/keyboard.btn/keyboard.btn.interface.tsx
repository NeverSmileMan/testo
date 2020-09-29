import React from 'react';

export interface StyleProp {
    borderColor?: string;
    colorBtn?: string;
    textColor?: string;
}

export interface Prop extends StyleProp {
    // btnName?: JSX.Element;
    nameClass?: string | undefined;
    onClick: ()=>void;
    // children: React.ReactNode
}