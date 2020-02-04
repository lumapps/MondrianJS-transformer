import { shape, bool, func, string } from 'prop-types';

/** The prop types definition for the widget channel list */
const widgetPicsumType = {
    value: shape({
        blur: string,
        imageId: string,
        size: string,
        useBlur: bool,
        useGreyScale: bool,
    }),
};

const widgetPicsumSettingsType = {
    exportProp: func.isRequired,
    properties: shape({
        blur: string,
        imageId: string,
        size: string,
        useBlur: bool,
        useGreyScale: bool,
    }),
};

export { widgetPicsumType, widgetPicsumSettingsType };
