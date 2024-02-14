import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

export default function AuthError() {
    const {error} = useSelector(state => state.auth)

    const errorMessage = useCallback(() => {
        return Object.keys(error).map(name => {
            const msg = error[name].join('')
            return msg
        })
    }, [error])


  return error !== null && errorMessage().map(error => (
    <div className='auth-error-message'>{error} </div>
  ))
}
