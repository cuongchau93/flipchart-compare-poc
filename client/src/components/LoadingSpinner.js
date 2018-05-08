import React from 'react';
import FontAwesome from 'react-fontawesome';

const LoadingSpinner = () => (
    <div>
        <FontAwesome name='rocket' />Loading...
        <FontAwesome
            className='super-crazy-colors'
            name='rocket'
            size='2x'
            spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
    </div>
);

export default LoadingSpinner;