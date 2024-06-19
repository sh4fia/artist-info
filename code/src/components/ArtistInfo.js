import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SaveToDB from './SaveToDB.js';

const ArtistInfo = ({artistId}) => {
    const [artistInfo, setArtistInfo] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            getArtistInfo()
        }, 2000);
    })

    // Get artist data from Spotify API
    const getArtistInfo = () => {
        const options = {
            method: 'GET',
            url: 'https://spotify-scraper.p.rapidapi.com/v1/artist/overview',
            params: {
                artistId: artistId
              },
            headers: {
              'X-RapidAPI-Key': '14b5bbe6cfmsh92b04fdf6a51278p13e9a5jsn434069cda4dc',
              'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
            },
          };
        
        axios.request(options)
          .then(response => {
            console.log('From Spotify DB API: Artist Info: ', response.data);
            setArtistInfo(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }

    return (
        <>
        {artistInfo !== '' ? <SaveToDB name={artistInfo.name} bio={artistInfo.biography} stats={artistInfo.stats} goods={artistInfo.goods} imageurl={artistInfo.visuals.avatar[0].url} /> : ''}
        </>
    )
}

export default ArtistInfo