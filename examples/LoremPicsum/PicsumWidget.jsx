import React, { useEffect, useState } from 'react';
import { Notification, NotificationType } from '@lumx/react';
import Lumapps from 'lumapps';

import './PicsumWidget.css';

/**
 * Display random image from the Picsum API.
 *
 * @param {Object} value The different settings to apply to the displayed image.
 */
const PicsumWidget = ({ value }) => {
    const [url, setUrl] = useState();
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const { blur, imageId, size, useBlur, useGreyScale } = value;

    useEffect(() => {
        const lumapps = new Lumapps();
        lumapps.getConnectedUser().then((user) => {
            setUser(user);
        }).catch((err) => {
            console.log(err);
            setError(err);
        });

    }, [])

    useEffect(() => {
        let link = 'https://picsum.photos/';

        link = imageId && imageId !== '' ? `${link}id/${imageId}/${size}` : `${link}${size}`;
        link = useGreyScale ? `${link}?grayscale` : link;
        link = useBlur && useGreyScale ? `${link}&blur` : useBlur ? `${link}?blur` : link;
        link = useBlur && blur !== '' && blur !== undefined ? `${link}=${blur}` : link;

        setUrl(link);
    }, [blur, imageId, size, useBlur, useGreyScale, url]);

    return (
        <div className="widget-picsum">
            {!error && user && (
                <div className="widget-picsum__user widget-picsum-user">
                    <img className="widget-picsum-user__picture" src={user.apiProfile.profilePicture} />
                    <div className="widget-picsum-user__name">{user.fullName}</div>
                </div>
            )}
            {error && (
                <Notification
                    isOpen
                    type={NotificationType.error}
                    content="An error occurred while retrieving user"
                    actionLabel="Dismiss"
                    actionCallback={setError}
                />
            )}

            <img className="widget-picsum__image" src={url} alt="Alternative Text" />
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
