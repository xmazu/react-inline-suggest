export type ShouldRenderSugestionFn = (value: string) => boolean;

export type GetSuggestionValueFn<T> = (obj: T) => string;
