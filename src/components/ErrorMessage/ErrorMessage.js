import React from 'react'

const ErrorMessage = ({ children }) => {
    return (
        <div
            style={{
                width: '100%',
                padding: 10,
                marginBottom: 10,
                borderRadius: 4,
                backgroundColor: '#667cff',
                textAlign: 'center',
                color: 'white',
                fontWeight: 300,
            }}
        >
            {children}
        </div>
    )

}

export default ErrorMessage