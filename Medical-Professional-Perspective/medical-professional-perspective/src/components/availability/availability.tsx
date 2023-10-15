import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Availability = () => {
    const [availability, setAvailability] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getAvailability = async () => {
            const resp = await fetch(`/api/availability/${id}`);
            const availResp = await resp.json();
            setAvailability(availResp);
        };

        getAvailability();
    }, [id]);

    if (!Object.keys(availability).length) return <div />;

    return (
        <div>
            <h1>Working hours</h1>
            
        </div>
    );
};

export default Availability;