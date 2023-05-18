import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Check from '../Check';
import IPCheck from '../IPCheck';
import VerifyEmail from '../VerifyEmail';
import DictionarySearch from '../DictionarySearch';
import GeoLocation from '../GeoLocation';
import RandomUser from '../RandomUser';
import Maps from '../Maps';

function Services () {
    return (
        <>
       
        <Check />
        <IPCheck />
        <VerifyEmail />
        <DictionarySearch />
        <GeoLocation />
        <RandomUser />
        <Maps />
        <Footer />
        

        </>

    );
}

export default Services;