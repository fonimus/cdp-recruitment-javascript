const countryService = require('./country');
const countryRepository = require('../repositories/country');

jest.mock('../repositories/country');

const toFindPrefix = 'animal-to-find-'
const nbPeople = 3
const nbAnimals = 2

let data;
beforeEach(() => {
    data = [];
    for (let i = 0; i < 4; i++) {
        const people = [];
        for (let j = 0; j < nbPeople; j++) {
            const animals = [];
            for (let k = 0; k < nbAnimals; k++) {
                let name = 'animal-' + i + j + k;
                if (k === 0 && j % 2 === 0 && i % 3 === 0) {
                    name = toFindPrefix + i + j + k;
                }
                animals.push({name: name});
            }
            people.push({name: 'person-' + i + j, animals: animals})
        }
        data.push({name: 'country-' + i, people: people})
    }
});

describe('Filter by function', () => {

    it('Should return empty result with empty data', () => {
        countryRepository.getAll.mockReturnValue([])

        const result = countryService.filterByAnimalName('x');

        expect(result).toEqual([]);
    });


    it('Should return only one country, one person and one animal if filter matches single animal', () => {
        countryRepository.getAll.mockReturnValue(data)

        const result = countryService.filterByAnimalName('animal-001');

        expect(result).toEqual([{
            name: 'country-0', people: [{
                name: 'person-00', animals: [
                    {name: 'animal-001'}
                ]
            }]
        }]);
    });

    it('Should return only country and people with animal name matching filter', () => {
        countryRepository.getAll.mockReturnValue(data)

        const result = countryService.filterByAnimalName(toFindPrefix);

        const countryNames = result.map(c => c.name);
        // only country multiple of 3
        expect(countryNames).toStrictEqual(['country-0', 'country-3']);
        // only people multiple of 2 inside country multiple of 3
        const peopleNames = result.flatMap(c => c.people).map(p => p.name);
        expect(peopleNames).toStrictEqual(['person-00', 'person-02', 'person-30', 'person-32']);
        // only first animal of people multiple of 2 inside country multiple of 3
        const animalNames = result.flatMap(c => c.people).flatMap(p => p.animals).map(a => a.name);
        expect(animalNames).toStrictEqual([toFindPrefix + '000', toFindPrefix + '020', toFindPrefix + '300', toFindPrefix + '320']);
    });

    it('Should throw error with undefined filter', () => {
        expect(() => countryService.filterByAnimalName(undefined)).toThrow('Filter must be a non empty string');
    });

    it('Should throw error with empty filter', () => {
        expect(() => countryService.filterByAnimalName('')).toThrow('Filter must be a non empty string');
    });

});

describe('Add count function', () => {

    it('Should add how many people in country name and number of animals in person name with given data', () => {
        countryRepository.getAll.mockReturnValue(data)

        const result = countryService.getWithCount();

        expect(result).toHaveLength(data.length);
        const countryNames = result.map(c => c.name);
        expect(countryNames).toStrictEqual([
            'country-0 [' + nbPeople + ']',
            'country-1 [' + nbPeople + ']',
            'country-2 [' + nbPeople + ']',
            'country-3 [' + nbPeople + ']'
        ]);
        const peopleNames = result.flatMap(c => c.people).map(p => p.name);
        expect(peopleNames).toStrictEqual([
            'person-00 [' + nbAnimals + ']', 'person-01 [' + nbAnimals + ']', 'person-02 [' + nbAnimals + ']',
            'person-10 [' + nbAnimals + ']', 'person-11 [' + nbAnimals + ']', 'person-12 [' + nbAnimals + ']',
            'person-20 [' + nbAnimals + ']', 'person-21 [' + nbAnimals + ']', 'person-22 [' + nbAnimals + ']',
            'person-30 [' + nbAnimals + ']', 'person-31 [' + nbAnimals + ']', 'person-32 [' + nbAnimals + ']',
        ]);
    });
});
