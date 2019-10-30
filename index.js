import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import { readFileSync } from 'jsonfile';
import rollupConfig from './rollup.config.js';

const config = readFileSync('./config.json')

const { allowedExtensions, outputExt, outputDir, inputDir, verbose } = config;


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

/**
 * Generate the bundle.
 *
 * @param {object} inputOptions  The options used to define the input data.
 * @param {Object} outputOptions The options used to generate the bundle.
 */
const generateBundle = async (inputOptions, outputOptions) => {
    const bundle = await rollup(inputOptions);
    await bundle.generate(outputOptions);
    await bundle.write(outputOptions);
}

/**
 * Print the warning message generated when creating the bundle.
 *
 * @param {string} message The warning message.
 */
const printWarnMessage = (message) => {
    verbose && console.log(`[ROLLUP] ${message}`);
}


const directories = getDirectories(inputDir);
directories.forEach((directory) => {
    const directoryPath = path.join(__dirname, inputDir, directory);

    try {
        const extConfig = readFileSync(`${directoryPath}/extension.config.json`);
        const { extensionComponents } = extConfig;

        verbose && console.log(`Working on ${directory} extension ..........\u23F3`);

        extensionComponents.forEach((component) => {
            verbose && console.log(`    Loading ${component.file} [${component.componentName}] ..........\u23F3`);
            const { file, componentName } = component;

            if (!hasValidExtension(file)) {
                throw 'Unauthorized extension';
            }

            const { plugins, output } = rollupConfig;
            const input = `${directoryPath}/${file}`;

            const inputOptions = {
                input,
                plugins,
                onwarn: printWarnMessage,
            };

            const outputOptions = {
                file: path.join(__dirname, outputDir, directory, `${componentName}${outputExt}`),
                format: output.format,
            };

            generateBundle(inputOptions, outputOptions);
            verbose && console.log(`    ${component.file} successfully bundled ..........\u2705`);
        });
    } catch (exception) {
        console.error(exception);
    }

    verbose && console.log(`All done ..........\u23F3`);
});
