import React, { useState } from 'react';
import { Switch, TextField } from '@lumx/react';

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
const PicsumWidgetSettings = ({ properties, exportProp }) => {
    const [size, setSize] = useState(properties.size);
    const [imageId, setImageId] = useState(properties.imageId);
    const [useGreyScale, setUseGreyScale] = useState(properties.useGreyScale);
    const [useBlur, setUseBlur] = useState(properties.useBlur);
    const [blur, setBlur] = useState(properties.blur);

    const changeSizeHandler = (value) => {
        setSize(value);

        properties.size = value;

        if (exportProp) {
            exportProp(properties);
        }
    };

    const changeIdHandler = (value) => {
        setImageId(value);

        properties.imageId = value;

        if (exportProp) {
            exportProp(properties);
        }
    };

    const changeGreyScaleHandler = (value) => {
        setUseGreyScale(value);

        properties.useGreyScale = value;

        if (exportProp) {
            exportProp(properties);
        }
    };

    const changeUseBlurHandler = (value) => {
        setUseBlur(value);

        properties.useBlur = value;
        if (!value) {
            properties.blur = undefined;
        }

        if (exportProp) {
            exportProp(properties);
        }
    };

    const changeBlurHandler = (value) => {
        setBlur(value);

        properties.blur = value;

        if (exportProp) {
            exportProp(properties);
        }
    };

    return (
        <div>
            <TextField className="mt0 ml" label="Size" value={size} onChange={changeSizeHandler} />
            <TextField className="mt0 ml" label="Identifier" value={imageId} onChange={changeIdHandler} />
            <Switch className="mt+ ml" checked={useGreyScale} onToggle={changeGreyScaleHandler}>
                Display a grey scale image
            </Switch>

            <Switch className="mt+ ml" checked={useBlur} onToggle={changeUseBlurHandler}>
                Display a blurry image
            </Switch>

            {useBlur && <TextField className="mt0 ml" label="Blur value" value={blur} onChange={changeBlurHandler} />}
        </div>
    );
};

PicsumWidgetSettings.defaultProps = {
    value: {
        blur: undefined,
        imageId: undefined,
        size: '600',
        useBlur: false,
        useGreyScale: false,
    },
};

export { PicsumWidgetSettings };
