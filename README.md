# Javascript developer test

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fonimus_cdp-recruitment-javascript&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fonimus_cdp-recruitment-javascript)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fonimus_cdp-recruitment-javascript&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fonimus_cdp-recruitment-javascript)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=fonimus_cdp-recruitment-javascript&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=fonimus_cdp-recruitment-javascript)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fonimus_cdp-recruitment-javascript&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fonimus_cdp-recruitment-javascript)

> [sonar](https://sonarcloud.io/project/overview?id=fonimus_cdp-recruitment-javascript)
> / [jest coverage report](https://fonimus.github.io/cdp-recruitment-javascript/)

## Installation

````
yarn 
# or
npm install
````

## Test

````
yarn test
# or
npm run test
````

## Filter

Your job is to write a command-line interface in Node.js.
This program has to filter a list of elements containing a pattern.

Details:

- In the following file `country.js`, there are `Countries` containing `Peoples` containing `Animals`.
- Only animals containing `ry` are displayed. The order should be kept intact.
- Empty array after filtering are NOT returned.

Sample of running the command, and its output:

```shell script
$ node app.js --filter=ry
[
  {
    name: 'Uzuzozne',
    people: [
      {
        name: 'Lillie Abbott',
        animals: [
          {
            name: 'John Dory'
          }
        ]
      }
    ]
  },
  {
    name: 'Satanwi',
    people: [
      {
        name: 'Anthony Bruno',
        animals: [
          {
            name: 'Oryx'
          }
        ]
      }
    ]
  }
]
```

## Count

The next goal is to print the counts of People and Animals by counting the number of children and appending it in the
name, eg. `Satanwi [2]`.

Sample of running the command, and its output:

```shell script
node app.js --count
[ { name: 'Dillauti [5]',
    people:
     [ { name: 'Winifred Graham [6]',
         animals:
          [ { name: 'Anoa' },
            { name: 'Duck' },
            { name: 'Narwhal' },
            { name: 'Badger' },
            { name: 'Cobra' },
            { name: 'Crow' } ] },
       { name: 'Blanche Viciani [8]',
         animals:
          [ { name: 'Barbet' },
            { name: 'Rhea' },
            { name: 'Snakes' },
            { name: 'Antelope' },
            { name: 'Echidna' },
            { name: 'Crow' },
            { name: 'Guinea Fowl' },
            { name: 'Deer Mouse' } ] },
      ...
...
]
```

## Requirements

- The code must be available in a GIT repository
- No library/modules should be used, except for the testing library

## Appreciation

We will be really attentive to:

- Code readability, structure and consistency
- Tests, and how they are written
