/// <reference types="react" />
import * as React from 'react';
import { ReactElement } from 'react';
export declare namespace InlineSuggest {
    type Props = React.HTMLProps<HTMLInputElement> & {
        value: string;
        haystack: any[];
        onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
        getFn?: (obj: any) => string;
        onMatch?: (v: string | any) => void;
        ignoreCase?: boolean;
        shouldRenderSuggestion?: (value: string | any) => boolean;
        switchBetweenSuggestions?: boolean;
    };
    type State = {
        matchedArray: any[];
        needle: string;
        activeIndex: number;
    };
}
export declare class InlineSuggest extends React.Component<InlineSuggest.Props, InlineSuggest.State> {
    static defaultProps: InlineSuggest.Props;
    constructor(props: InlineSuggest.Props);
    render(): ReactElement<any>;
    private renderSuggestion();
    private fireOnChange;
    private handleOnChange;
    private handleOnBlur;
    private handleOnKeyDown;
    private handleOnKeyUp;
    private setNewActiveIndex;
}
