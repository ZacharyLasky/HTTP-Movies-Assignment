import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
 id: "",
 title: "",
 director: "",
 metascore: "",
 stars: []
};

export default function UpdateForm(props) {

  const [item, setItem] = useState(initialItem);
  
  useEffect(() => {
    const id = props.match.params.id;
    const itemInArr = props.items.find(item => `${item.id}` === id);
    if (itemInArr) setItem(itemInArr);
  }, [props.items, props.match.params.id]);

  const changeHandler = event => {
    event.prevententdefault();
    let value = event.target.value;
    if (event.target.name === 'price') {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [event.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.prevententDefault();
    axios
      .put(`http://localhost:3333/items/${item.id}`, item)
      .then(res => {
        console.log(res);
        setItem(initialItem);
        props.updateItems(res.data);
        props.history.push('/item-list');
      })
      .catch(err => console.log(err.response));
  };
  
  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascores"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="array"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        />
        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
}