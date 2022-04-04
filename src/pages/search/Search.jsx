import React, { useState, useEffect } from 'react'
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import fireDb from '../../firebase';
import './search.css'

const Search = () => {
    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let search = query.get("name");
    console.log("search", search)

    useEffect(() => {
        searchData();

    }, [search]);

    const searchData = () => {
        fireDb
            .child("geopostusers")
            .orderByChild("lastName")
            .equalTo(search)
            .on("value", (snapshot) => {
                if (snapshot.val()) {
                    const data = snapshot.val();
                    setData(data);
                }
            })
    }

    const onDelete = (id) => {
        if (window.confirm("Etes vous sure de vouloir supprimer cette entrée ?")) {
            fireDb.child(`geopostusers/${id}`).remove((err) => {
                if (err) {
                    toast.error(err);
                }
                else {
                    toast.success("supprimé de la base");
                }
            })
        }
    }

    return (
        <>
            <div style={{ marginTop: "50px" }}>
                <Link to="/">
                    <button className='btn1 btn-edit1'>Retour</button>
                </Link>
                {Object.keys(data).length === 0 ? (
                    <h2 className='geo__search-h2'>Aucun Enregistrement trouve pour l'utilisateur: {query.get("name")} </h2>
                ) : (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}> No</th>
                                <th style={{ textAlign: "center" }}> Prénom</th>
                                <th style={{ textAlign: "center" }}> Nom</th>
                                <th style={{ textAlign: "center" }}> Téléphone</th>
                                <th style={{ textAlign: "center" }}> Commune</th>
                                <th style={{ textAlign: "center" }}> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* maping the objects we have in database */}
                            {
                                Object.keys(data).map((id, index) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">
                                                {index + 1}
                                            </th>
                                            <td>{data[id].firstName}</td>
                                            <td>{data[id].lastName}</td>
                                            <td>{data[id].phone}</td>
                                            <td>{data[id].commune}</td>
                                            <td>
                                                <Link to={`/updateuser/${id}`}>
                                                    <button className="btn btn-edit">Editer</button>
                                                </Link>
                                                <button className="btn btn-delete" onClick={() => onDelete(id)}>Supp</button>

                                                <Link to={`/viewuser/${id}`}>
                                                    <button className="btn btn-view">Voir</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                                )
                            }
                        </tbody>
                    </table>

                )}
            </div>
        </>
    )
}

export default Search