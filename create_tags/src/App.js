import React from 'react';
import FetchRandomUser from "./components/FetchRandomUser";

const App = () => {
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    let url = "http://localhost:3001/postTag?name="+ name;
    fetch(url,{method:"POST"})   
    setName('');
  }

  return (
    <div>
      <div>List of tags</div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />
      <div>
        <FetchRandomUser/>
      </div>
    </div>
  );
};

const AddItem = ({ name, onChange, onAdd }) => (
  <div>
    <input type="text" value={name} onChange={onChange} />
    <button type="button" onClick={onAdd}>
      Add tag
    </button>
  </div>
);

export default App;