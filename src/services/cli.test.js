const cliService = require('./cli');
const countryService = require('./country');

jest.mock('./country');

console.info = jest.fn();

let data;
let result = [{name: 'result'}];

beforeEach(() => {
    data = [{name: 'value'}]
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Process function', () => {

    describe('With filter option', () => {
        it('Should call service with right function and arguments', () => {
            countryService.filterByAnimalName.mockReturnValue(result)

            cliService.process(['--filter=ry']);

            expect(countryService.filterByAnimalName).toBeCalledTimes(1);
            expect(countryService.filterByAnimalName).toBeCalledWith('ry');
            expect(console.info).toBeCalledTimes(1);
            expect(console.info).toBeCalledWith(JSON.stringify(result, undefined, 2));
        });
    });

    describe('With count option', () => {

        it.each(
            [undefined, []],
        )('%#) Call with (%j) should not call console info', (returnValue) => {
            countryService.getWithCount.mockReturnValue(returnValue)

            cliService.process(['--count']);

            expect(countryService.getWithCount).toBeCalledTimes(1);
            expect(countryService.getWithCount).toBeCalledWith();
            expect(console.info).toBeCalledTimes(0);
        });

        it('Should returns', () => {
            countryService.getWithCount.mockReturnValue(result)

            cliService.process(['--count']);

            expect(countryService.getWithCount).toBeCalledTimes(1);
            expect(countryService.getWithCount).toBeCalledWith();
            expect(console.info).toBeCalledTimes(1);
            expect(console.info).toBeCalledWith(JSON.stringify(result, undefined, 2));
        });
    });
});

describe('Error cases', () => {

    it('Should throw error when no arguments', () => {
        expect(() => cliService.process(undefined)).toThrow('One option only is expected');
    });

    it('Should throw error when not an array argument', () => {
        expect(() => cliService.process('not an array')).toThrow('One option only is expected');
    });

    it('Should throw error when empty array argument', () => {
        expect(() => cliService.process([])).toThrow('One option only is expected');
    });

    it('Should throw error when array of length 2 argument', () => {
        expect(() => cliService.process(['1', '2'])).toThrow('One option only is expected');
    });

    it('Should throw error when argument not matching option regex', () => {
        expect(() => cliService.process(['not-an-option'])).toThrow('Invalid option not-an-option. Option should match --optionName or --optionName=optionValue');
    });

    it('Should throw error when unknown option', () => {
        expect(() => cliService.process(['--unknown-option'])).toThrow('Unknown option \'--unknown-option\'');
    });
});

describe('Usage function', () => {
    it('Should print in console', () => {
        cliService.usage()

        expect(console.info).toBeCalledTimes(3);
        expect(console.info).toBeCalledWith('Usage :');
    });
});
