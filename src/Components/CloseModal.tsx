import React from 'react';

function CloseModal() {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            zIndex: 9999,
            position: 'absolute',
            background: 'rgba(0, 0, 0, 0.5)',
            left: 0,
            top: 0,
        }}>
            CLOSE
        </div>
    );
}

export default CloseModal;
