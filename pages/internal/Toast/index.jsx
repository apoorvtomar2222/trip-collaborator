import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import style from './toast.module.scss';

function Toast(props) {
    const { toggleToast, message } = props
    const [toast, showToast] = useState(false);
    useEffect(() => {
        showToast(true);
        setTimeout(() => {
            showToast(false);

        }, 2000)
    }, [message]);
    return (
        < >
            {toast &&
                <div className={style.toastWrapper}>{message}</div>
            }

        </>
    )
}

Toast.propTypes = {}

export default Toast
