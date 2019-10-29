import * as Babel from '@babel/standalone';
import fs from 'fs';
import path from 'path';
import Terser from 'terser';

import cfg from './config.json';

const allowedExtension = cfg.allowedExtensions;

const hasValidExtension = (file) => {
    for (const ext of allowedExtension) {
        if (file.substr(file.length - ext.length) === ext) {
            return true;
        }
    }

    return false;
};

const changeFileExtension = (file, newExt) => {
    return file.substring(0, file.lastIndexOf('.')) + newExt;
};

const argv = require('minimist')(process.argv.slice(2));

if (argv.verbose) {
    cfg.verbose = argv.verbose === true;
}

if (argv['skip-compression']) {
    cfg.compress = true;
} else {
    cfg.compress = false;
}

const directoryPath = path.join(__dirname, cfg.inputDir);
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log(`Error ${err}`);
    }

    files.forEach((file) => {
        if (!hasValidExtension(file)) {
            return;
        }

        const fc = fs.readFileSync(path.join(directoryPath, file), 'utf8');

        let _transformedCode = Babel.transform(fc, {
            presets: ['react', 'es2015'],
        }).code;

        if (cfg.compress) {
            _transformedCode = Terser.minify(_transformedCode).code;
        }

        const toFileName = changeFileExtension(file, cfg.outputExt || '.out');

        fs.writeFile(path.join(__dirname, cfg.outputDir, toFileName), _transformedCode, (writeErr) => {
            if (writeErr) {
                throw writeErr;
            }
        });

        cfg.verbose && console.log(`${file} to ${toFileName} ✅`);
    });
});
