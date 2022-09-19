const countryService = require('./country');

/*
  Print cli usage
 */
const usage = () => {
    console.info('Usage :');
    console.info('node app.js --filter=<string> : Filters data to display only animals that match given filter');
    console.info('node app.js --count           : Prints counts of people and animals next to the name');
};

/*
  Process given arguments
 */
const process = (args) => {
    if (!Array.isArray(args) || args?.length !== 1) {
        throw new Error('One option only is expected');
    }
    const arg = args[0];
    // parse first argument as --option or --option=value
    const regexp = /--([a-zA-Z\-]+)(=(.*))?/;
    const match = arg.match(regexp);
    if (!match) {
        throw new Error(`Invalid option ${arg}. Option should match --optionName or --optionName=optionValue`);
    }
    const optionName = match[1]
    const optionValue = match[3]
    let result;
    switch (optionName) {
        case 'filter':
            // filter countries by animal name
            result = countryService.filterByAnimalName(optionValue);
            break;
        case 'count':
            // add count of how many people by country and how many animals by people
            result = countryService.getWithCount();
            break;
        default:
            // unknown option, throw error
            throw new Error(`Unknown option '--${optionName}'`);
    }
    // if given argument is not null or empty, pretty print as json
    if (result && result.length > 0) {
        console.info(JSON.stringify(result, undefined, 2));
    }
};

module.exports = {
    process,
    usage
};
