import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ handleSubmitForm }) {

  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    sprites: {
      "front": "",
      "back": "",
    },
  });

  function handleChanges(event) {
    const { name, value } = event.target;
  
    if (name === "frontUrl" || name === "backUrl") {
      setFormData({
        ...formData,
        sprites: {
          ...formData.sprites,
          [name === "frontUrl" ? "front" : "back"]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "hp" ? parseInt(value, 10) || 0 : value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Submitting formData:", formData);

    fetch('http://localhost:3001/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((newPokemon) => {
      handleSubmitForm(newPokemon);
    });
    setFormData({
      name: '', 
      hp: '', 
      sprites: { "front": "", "back": "",} 
    });
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChanges}/>
          <Form.Input fluid label="hp" type="number" step={1} placeholder="hp" name="hp" value={formData.hp} onChange={handleChanges}/>
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            type="text"
            value={formData.sprites.front} 
            onChange={handleChanges}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            type="text"
            value={formData.sprites.back} 
            onChange={handleChanges}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
