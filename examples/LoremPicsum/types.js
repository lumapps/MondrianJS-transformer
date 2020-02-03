import { shape, bool, func, string } from 'prop-types';

/** The prop types definition for the widget channel list */
export const widgetPicsumType = {
    value: shape({
        blur: string,
        imageId: string,
        size: string,
        useBlur: bool,
        useGreyScale: bool,
    }),
};

export const widgetPicsumSettingsType = {
    exportProp: func.isRequired,
    properties: shape({
        blur: string,
        imageId: string,
        size: string,
        useBlur: bool,
        useGreyScale: bool,
    }),
};
