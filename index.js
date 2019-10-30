import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import { readFileSync } from 'jsonfile';
import rollupConfig from './rollup.config.js';

const config = readFileSync('./config.json')

const { allowedExtensions, compress, outputExt, outputDir, inputDir, verbose } = config;

/**
 * List all directories in source folder
 *
 * @param {string} sourceFolder
 */
const getDirectories = (sourceFolder) =>
    fs
        .readdirSync(sourceFolder, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

/**
 * Return whehter the file extension is allowed or not
 *
 * @param  {string}  file The file to check
 * @return {boolean} Whether the file extension is allowed or not
 */
const hasValidExtension = (file) => {
    for (const ext of allowedExtensions) {
        if (file.substr(file.length - ext.length) === ext) {
            return true;
        }
    }

    return false;
};

const directories = getDirectories(inputDir);

directories.forEach((directory) => {
    const directoryPath = path.join(__dirname, inputDir, directory);
    try {
        const extConfig = readFileSync(`${directoryPath}/extension.config.json`);
        const { extensionComponents } = extConfig;

        extensionComponents.forEach((component) => {
            const { file, componentName } = component;

            if (!hasValidExtension(file)) {
                throw 'Unauthorized extension';
            }

            const { plugins, output } = rollupConfig;
            const input = `${directoryPath}/${file}`;

            const inputOptions = {
                input,
                plugins,
            };

            const outputOptions = {
                file: path.join(__dirname, outputDir, `${componentName}${outputExt}`),
                format: output.format,
            };

            rollup(inputOptions).then((bundle) => {
                bundle.generate(outputOptions).then(() => {
                    bundle.write(outputOptions);
                });
            });
        });
    } catch (exception) {
        console.error(exception);
    }
});
