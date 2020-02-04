import React, { useState } from 'react';
import { TextField } from '@lumx/react';

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
const PicsumGlobalSettings = ({ properties, exportProp }) => {
    const [baseUrl, setBaseUrl] = useState(properties.baseUrl);

    const changeUrlHandler = (value) => {
        setBaseUrl(value);

        properties.baseUrl = value;

        if (exportProp) {
            exportProp(properties);
        }
    };

    return (
        <div>
            <TextField className="mt0 ml" label="Url" value={baseUrl} onChange={changeUrlHandler} />
        </div>
    );
};

PicsumGlobalSettings.defaultProps = {
    value: {
        baseUrl: 'https://picsum.photos/',
    },
};

export { PicsumGlobalSettings };
