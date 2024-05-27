import { expect } from 'chai';
import 'mocha';
import { GetDateOfFirstDayOfCurrentMonth } from '../../src/utils/dateTime'

describe('DateTime Test Suite', () => {
    describe('Get Date Of First Day Of Current Month function', () => {
        it('Given the current month is May 2024, when the function is called, then it should return 2024-05-01', () => {
            const expected = '2024-05-01';
            const result = GetDateOfFirstDayOfCurrentMonth();
            expect(result).to.equal(expected);
        })
    })
})