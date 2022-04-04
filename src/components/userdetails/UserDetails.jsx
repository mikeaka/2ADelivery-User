import React from 'react';
import './userdetails.css'

const UserDetails = ({ formData, formErrors, handleInputChange, operatorData, handleFileChange }) => {

    const operatorList = Object.values(operatorData).map((item, i) => {
        return (
            <option key={i} value={item.lastName}>{item.lastName}</option>
        )
    })

    return (
        <div>
            <div>
                <label className='label1' htmlFor="firstname">Prénom*</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                />
                <small className='text-danger'>{formErrors.firstName}</small>
            </div>
            <div>
                <label className='label1' htmlFor="userlastname">Nom*</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Nom de famille"
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                />
                <small className='text-danger'>{formErrors.lastName}</small>
            </div>
            <div>
                <label className='label1' htmlFor="userphone">Téléphone*</label>
                <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                />
                <small className='text-danger'>{formErrors.phone}</small>
            </div>
            <div>
                <label className='label1' htmlFor="idcard">Carte d'Identité</label>
                <input
                    type="file"
                    id="idcard"
                    name="idcard"
                    placeholder="CNI"
                    value={formData.idcard || ""}
                    onChange={handleFileChange}
                />
                <small className='text-danger'>{formErrors.idcard}</small>
            </div>
            <div>
                <select
                    name="operator"
                    id="operator"
                    value={formData.operator || ""}
                    onChange={handleInputChange}
                >
                    {operatorList}

                </select>
                <small className='text-danger'>{formErrors.operator}</small>
            </div>
        </div>
    )
}

export default UserDetails