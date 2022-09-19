const {data: countries} = require('../../data');

/*
  Get all countries from given data file
 */
const getAll = () => countries;

module.exports = {
    getAll
};
