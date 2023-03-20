# TaxScouts code exercise

See [instructions for the task](https://taxscouts.notion.site/taxscouts/Practical-Task-Front-End-Engineer-0a3b77bbb3994ba18340d4cb41d0c80e)

## Instructions for running

### Prerequites
 - [NodeJS](https://nodejs.org/en)
 - install `yarn` globally ( or if not, use `npx yarn...`)

### Running
- cd into the project and run `yarn dev`
- open the app in your browser at the specified localhost + port

### Tests
- Written with React Testing Library.
- Run `yarn test`

## About the project
- written with typeScript
- scaffolded using Vite, the blazing fast transpiler/bundler
- Uses Redux as set out in the intructions, although so far only the `books` state is in redux
- Uses styled-components and grommet ( which I would use to build out the remianing components - results list, skeletonList etc)

## TODOs
- style the results list using grommet
- add a skeleton instead of 'loading' text
- add Amazon links to search results
- move the searchTerm state into redux
- use thunk to cancel action when the user changes the search term before the last result has come back ( at present if the user changes the text before the result has come back you will then see multiple changes in the UI, despite debouncing being used)
- use pagination for api calls
- add a cache layer for the api client (use the in-built redux-toolkit one - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)), in order to simplify redux code and to avoid unecessary api calls
