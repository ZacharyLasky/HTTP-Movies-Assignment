import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateForm(props) {

  const initialItem = {
    id: props.match.params.id,
    title: "",
    director: "",
    metascore: ""
  };

  const [item, setItem] = useState(initialItem);
  const [stars, setStars] = useState([]);
  
  // useEffect(() => {
    const id = props.match.params.id;
    // const itemInArr = props.items.find(item => `${item.id}` === id);
  //   if (itemInArr) setItem(itemInArr);
  // }, [props.items, props.match.params.id]);

  const changeHandler = event => {
    event.preventDefault();
    let value = event.target.value;
    setItem({
      ...item,
      [event.target.name]: value
    });
  };

  const changeHandlerStars = event => {
    event.preventDefault();
    let value = event.target.value;
    setStars({
      ...stars,
      [event.target.name]: [event.target.value]
    });
  };

  const movieInfo = {...item, ...stars}
  console.log(movieInfo)
  
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
      .then(res => {
        console.log(res);
        setItem(initialItem);
        // props.updateItems(res.data);
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
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="array"
          name="stars"
          onChange={changeHandlerStars}
          placeholder="stars"
          // value={item.stars}
        />
        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
}
