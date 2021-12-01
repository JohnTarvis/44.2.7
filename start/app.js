import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const INITIAL_STATE = {memes:[]};
const INITIAL_FORM = {url: "",top: "",bottom: ""};

function rootReducer(state = INITIAL_STATE, action) {
    if (action.type === "ADD_MEME"){return{...state,memes:[...state.memes, { ...action.meme }]};}
    if (action.type === "REMOVE_MEME"){return{...state,memes:state.memes.filter(meme => meme.id !== action.id)};}
    return state;
}

function NewMemeForm({addMeme}) {
  const [form, setForm] = useState(INITIAL_FORM);
  function submit(e) {
    e.preventDefault();
    addMeme({...form});
    setForm(INITIAL_FORM);
  }
  function change(e) {
    const {name,value} = e.target;
    setForm(form => ({...form,[name]:value}));
  }
  return (
    <div>
      <div>new</div>
      <form onSubmit={submit}>
        <label htmlFor="top">top</label>
        <input
          type="text"
          name="top"
          id="top"
          onChange={change}
          value={form.top}
        />
        <label htmlFor="bottom">bottom</label>
        <input
          type="text"
          name="bottom"
          id="bottom"
          onChange={change}
          value={form.bottom}
        />
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          id="url"
          onChange={change}
          value={form.url}
        />
        <button type="submit" id="form_submit">
          generate
        </button>
      </form>
    </div>
  );
}
function Meme({ deleteMeme, top, bottom, url, id }) {
  function handleDeleteMeme() {
    deleteMeme(id);
  }
  return (
    <div>
      <div>
        <span>{top}</span>
        <img src={url} />
        <span>{bottom}</span>
        <button onClick={handleDeleteMeme}>
          delete
        </button>
      </div>
    </div>
  );
}

