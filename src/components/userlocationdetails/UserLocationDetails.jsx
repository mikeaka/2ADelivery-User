import React from 'react'
import { GOOGLE_API_KEY } from '../../config';

import './userlocationdetails.css'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};


const UserLocationDetails = ({ formData, setFormData, handleUpload, progress }) => {
    const getLocation = () => {
        if (navigator.geolocation) {
            console.log("clicked")

            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError, options);

        }
        else {
            alert("Geolocalisation is not supported by this browser.");
        }
    }

    const handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                break;
        }

    }

    const getCoordinates = (position) => {
        console.log(position)

        var intLatitude = position.coords.latitude;
        var inLongitude = position.coords.longitude;

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${intLatitude},${inLongitude}&sensor=false&key=${GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then(data => setFormData({
                ...formData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                accuracy: position.coords.accuracy,
                userAddress: data.results[0].formatted_address
            }))
            .catch(error => alert(error))

    }


    return (
        <div>
            <div>
                <p className='p1'>Latitude: {formData.latitude} </p>
                <p className='p1'>Longitude: {formData.longitude} </p>
                <h4>Adresse Google Maps</h4>
                <p className='p1'>Addresse: {formData.userAddress} </p>
            </div>
            <div className="createAccount">
                <button type="button" onClick={getLocation}>Afficher les coordonées</button>
            </div>

            <div width="500" height="600">
                {
                    formData.latitude && formData.longitude ?
                        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${formData.latitude},${formData.longitude}&zoom=14&size=400x300&sensor=false&&markers=color:red%7C${formData.latitude},${formData.longitude}&key=${GOOGLE_API_KEY}`} alt='' width="220" height="200" />
                        :
                        null
                }

            </div>
            <div className="createAccount">
                <button disabled={!formData.idCard} type="button" onClick={handleUpload}>Envoyer CNI</button>
            </div>
            {
                formData.idCard ? <small> Pourcentage: {progress} % </small> : null
            }
            {/* <input type="submit" value="Enregistrer" onClick={handleSubmit} /> */}
        </div>
    )
}

export default UserLocationDetails