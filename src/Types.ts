export namespace SuggestType {
  export type Props = {
    value: string;
    haystack: any[];
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    getFn?: (obj: any) => string;
    onMatch?: (v: string | any) => void;
    ignoreCase?: boolean;
	};
	
  export type State = {
    match: string | any;
    needle: string;
  };
}
