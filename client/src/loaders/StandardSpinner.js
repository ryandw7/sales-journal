import styles from './StandardSpinner.css';
import React, { useState, useEffect } from 'react'
export default function StandardSpinner({ Elem, trigger }) {
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = () => {
        setIsLoading(true)
    };
    const stopLoading = () => {
        setIsLoading(false)
    }
    useEffect(() => {
        if (trigger === true) {
            startLoading()
        } else if (trigger === false) {
            stopLoading()
        }
    }, [])
    return (
        <div className={trigger ? 'loader' : 'stagnant'}>
            <Elem />
        </div>
    )
}