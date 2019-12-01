# Read me

_This document is a work in progress._

## node and npm

- [node](https://nodejs.org/en/)
  - tested with the latest LTS : 12.13.1 and npm 6.12.1
  - should work with previous LTS : 10.16.3 and npm 6.9.0

## installation

### installation des dépendances

`npm install`

### safe install

`npm ci install`

### install for production

`npm install --production`

## tests unitaires

`npm run test:unit`

## tests intégration (call webservices)

`npm run test:int`

## build server (in directory ./dist)

`npm run build`

## clean (remove directory ./dist)

`npm run clean:dist`

## configure server (in directory ./config)

configure appropriate json file aka production.json located in config folder

- Default logging level : "debug"
- Default listening port: "3600"

default configuration is 

`
    {
        "exposedApiEndpoint": "/",
        "log": { "level": "debug" },
        "port": 3600,
        "services": {
            "eurosport": {
            "url": "https://eurosportdigital.github.io"
            }
        }
    }
`

## starts server (assuming build)

`npm start`

result
    - dist
    - config
    - package.json
    - package-lock.json

## starts server (dev)

Clean:dist, build and starts server

`npm run dev`

## tests bdd (Behavior Driven Development / cucumber )
    note:  SERVER_URL and ENDPOINT shoumld match the deployed configuration        
        "SERVER_URL": "http://localhost:3600",
        "ENDPOINT": "",

Results in console
`npm run test:bdd`

Results in html
`npm run test:bdd:html`
