import React from 'react'
import './userlocation.css'

const UserLocation = ({ formData, handleInputChange }) => {
    return (
        <div>
            <div>
                <label className='label1' htmlFor="town">Ville</label>
                <input
                    type="text"
                    id="town"
                    name="town"
                    placeholder="Ville"
                    value={formData.town}
                    onChange={handleInputChange}
                />

            </div>
            <div>
                <label className='label1' htmlFor="commune">Commune</label>
                <input
                    type="text"
                    id="commune"
                    name="commune"
                    placeholder="Nom Commune"
                    value={formData.commune}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label className='label1' htmlFor="quartier">Quartier</label>
                <input
                    type="text"
                    id="quartier"
                    name="quartier"
                    placeholder="Quartier"
                    value={formData.quartier}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label className='label1' htmlFor="street">Numéro Rue</label>
                <input
                    type="number"
                    id="street"
                    name="street"
                    placeholder="Nméro de Rue"
                    value={formData.street}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label className='label2' htmlFor="homeType">Maison*</label>
                <input
                    type="radio"
                    id="homeType"
                    name="homeType"
                    value="Maison"
                    checked={formData.homeType === "Maison"}
                    onChange={handleInputChange}
                />

                <label className='label2' htmlFor="homeType">Appartement*</label>
                <input
                    type="radio"
                    id="homeType"
                    name="homeType"
                    value="Appartement"
                    checked={formData.homeType === "Appartement"}
                    //checked={formData.homeType ? "Appartement" : null}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label className='label1' htmlFor="villa">Villa</label>
                <input
                    type="number"
                    id="villa"
                    name="villa"
                    placeholder="Numéro de villa"
                    value={formData.villa}
                    onChange={handleInputChange}

                />
            </div>
            <div>
                <label className='label1' htmlFor="immeubleEtage">Etage</label>
                <input
                    type="number"
                    id="immeubleEtage"
                    name="immeubleEtage"
                    placeholder="Etage"
                    value={formData.immeubleEtage}
                    onChange={handleInputChange}

                />
            </div>
            <div>
                <label className='label1' htmlFor="immeubleNumPorte">Numéro Porte</label>
                <input
                    type="number"
                    id="immeubleNumPorte"
                    name="immeubleNumPorte"
                    placeholder="Numéro Porte"
                    value={formData.immeubleNumPorte}
                    onChange={handleInputChange}

                />
            </div>
        </div>
    )
}

export default UserLocation