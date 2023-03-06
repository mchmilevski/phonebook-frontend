const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      Search for a person: <input value={search} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
