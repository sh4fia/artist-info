import React, { useEffect } from 'react'
import DisplayArtist from './DisplayArtist.js'

const SaveToDB = ({ name, bio, stats, goods, imageurl }) => {

    useEffect(() => {
        submitArtistInfo()
    })

    // Save artist data to DB
    const submitArtistInfo = async () => {
        if (name !== '' && bio !== '' && stats !== '' && goods !== '') {
            try {
                const response = await fetch('http://localhost:3001/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, bio, stats, goods, imageurl })
                });
                if (response.ok) {
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                console.log(err);
                alert('Failed to create artist');
            }
        }
    }

    return (
        <>
            <DisplayArtist searchVal={name} />
        </>
    )
}

export default SaveToDB