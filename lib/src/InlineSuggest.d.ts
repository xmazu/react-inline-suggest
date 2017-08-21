/// <reference types="react" />
import * as React from 'react';
import { ReactElement } from 'react';
import { SuggestType } from './Types';
export declare namespace InlineSuggest {
    type Props = React.HTMLProps<HTMLInputElement> & SuggestType.Props;
    type State = SuggestType.State;
}
export declare class InlineSuggest extends React.Component<InlineSuggest.Props, InlineSuggest.State> {
    static defaultProps: {
        ignoreCase: boolean;
    };
    constructor(props: InlineSuggest.Props);
    render(): ReactElement<any>;
    private fireOnChange;
    private handleOnChange;
    private handleOnBlur;
    private handleOnKeyDown;
    private handleOnKeyUp;
}
