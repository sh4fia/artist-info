import React, { useEffect, useState } from 'react'
import './DisplayArtist.css'

const DisplayArtist = ({ searchVal }) => {

    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [followerCount, setFollowerCount] = useState();
    const [concertCount, setConcertCount] = useState();
    const [worldRank, setWorldRank] = useState();
    const [monthlyListeners, setmonthlyListeners] = useState();
    const [image, setImage] = useState();
    const [date, setDate] = useState();
    const [location, setLocation] = useState();
    const [title, setTitle] = useState();
    const [venue, setVenue] = useState();

    // Fetch artist data on user search
    useEffect(() => {
        findArtist();
    })

    // Data cleanup
    function removeTags(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();

        return str.replace(/(<([^>]+)>)/ig, '');
    }

    // Get artist and set data
    const findArtist = async () => {
        let results = await fetch(`http://localhost:3001/searchs/${searchVal}`).then(resp => resp.json());
        setTimeout(() => {
            results[0].goods.concerts.items.map((item) => {
                setTitle(item.title.split('(')[0])
                setDate(new Date(item.date).toLocaleDateString())
                setLocation(item.location)
                setVenue(item.venue)
            })
            setName(results[0].name)
            setFollowerCount(results[0].stats.followers)
            setConcertCount(results[0].goods.concerts.totalCount)
            setImage(results[0].imageurl)
            setBio(removeTags(results[0].bio))
            setWorldRank(results[0].stats.worldRank)
            setmonthlyListeners(results[0].stats.monthlyListeners)
        }, 5000);
    }

    // Display artist info
    return (
        <>
            <div className='column'>
                <div className='artistcard'>
                    <img className='imagebox' alt='artist' src={image} />
                    <div className='counts'>
                    <p className='count'><span style={{ fontSize: 'medium' }}>World Rank<br/></span><b style={{ fontSize: 'xx-large' }}>{worldRank}</b></p>
                    <p className='count'><span style={{ fontSize: 'medium' }}>Monthly Listeners<br/></span><b style={{ fontSize: 'xx-large' }}>{monthlyListeners}</b></p>
                    </div>
                    <div className='counts'>
                    <p className='count'><span style={{ fontSize: 'medium' }}>Followers<br/></span><b style={{ fontSize: 'xx-large' }}>{followerCount}</b></p>
                    <p className='count'><span style={{ fontSize: 'medium' }}>Total Concerts<br/></span><b style={{ fontSize: 'xx-large' }}>{concertCount}</b></p>
                    </div>
                </div>
                <div className='artistcard'>
                    <p className='box'>{bio}</p>
                </div>
                <div className='artistcard'>
                    <p className='box'><b>Upcoming concert:</b><br/><br/><b style={{ fontSize: 'larger' }}>{title}</b><br/><br/><li>Date: {date}</li><br/><li>Location: {location}</li><br/><li>Venue: {venue}</li></p>
                </div>
            </div>
        </>
    )
}

export default DisplayArtist