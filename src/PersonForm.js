const PersonForm = ({
  newName,
  handleName,
  newNumber,
  handleNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={handleName} />
      </div>
      <div style={{marginTop: '5px'}}>
        Number: <input value={newNumber} onChange={handleNumber} />
      </div>
      <div style={{marginTop: '10px'}}>
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

export default PersonForm;
