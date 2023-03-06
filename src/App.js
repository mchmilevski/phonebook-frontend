import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import personServices from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personServices
      .getAll()
      .then((result) => {
        setPersons(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} already exists. Replace the old number to a new one?`
        )
      ) {
        personServices.update(existingPerson.id, newPerson).then(() => {
          const updatedPersons = persons.map((obj) =>
            obj.id === existingPerson.id ? { ...obj, number: newNumber } : obj
          );
          setPersons(updatedPersons);
        });
      }
    } else {
      personServices
        .create(newPerson)
        .then((response) => {
          setError("");
          setPersons([...persons, response]);
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
    }
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  const handleDelete = (id) => () => {
    if (window.confirm("Do you want to delete this user?")) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div className="container">
      <h2>Phonebook</h2>
      {error.length > 0 && <div className="error">{error}</div>}
      <Filter handleSearch={handleSearch} />
      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
        onSubmit={onSubmit}
      />
      <h3>Numbers</h3>
      <div>
        {filteredPersons.map((person) => (
          <div className="numberContainer" key={person.id}>
            <p>
              {person.name}, {person.number}
            </p>
            <button className="deleteButton" onClick={handleDelete(person.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
