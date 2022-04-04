import React from 'react'
import Image from '../../img/logo1.png'
import './about.css'

const About = () => {
    return (
        <div className="geo__header section__padding">
            <div className="geo__header-content">
                <h1>
                    Construisons le futur de la côte d'ivoire ensemble avec 2A Delivery.
                </h1>

                <p>Créer en 2020, la société 2A est fondée par deux associés passionné par la côte d'ivoire et son futur. <br /> <br />
                    La société 2A Delivery est une extension de la société 2A Corporate qui à pour ambition de faciliter le quotidien des ivoiriens.
                    Nous sommes en phase de dévelopement du système de courrier pour permettre à tout ivoirien de bénéficier de son courrier et à domicile peu importe ou vous etes situé. </p>

            </div>
            <div className="geo__header-image">
                <img src={Image} alt="boite" />
            </div>
        </div>
    )
}

export default About