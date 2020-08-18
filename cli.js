#!/usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');

let du = require('./lib/disk-usage');
let help = require('./lib/help');

const cli = meow(`ddd`, {
    alias: {
        h: 'type'
    }
});

const { input, flags } = cli;
const service = input;

process.on('SIGINT', function () {
    console.warn(chalk`{orange ## Proceso Interrumpido por el Usuario ##}`);

    process.exit(0);
    // if (i_should_exit)
});

switch (service[0]) {
    case 'du':
        du.executor(__dirname, { ...flags });
        break;

    case 'about':
        break;

    case 'help':
        help();
        break;

    default:
        console.error(chalk`{red Mal Uso del Comando}`);
        help();
        break;
}