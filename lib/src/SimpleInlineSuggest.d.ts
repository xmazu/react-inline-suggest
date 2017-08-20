/// <reference types="react" />
import * as React from 'react';
import { ReactElement } from 'react';
export declare namespace SimpleInlineSuggest {
    type Props = {
        value: string;
        haystack: any[];
        onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
        getFn?: (obj: any) => string;
        onMatch?: (v: string | any) => void;
        ignoreCase?: boolean;
    };
    type State = {
        match: string | any;
        needle: string;
    };
}
export declare class SimpleInlineSuggest extends React.Component<SimpleInlineSuggest.Props, SimpleInlineSuggest.State> {
    static readonly TAB_KEY: number;
    static readonly ENTER_KEY: number;
    static defaultProps: {
        ignoreCase: boolean;
    };
    constructor(props: SimpleInlineSuggest.Props);
    render(): ReactElement<any>;
    private fireOnChange;
    private handleOnChange;
    private handleOnBlur;
    private handleOnKeyDown;
    private handleOnKeyUp;
}
