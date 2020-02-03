import { shape, bool, func, string,isRequired } from 'prop-types';

/** The prop types definition for the widget channel list */
export const widgetPicsumType = {
    value: shape({
        size: string,
        useGreyScale: bool,
        imageId: string,
        useBlur: bool,
        blur: string
    }),
};

export const widgetPicsumSettingsType = {
    exportProp: func.isRequired,
    properties: shape({
        size: string,
        useGreyScale: bool,
        imageId: string,
        useBlur: bool,
        blur: string
    }),
};

export const widgetPicsumGlobalSettingsType = {
    properties: shape({
        baseUrl: string,
    }),
};

