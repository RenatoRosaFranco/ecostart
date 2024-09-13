import React from 'react';
import './style.scss';

import ContactForm from "../../components/forms/ContactForm";

const ContactPage = () => {
    return(
        <section id='contact-page'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage;