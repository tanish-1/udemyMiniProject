import React from 'react';
import './NewPlace.css'
import Input from "../../shared/components/FormElements/Input.jsx";
const NewPlace = () => {
    return (
      <form className="place-form">
       <Input
           element="input"
           type="text"
           label="Title"
           validators={[]}
           onInput={[]}
           errorText="Please enter a valid title." />
      </form>
    );
};

export default NewPlace;