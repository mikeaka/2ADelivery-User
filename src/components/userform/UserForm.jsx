import React, { useState, useEffect } from 'react';
import UserDetails from '../userdetails/UserDetails';
import UserLocation from "../userlocation/UserLocation"
import UserLocationDetails from "../userlocationdetails/UserLocationDetails"
import fireDb, { storage } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import './userform.css'

const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
    commune: "",
    quartier: "",
    street: "",
    villa: "",
    immeubleEtage: "",
    immeubleNumPorte: "",
    town: "",
    idCard: "",
    idCardUrl: "",
    operator: "operator",
    homeType: "",
    latitude: "",
    longitude: "",
    altitude: "",
    accuracy: "",
    userAddress: "",
    valid: "",
    createdDate: ""

};

const UserForm = () => {
    const [page, setPage] = useState(0);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState(initialState);
    const [operatorData, setOperatorData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [duplicates, setDuplicates] = useState(false);
    const [changed, setChanged] = useState(false);

    const FormTitles = ["Enregistrement", "Information Lieux", "Localisation"];

    useEffect(() => {
        fireDb.child("geopostoperators").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setOperatorData({ ...snapshot.val() });
                console.log(operatorData)
            }
            else {
                setOperatorData({});
            }
        });
        return () => {
            setOperatorData({});
        };
    }, []);

    const { id } = useParams();

    useEffect(() => {
        fireDb.child(`geopostusers/${id}`).on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setFormData({ ...snapshot.val() });
            }
            else {
                setFormData({});
            }
        });
        return () => {
            setFormData({});
        };
    }, [id]);
    console.log("id is:", id)
    console.log("formdata is:", formData)
    console.log("Afterformdata is:", formData)

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
        if (!values.operator) {
            errors.operator = "Opérateur obligatoire!";
        } else if (values.operator === "operator") {
            errors.operator = "Opérateur obligatoire!";
        }
        if (!values.homeType) {
            errors.homeType = "Type de logement obligatoire!";
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
            console.log(formData);
        }
    }, [formErrors]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

        setFormErrors(validate(formData));
        setChanged(true);
    };

    const handleFileChange = (e) => {

        if (e.target.files[0]) {
            setFormData({ ...formData, idCard: e.target.files[0] })
            console.log(formData.idCard)
        }

    }

    const handleUpload = () => {
        const storageRef = ref(storage, `idcards/${formData.idCard.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.idCard);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog);
        }, (err) =>
            console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        console.log(url)
                        setFormData({ ...formData, idCardUrl: url })
                    })
            }
        );
    }

    function lastNameCheck() {

        const lowerLastName = formData.lastName.toLowerCase();

        fireDb.child("geopostusers")
            .orderByChild('lastName')
            .equalTo(lowerLastName)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.log(`${formData.lastName} already exist`)
                    setDuplicates(true);

                } else {
                    console.log('Settlement last name not found');
                    setDuplicates(false);

                }
                return duplicates;
            })
    }

    function firstNameCheck() {

        const lowerFirstName = formData.firstName.toLowerCase();

        fireDb.child("geopostusers")
            .orderByChild('firstName')
            .equalTo(lowerFirstName)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.log(`${formData.firstName} already exist`)
                    setDuplicates(true);

                } else {
                    console.log('Settlement first name not found');
                    setDuplicates(false);

                }
                return duplicates;
            })
    }

    function PhoneCheck() {
        fireDb.child("geopostusers")
            .orderByChild('phone')
            .equalTo(formData.phone)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.log(`${formData.phone} already exist`)
                    setDuplicates(true);

                } else {
                    console.log('Settlement phone not found');
                    setDuplicates(false);

                }
                return duplicates;
            })
    }

    const navigate = useNavigate();

    const getDate = () => {
        var date = new Date().getTime();
        setFormData({ ...formData, createdDate: date })
        console.log(formData.createdDate)
    };

    const handleSubmit = (e) => {

        lastNameCheck();
        if (duplicates) {
            console.log(duplicates)
        }

        firstNameCheck();
        if (duplicates) {
            console.log(duplicates)
        }

        PhoneCheck();
        if (duplicates) {
            console.log(duplicates)
        }

        if (!duplicates) {

            if (formData.idCard && !formData.idCardUrl) {

                toast.error("Merci de cliquer sur le bouton envoyer CNI avant de terminer l'enregistrement")

            } else if ((!formData.idCard && !formData.idCardUrl) || (formData.idCard && formData.idCardUrl)) {

                if (!formData.firstName || !formData.lastName || !formData.phone || !formData.operator || formData.operator === "operator" || !formData.homeType || !formData.latitude || !formData.longitude) {
                    toast.error("Merci de rensigner les informations obligatoires, y compris le type de logement")
                } else {
                    const newObj = Object.fromEntries(
                        Object.entries(formData).map(
                            ([k, v]) => [k, v ? v.toString().toLowerCase() : '']
                        )
                    );
                    console.log(newObj, "newOBJ")

                    if (!id) {
                        fireDb.child("geopostusers").push(newObj, (err) => {

                            if (err) {
                                toast.error(err);
                            } else {
                                toast.success("Utilisateur Enregistré avec succès")
                            }
                        });
                        setFormData(initialState);
                        navigate('/aboutus', { replace: true })

                    } else {
                        if (changed) {
                            fireDb.child(`geopostusers/${id}`).set(newObj, (err) => {

                                if (err) {
                                    toast.error(err);
                                } else {
                                    toast.success("Utilisateur Mis à jour avec succès")
                                }
                            });
                            setFormData(initialState);
                            navigate('/aboutus', { replace: true })
                            setChanged(false)
                        } else {
                            toast.error("Aucune modification n'a été faite, merci de faire une modification ou d'annuler!")
                        }

                    }



                    //setTimeout(() => window.location.reload(), 5000);

                    // Reset Duplicate after run
                    setDuplicates(false);
                }

            }

        } else {
            toast.error("l'utilsiateur existe déja!")
        }



    };

    const PageDisplay = () => {
        if (page === 0) {
            return <UserDetails formErrors={formErrors} handleInputChange={handleInputChange} formData={formData} operatorData={operatorData} handleFileChange={handleFileChange} />
        } else if (page === 1) {
            return <UserLocation handleInputChange={handleInputChange} formData={formData} />
        } else {
            return <UserLocationDetails formData={formData} setFormData={setFormData} handleUpload={handleUpload} progress={progress} />
        }
    }

    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <div className='headers'>
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="body">
                    <h1 style={{ fontSize: "20px" }}>{PageDisplay()}</h1>
                </div>
                <div className='createAccount'>
                    <button disabled={page === 0} type="button" onClick={() => { setPage((currPage) => currPage - 1) }}>Précedent</button>
                </div>
                <div className='createAccount'>
                    <button type="button" onClick={() => {

                        if (page === FormTitles.length - 1) {
                            // console.log(formData)
                            handleSubmit()
                        } else {
                            setPage((currPage) => currPage + 1)
                        }

                    }}>{
                            //page === FormTitles.length - 1 ? "Terminée" : "Suivant"
                            page === FormTitles.length - 1 ? id ? "Mise à Jour" : "Terminée" : "Suivant"
                        }</button>
                </div>

                {
                    id ? <Link to="/">
                        <button className='btn1 btn-edit1'>Annuler</button>
                    </Link>
                        : null

                }


            </div>
        </div>
    )
}

export default UserForm