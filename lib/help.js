var figlet = require('figlet');
var chalk = require('chalk');

module.exports = function () {
    var title = figlet.textSync('SysAdmin-Tools', { horizontalLayout: 'full' });
    console.log(chalk`{yellow ${title}}`);
}