import React from 'react'

export const NoFound = ({message}) => {
    return (
        <div className='w-100 text-center'>
            <p className='text-error'>
            Error 404
            </p>
            <p className='message-error'>
            {message}
            </p>
        </div>
    )
}
