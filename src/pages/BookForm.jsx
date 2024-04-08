import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { addDoc, collection, getDoc, doc,serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Create() {
  let {id} = useParams();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategory, setNewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);

  useEffect(()=>{
    //edit form
    if(id){
      setIsEdit(true);
      //get a book by its id 
      let ref = doc(db,'books',id);

      getDoc(ref).then(doc=>{
        if(doc.exists()){
         
          let {title,description,categories} = doc.data();
           setTitle(title);
           setDescription(description);
           setCategories(categories);
        }
      })

    }else{
      setIsEdit(false);
      setTitle('');
      setDescription('');
      setCategories([]);
    }
  },[]);

  let navigate = useNavigate();

  const addCategory = (e) => {
    if(newCategory && categories.includes(newCategory)){
      setNewCategory('')
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };

  let submitForm = async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
      date : serverTimestamp()
    };
    //firebase data adding
    if(isEdit){
      let ref = doc(db,'books',id);
      await updateDoc(ref,data);
    }else{
      let ref = collection(db,'books')
      await addDoc(ref, data);
    }
    navigate("/");
  };



  let{isDark} = useTheme();
  return (
    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto mt-5" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              placeholder="Book Title"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
            >
              Book Desctiption
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              placeholder="Book Desctription"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
            >
              Categories
            </label>
            <div className="flex items-center space-x-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                placeholder="Book Categories"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-primary p-1 rounded-lg mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 p-1 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            {categories.map((c) => (
              <span
                key={c}
                className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary "
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <button className="text-white bg-primary px-3 py-2 rounded-2xl flex items-center gap-1 w-full justify-center">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          <span className="hidden md:block">{isEdit ? 'Update Book' : 'Create Book'}</span>
        </button>
      </form>
    </div>
  );
}
