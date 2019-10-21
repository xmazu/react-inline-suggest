import {
	filterSuggestions,
	getNeedleFromString,
	getNextSafeIndexFromArray,
	getPreviousSafeIndexFromArray,
} from '../utils'

describe('Util tests', function() {
	test('filterSuggestions', function() {
		const result = filterSuggestions('test', ['testing', 'test1'], false)
		expect(result.length).toEqual(2)
	})

	test('getNeedleFromString', function() {
		expect(getNeedleFromString('testing', 'test')).toEqual('ing')
	})

	test('getNextSafeIndexFromArray', function() {
		expect(getNextSafeIndexFromArray(['testing'], 1)).toEqual(0)
		expect(getNextSafeIndexFromArray(['testing'], 0)).toEqual(0)
	})

	test('getPreviousSafeIndexFromArray', function() {
		expect(getPreviousSafeIndexFromArray(['testing'], 0)).toEqual(0)
		expect(getPreviousSafeIndexFromArray(['testing'], 1)).toEqual(0)
	})
})
