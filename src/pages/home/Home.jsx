import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import fireDb from '../../firebase';
import './home.css'

const Home = () => {
    const [data, setData] = useState({});
    const [recordsCount, setRecordCount] = useState({
        number: ""
    });
    const [search, setSearch] = useState("");

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

    useEffect(() => {
        fireDb.child("geopostusers").limitToLast(10).on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            }
            else {
                setData({});
            }
        });
        return () => {
            setData({});
        };
    }, []);

    useEffect(() => {
        fireDb.child("geopostusers").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setRecordCount({ ...recordsCount, number: snapshot.numChildren() });
                //alert('Count: ' + snapshot.numChildren());
                console.log(recordsCount.number)
            }
            else {
                setRecordCount({});
            }
        });
        return () => {
            setRecordCount({});
        };
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const lowerCaseSearch = search.toString().toLowerCase()
        navigate(`/search?name=${lowerCaseSearch}`);
        setSearch("");
    }

    return (

        <div style={{ marginTop: "50px" }}>
            <p className='geo__home-p'>Aujourd'hui, nous avons {recordsCount.number} enregistrement dans la base de donnée. Ci-dessous les 10 derniers enregistrements.</p>
            <form className='geo__home-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='inputField search'
                    placeholder='Recherche Nom de Famille'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </form>
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
        </div>

    )
}

export default Home