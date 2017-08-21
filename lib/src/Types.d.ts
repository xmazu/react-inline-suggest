/// <reference types="react" />
export declare namespace SuggestType {
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
