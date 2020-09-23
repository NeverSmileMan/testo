export interface StyleProp {
    borderColor?: string;
    colorBtn?: string;
    textColor?: string;
}

export interface Prop extends StyleProp {
    btnName?: string | any;
    nameClass?: string | undefined;
    onClick: ()=>any;
}