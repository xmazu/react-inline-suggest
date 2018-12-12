import { GetSuggestionValueFn } from './types';

export function filterSuggestions<T>(
  value: string,
  suggestions: T[],
  ignoreCase: boolean,
  getSuggestionValue?: GetSuggestionValueFn<T>
) {
  if (!value) {
    return [];
  }

  const rx = RegExp(`^${value}`, ignoreCase ? 'i' : undefined);
  return suggestions.filter(suggestion =>
    getSuggestionValue
      ? rx.test(getSuggestionValue(suggestion))
      : rx.test(String(suggestion))
  );
}

export function getNeedleFromString(text: string, current: string) {
  return text.replace(text.substr(0, current.length), '');
}

export function getNextSafeIndexFromArray<T>(array: T[], current: number) {
  return current + 1 > array.length - 1 ? 0 : current + 1;
}

export function getPreviousSafeIndexFromArray<T>(array: T[], current: number) {
  return current - 1 < 0 ? array.length - 1 : current - 1;
}
