import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles.css';

// total pages = 90

const ScrollerCard = ({ value, reference }) => {
    return (
        <div key={value.id.toString()} className='dataComp' ref={reference}>
            <div className="dataCompChild">
                <b>Name</b>
                <p>{value.name}</p>
            </div>
            <div className="dataCompChild">
                <b>Gender</b>
                <p>{value.gender}</p>
            </div>
            <div className="dataCompChild">
                <b>Email</b>
                <p>{value.email}</p>
            </div>

        </div>
    )
}

const Home = () => {
    const isAuth = localStorage.getItem('isLoggedIn');
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastElement, setLastElement] = useState(null);

    const paginationUser = async (id) => {
        let url = "https://gorest.co.in/public-api/users/?page=" + id;

        let response = await fetch(url);
        let users = await response.json();
        return users;
    }

    const onLogout = () => {
        localStorage.removeItem('isLoggedIn');
        history('/');
    }

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setPage((no) => no + 1);
                }
            })
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    useEffect(() => {
        if (page < 90) paginationUser(page).then(val => {
            const updatedData = [...data, ...val.data];
            setData(updatedData);
        });

    }, [page])


    if (!isAuth) return <Navigate to='/' />
    return (
        <div className="homeContainer">
            <div className='headerComp'>
                <b>Infinite User List Scroller</b>
                <button type="submit" onClick={onLogout}>LogOut</button>
            </div>
            {
                data.map(val => <ScrollerCard value={val} key={val.id.toString()} reference = {setLastElement}/>)
            }
        </div>
    )
}

export default Home;
