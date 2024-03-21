import React from 'react'

const ErrorMessage = ({ children }) => {
    return (
        <div
            className='error-message'
            style={{
                width: '100%',
                padding: 10,
                fontSize: '1.5rem',
                marginBottom: 10,
                borderRadius: 4,
                backgroundColor: 'crimson',
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