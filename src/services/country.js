const countryRepository = require('../repositories/country')

/*
 Filter given data by animal name and return only matching country/people
 */
const filterByAnimalName = (str) => {
    // filter by must not be null or empty
    if (!str || typeof (str) !== 'string') {
        throw new Error('Filter must be a non empty string');
    }
    const countries = countryRepository.getAll();
    return countries.filter((country) => {
        country.people = country.people.filter((person) => {
            // set animals to include only the one that match given filter
            person.animals = person.animals.filter((animal) => animal.name.includes(str));
            // if no results in animals do not keep this person
            return !!person.animals.length
        });
        // if no results in people do not keep this country
        return !!country.people.length
    });
};

/*
 For each country add number of people in name, and for each people add number of animals in name
 */
const getWithCount = () => {
    const result = countryRepository.getAll();
    // loop on every country to add number of people
    result.forEach((country) => {
        country.name = `${country.name} [${country.people.length}]`;
        // loop on every person to add number of animals
        country.people.forEach((person) => {
            person.name = `${person.name} [${person.animals.length}]`;
        });
    });
    return result;
};

module.exports = {
    getWithCount,
    filterByAnimalName
};
