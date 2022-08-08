import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import style from './RelatedFeeds.module.scss';
import Toast from '../Toast';
import Loader from '../Loader';
import NoData from '../NoData';

function RelatedFeeds(props) {
    const [hits, setHits] = useState([]);
    const [toast, setToast] = useState('');
    const [toggleLoader, setToggleLoader] = useState(false);
    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setToggleLoader(true);
        const userEntityId = localStorage.getItem('user');
        const res = await fetch(`/api/getRelatedFeed?entityId=${userEntityId}`);
        const result = await res.json();
        setHits(result['feeds']);
        setToggleLoader(false);
    }

    const removeFeed = async (entityId) => {
        setToggleLoader(true);
        setToast('')
        const userEntityId = localStorage.getItem('user');

        await fetch(`/api/removeFeed?userEntityId=${userEntityId}&entityId=${entityId}`);
        fetchData();
        setToggleLoader(false);
        setToast('Removed Successfully.')
    }

    return (
        <div className={style.wrapper}>
            <Loader toggleLoader={toggleLoader} />

            {toast &&
                <Toast message={toast} />}
            <h1>Referred Feed</h1>
            {/* <input onChange={search} type="text" placeholder="Search Feeds..." /> */}
            <div className={style.box}>
                {hits.map((hit) => (
                    <div className={style.boxWrapper} key={hit.entityId}>
                        <div className={style.boxWrapperIcon}>
                            <img src={hit.image} alt="" />
                        </div>
                        <div className={style.boxWrapperText}>
                            <div className={style.boxWrapperTextRemoveIcon}
                                onClick={() => removeFeed(hit.entityId)}><b>X</b></div>
                            <div className={style.boxWrapperTextContent}>
                                <b>Location Name</b>
                                {hit.name}
                            </div>
                            <div className={style.boxWrapperTextContent}>
                                <b>Location Description</b>
                                {hit.description}
                            </div>
                            <div className={style.boxWrapperTextContent}>
                                <b>Location</b>
                                {hit.location}
                            </div>
                        </div>

                    </div>
                ))}

                {hits && !hits.length && <NoData />}
            </div>

        </div>
    )
}

RelatedFeeds.propTypes = {}

export default RelatedFeeds
