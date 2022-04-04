import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import fireDb from "../../firebase";
import { toast } from "react-toastify";

import './addoperator.css'

const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
    modelPhone: "",
    createdDate: "",
    updatedDate: ""
};

const AddOperator = () => {
    const [state, setState] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [changed, setChanged] = useState(false);

    // avoid typing state.firsname, state.lastName, ...
    const {
        firstName,
        lastName,
        phone,
        modelPhone,
        createdDate,
        updatedDate
    } = state;

    const validate = (values) => {
        const errors = {};
        const phoneRegex = RegExp(/((0[1-9])|(4[0-2])|(4[4-9])|(5[4-9])|(6[0-1])|6[5-7]|(77)|(75))[0-9]{7}/);

        if (!values.firstName) {
            errors.firstName = "Le Prénom est obligatoire!";
        } else if (values.firstName.length < 2) {
            errors.firstName = "3 caractères minimum!";
        }
        if (!values.lastName) {
            errors.lastName = "Le nom est obligatoire!";
        } else if (values.lastName.length < 2) {
            errors.lastName = "3 caractères minimum!";
        }
        if (!values.modelPhone) {
            errors.modelPhone = "Type de téléphone obligatoire!";
        }
        if (!values.phone) {
            errors.phone = "Le téléphone est obligatoire!";
        } else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Numéro de téléphone invalide!";
        }

        return errors;

    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0) {
            console.log(state);
        }
    }, [formErrors]);

    const { id } = useParams();

    useEffect(() => {
        //setState({ ...state, updatedDate: new Date().getTime() })

        fireDb.child(`geopostoperators/${id}`).on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setState({ ...snapshot.val() });
            }
            else {
                setState({});
            }
        });
        return () => {
            setState({});
        };
    }, [id]);


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !phone || !modelPhone) {
            toast.error("Merci de rensigner les informations obligatoires")
        } else {

            if (!id) {
                fireDb.child("geopostoperators").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Opérateur Enregistré avec succès")
                    }
                });
            } else {

                if (changed) {
                    setState({ ...state, updatedDate: new Date().getTime() })

                    fireDb.child(`geopostoperators/${id}`).set(state, (err) => {
                        if (err) {
                            toast.error(err);
                        } else {
                            toast.success("Opérateur mis à jour avec succès")
                        }

                    });

                    setChanged(false);

                    setState(initialState);
                    navigate('/operator', { replace: true })

                } else {
                    toast.error("Aucune modification n'a été faite, merci de faire une modification ou d'annuler")
                }

            }

        }


    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
        setFormErrors(validate(state));
        setChanged(true);
    };

    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1 className='enregistrement'>Enregistrement Opérateur</h1>
                <form onSubmit={handleSubmit}>
                    <div className="firstName">
                        <label htmlFor="firstName">Prénom*</label>
                        <input type="text" className="" id="firstName" placeholder='Prénom' name='firstName' value={firstName || ""} onChange={handleInputChange} />
                        <small className='text-danger'>{formErrors.firstName}</small>
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Nom*</label>
                        <input type="text" className="" id="lastName" placeholder='Nom de famille' name='lastName' value={lastName || ""} onChange={handleInputChange} />
                        <small className='text-danger'>{formErrors.lastName}</small>
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">téléphone*</label>
                        <input type="number" className="" id="phone" placeholder='téléphone' name='phone' value={phone || ""} onChange={handleInputChange} />
                        <small className='text-danger'>{formErrors.phone}</small>
                    </div>
                    <div className="modelPhone">
                        <label htmlFor="modelPhone">Modèle téléphone*</label>
                        <input type="text" className="" id="modelPhone" placeholder='Modèle téléphone' name='modelPhone' value={modelPhone || ""} onChange={handleInputChange} />
                        <small className='text-danger'>{formErrors.modelPhone}</small>
                    </div>
                    <div className="saveoperator">
                        <input className='btn1 btn-edit1' type="submit" value={id ? "Mise à jour" : "Enregistrer"} />
                    </div>
                    <Link to="/operator">
                        <button className='btn1 btn-edit1'>Annuler</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default AddOperator