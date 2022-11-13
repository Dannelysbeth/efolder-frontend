import React, { Component } from 'react';
import { Navigate,useSearchParams } from 'react-router-dom'

const OAuth2RedirectPage = () => {
    /*const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };*/

    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get("accessToken");
    const error = searchParams.get("error");

        if(token) {
            localStorage.setItem('access', token);
            return <Navigate to="/"></Navigate>; 
        } else {
            return <Navigate to="/login"></Navigate>; 
        }
    
}

export default OAuth2RedirectPage;