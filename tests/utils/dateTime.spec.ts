import { expect } from 'chai';
import 'mocha';
import { GetDateOfFirstDayOfCurrentMonth } from '../../src/utils/dateTime'

describe('DateTime Test Suite', () => {
    describe('Get Date Of First Day Of Current Month function', () => {
        it('Given the current date, when the function is called, then it should return current year - month - 1st', () => {
            const date = new Date();
            const expected = `${date.getFullYear()}-0${date.getMonth() + 1}-01`;
            const result = GetDateOfFirstDayOfCurrentMonth();
            expect(result).to.equal(expected);
        })
    })
})