import React from 'react'
import PropTypes from 'prop-types'
import style from './dropdown.module.scss';

function Dropdown(props) {
    const { options, onClick } = props;
    return (
        <div className={style.dropdown}>
            <button className={style.dropbtn}>Send To</button>
            <div className={style.dropdownContent}>
                {options.map((ele, index) => (
                    <div
                        className={style.options}
                        key={index} onClick={(e) => onClick(e, ele)}>{ele.name}</div>
                ))}
            </div>
        </div>
    )
}

Dropdown.propTypes = {}

export default Dropdown
