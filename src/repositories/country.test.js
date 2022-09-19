const dataService = require('./country');
const {data} = require('../../data');

describe('Get all function', () => {
    it('Should return animals by name by country', () => {
        const result = dataService.getAll();

        expect(result).toEqual(data);
    });
});
