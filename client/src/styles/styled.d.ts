import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        mainBackground: string;
        title: string;
        primaryText: string;
        secondaryText: string;
        disable: string;
        border: string;
        divider: string;
        background: string;
    }
    export interface Cell {
        index : number;
        isBee : boolean;
        neighbor : number;
        isOpen : boolean;
        isFlagged : boolean;
        isQuestion : boolean;
        top : number;
        left : number;
        leftClick : (index:number) => void;
        rightClick : (index:number) => void;
    }

}