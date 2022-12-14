import React, { useEffect, useState } from 'react'
import fireDb from '../../firebase';
import { Link } from "react-router-dom";
import { useParams } from 'react-router';

import './viewoperator.css'

const ViewOperator = () => {
    const [geopostoperators, setgeoPostOperators] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fireDb.child(`geopostoperators/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setgeoPostOperators({ ...snapshot.val() });
            }
            else {
                setgeoPostOperators({});
            }
        });
    }, [id]);
    console.log("geopostoperators", geopostoperators);


    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>Détail Opérateur</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Prénom: </strong>
                    <span>{geopostoperators.firstName}</span>
                    <br />
                    <br />

                    <strong>Nom: </strong>
                    <span>{geopostoperators.lastName}</span>
                    <br />
                    <br />

                    <strong>Téléphone: </strong>
                    <span>{geopostoperators.phone}</span>
                    <br />
                    <br />

                    <strong>Ville: </strong>
                    <span>{geopostoperators.town}</span>
                    <br />
                    <br />

                    <strong>Modèle Téléphone: </strong>
                    <span>{geopostoperators.modelPhone}</span>
                    <br />
                    <br />

                    <strong>Date de Création: </strong>
                    <span>{geopostoperators.createdDate}</span>
                    <br />
                    <br />

                    <strong>Date de Mise à jour: </strong>
                    <span>{geopostoperators.updatedDate}</span>
                    <br />
                    <br />

                    <Link to="/operator">
                        <button className="btn btn-edit">Liste des opérateurs</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewOperator