import React from 'react'
import LoaderGif from '../../../assets/icons8-fidget-spinner.gif';
import style from './loader.module.scss';
function Loader(props) {
    const { toggleLoader } = props;
    console.log('toggleLoader', toggleLoader)
    return (
        <>
            {
                toggleLoader ?
                    (
                        <div className={style.spinnerWrapper}>
                            <div className={style.spinnerWrapperSpinner}>
                                <img src={LoaderGif.src} alt="Loader Gif" />
                            </div>
                        </div>

                    ) : null
            }
        </>
    )
}
export default Loader