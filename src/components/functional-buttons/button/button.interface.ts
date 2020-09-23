export interface ButtonProp {
    nameButton: string;
    buttonIcon: () => any;
    click: ()=>any,
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
}