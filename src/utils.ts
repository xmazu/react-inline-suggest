import { GetSuggestionValueFn } from './types';

export interface SuggestionFilterOptions<T> {
  ignoreCase: boolean;
  getSuggestionValue?: GetSuggestionValueFn<T>;
}

export function filterSuggestions<T>(
  suggestions: T[],
  value: string,
  options: SuggestionFilterOptions<T>
) {
  const rx = RegExp(`^${value}`, options.ignoreCase ? 'i' : undefined);
  return suggestions.filter(suggestion =>
    options.getSuggestionValue
      ? rx.test(options.getSuggestionValue(suggestion))
      : rx.test(String(suggestion))
  );
}

export function getNeedleFromString(text: string, current: string) {
  return text.replace(text.substr(0, current.length), '');
}
