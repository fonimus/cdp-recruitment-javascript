const cliService = require('./src/services/cli');

const main = () => {
    try {
        // process arguments and exit
        cliService.process(process.argv.slice(2));
        process.exit(0);
    } catch (e) {
        // in case of error, log and print usage
        console.error('Error :', e.message);
        cliService.usage();
        process.exit(1);
    }
};

if (require.main === module) {
    main();
}

module.exports = {
    main,
};
