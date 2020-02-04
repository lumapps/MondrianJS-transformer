import React, { useEffect, useState } from 'react';
import { Lumapps } from 'lumapps-sdk-js';
import { Notification, NotificationType } from '@lumx/react';
import './PicsumWidget.css';

/**
 * Display random image from the Picsum API.
 *
 * @param {Object} value The different settings to apply to the displayed image.
 */
const PicsumWidget = ({ value, globalValue = {} }) => {
    const [url, setUrl] = useState();
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const { blur, imageId, size, useBlur, useGreyScale } = value;
    const { baseUrl = '' } = globalValue;

    useEffect(() => {
        const lumapps = new Lumapps();
        lumapps
            .getConnectedUser()
            .then((user) => {
                setUser(user);
            })

            .catch((exception) => {
                console.log(exception);
                setError(exception);
            });
    }, []);

    useEffect(() => {
        let link = baseUrl || 'https://picsum.photos/';

        link = imageId && imageId !== '' ? `${link}id/${imageId}/${size}` : `${link}${size}`;
        link = useGreyScale ? `${link}?grayscale` : link;
        link = useBlur && useGreyScale ? `${link}&blur` : useBlur ? `${link}?blur` : link;
        link = useBlur && blur !== '' && blur !== undefined ? `${link}=${blur}` : link;

        setUrl(link);
    }, [blur, imageId, size, useBlur, useGreyScale, url]);

    const getProfilePicture = (apiProfile) => {
        if (apiProfile.thumbnail && apiProfile.thumbnail.mimeType && apiProfile.thumbnail.photoData) {
            return `data:${apiProfile.thumbnail.mimeType};base64,${apiProfile.thumbnail.photoData
                .replace(/_/g, '/')
                .replace(/-/g, '+')}`;
        }

        return apiProfile.profilePicture;
    };

    return (
        <div className="widget-picsum">
            {!error && user && (
                <div className="widget-picsum__user widget-picsum-user">
                    <img className="widget-picsum-user__picture" src={getProfilePicture(user.apiProfile)} />
                    <div className="widget-picsum-user__name">{user.fullName}</div>
                </div>
            )}
            {error && (
                <Notification
                    type={NotificationType.error}
                    content="An error occured while retrieving user"
                    isOpen={true}
                    actionLabel="Dismiss"
                    actionCallback={setError}
                />
            )}

            <img className="widget-picsum__image" src={url} alt="Aternative Text" />
        </div>
    );
};

PicsumWidget.defaultProps = {
    value: {
        blur: undefined,
        imageId: undefined,
        size: '600',
        useBlur: false,
        useGreyScale: false,
    },
};

export { PicsumWidget };
