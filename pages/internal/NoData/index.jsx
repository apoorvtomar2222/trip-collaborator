import React from 'react'
import NoDataImg from '../../../assets/no-data.png';
import style from './noData.module.scss';

function NoData() {
    return (
        <div className={style.noData}>
            <img src={NoDataImg.src} alt="Logo" />
            <div>No Data</div>
        </div>
    )
}

export default NoData