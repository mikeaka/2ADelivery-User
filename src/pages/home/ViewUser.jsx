import React, { useEffect, useState } from 'react'
import fireDb from '../../firebase';
import { Link } from "react-router-dom";
import { useParams } from 'react-router';

import './viewuser.css'

const ViewUser = () => {
    const [geopostusers, setGeopostusers] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fireDb.child(`geopostusers/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setGeopostusers({ ...snapshot.val() });
            }
            else {
                setGeopostusers({});
            }
        });
    }, [id]);

    console.log("geopostusers", geopostusers);


    return (
        <div >
            <div className="card">
                <div className="card-header">
                    <p>Détails Utilisateur</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Prénom: </strong>
                    <span>{geopostusers.firstName}</span>
                    <br />
                    <br />

                    <strong>Nom: </strong>
                    <span>{geopostusers.lastName}</span>
                    <br />
                    <br />

                    <strong>Commune: </strong>
                    <span>{geopostusers.commune}</span>
                    <br />
                    <br />

                    <strong>Téléphone: </strong>
                    <span>{geopostusers.phone}</span>
                    <br />
                    <br />

                    <strong>Ville: </strong>
                    <span>{geopostusers.town}</span>
                    <br />
                    <br />

                    <strong>Adresse: </strong>
                    <span>{geopostusers.userAddress}</span>
                    <br />
                    <br />

                    <strong>Latitude: </strong>
                    <span>{geopostusers.latitude}</span>
                    <br />
                    <br />

                    <strong>Longitude: </strong>
                    <span>{geopostusers.longitude}</span>
                    <br />
                    <br />

                    <strong>carte d'identité: </strong>
                    <span>{geopostusers.idCardUrl}</span>
                    <br />
                    <br />

                    <strong>Altitude: </strong>
                    <span>{geopostusers.altitude}</span>
                    <br />
                    <br />

                    <strong>accuracy: </strong>
                    <span>{geopostusers.accuracy}</span>
                    <br />
                    <br />

                    <strong>operateur: </strong>
                    <span>{geopostusers.operator}</span>
                    <br />
                    <br />

                    <strong>Date de Création: </strong>
                    <span>{geopostusers.createdDate}</span>
                    <br />
                    <br />

                    <Link to="/">
                        <button className="btn btn-edit">Allez a l'Accueil</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewUser