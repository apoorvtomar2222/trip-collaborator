import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import style from './feeds.module.scss';
import Dropdown from '../Dropdown';
import Toast from '../Toast';
import Loader from '../Loader';
import NoData from '../NoData';

function Feeds() {
    const [hits, setHits] = useState([]);
    const [users, setUsers] = useState([]);
    const [toast, setToast] = useState('');
    const [toggleLoader, setToggleLoader] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setToggleLoader(true);
            const res = await fetch('/api/search');
            const result = await res.json();
            setHits(result['locations']);
            setToggleLoader(false);
        }

        async function fetchUsers() {
            const res = await fetch('/api/user');
            const result = await res.json();
            const userId = localStorage.getItem('user');
            const userList = result['users'].filter((ele) => ele.entityId !== userId);
            setUsers(userList);
        }

        fetchData();
        fetchUsers();
    }, []);

    const onClick = async (e, user, feed) => {
        setToast('')
        setToggleLoader(true);

        const finalData = { user, feed }
        event.preventDefault();

        const res = await fetch('/api/addRelatedFeed', {
            body: JSON.stringify(finalData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();;
        setToggleLoader(false);
        setToast('Shared Successfully.')

    }


    const search = async (event) => {
        const q = event.target.value;
        const params = new URLSearchParams({ q });
        const res = await fetch('/api/search?' + params);
        const result = await res.json();
        setHits(result['locations']);
    };
    return (
        <>
            <Loader toggleLoader={toggleLoader} />

            <div className={style.wrapper}>
                {toast &&
                    <Toast message={toast} />}
                <h1>Feed</h1>
                <input onChange={search} type="text" placeholder="Search Feeds..." />
                <div className={style.box}>
                    {hits.map((hit) => (
                        <div className={style.boxWrapper} key={hit.entityId}>
                            <div className={style.boxWrapperIcon}>
                                <img src={hit.image} alt="" />
                            </div>
                            <div className={style.boxWrapperText}>
                                <div className={style.boxWrapperText}>
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
                                    <Dropdown onClick={(e, user, ele) => onClick(e, user, hit)}
                                        options={users} />

                                </div>
                            </div>
                        </div>
                    ))}
                    {hits && !hits.length && <NoData />}
                </div>


            </div>
        </>
    )
}

Feeds.propTypes = {}

export default Feeds
