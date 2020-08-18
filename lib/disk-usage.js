require('console.table');
var chalk = require('chalk');
const CLIProgress = require('cli-progress');
const progressBar = new CLIProgress.Bar({}, CLIProgress.Presets.shades_classic);
const ora = require('ora');

var path = require('path');
var fs = require('fs');
var fsutils = require('nodejs-fs-utils');
var fsutilsOpions = { symbolicLinks: false, skipErrors: true };


module.exports = {
    executor: (folder, options = { order: 'name' }) => {
        const spinner = ora({
            text: "Preparing folders...",
            spinner: "line"
        }).start();
        var folder = options.folder || folder;
        var filesStat = [];

        var folderSize = fsutils.fsizeSync(folder, fsutilsOpions);
        var files = fs.readdirSync(folder);
        spinner.succeed("Folders loaded...");
        spinner.stop();
        console.log(chalk`{white ${folder}}`, chalk`{yellow ${ConvertSize(folderSize)}}`);

        progressBar.start(1, 0);
        for (let index = 0; index < files.length; index++) {
            let element = { name: "", type: "", size: "", percent: "" };
            var filename = files[index];

            var filesize = fsutils.fsizeSync(path.join(folder, filename), fsutilsOpions);
            element = {
                "name": chalk`{white ${filename}}`,
                "size": chalk`{yellow ${ConvertSize(filesize)}}`,
                "percent": chalk`{cyan ${Percent(folderSize, filesize)} %}`
            };
            progressBar.update((1 / files.length) * (index + 1));
            filesStat.push(element);
        }
        progressBar.stop();

        if (options.order === 'size') {
            filesStat.sort(function (a, b) {
                if (a.percent < b.percent) {
                    return true;
                }
                return false;
            });
        }

        console.table(filesStat);
    }
}

function ConvertSize(bytes) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
}

function Percent(total, partial) {
    var percent = ((partial / total) * 100).toFixed(2);
    return percent;
}