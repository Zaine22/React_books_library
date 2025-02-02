
import React, { useEffect, useState } from 'react'
import book from '../assets/book.jpeg';
import { Link, useLocation } from 'react-router-dom'; 
import useTheme from '../hooks/useTheme';
import {db} from '../firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import trash from '../assets/trash.svg'
import pencil from '../assets/pencil.svg'

export default function BookList() {

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let search = params.get('search')

    let [error,setError] = useState('');
    let [books,setBooks] = useState([]);
    let [loading,setLoading] = useState(false);

    let deleteBook = async(e,id) =>{
        e.preventDefault()
        //delete fire store
        let ref = doc(db,'books',id);
        //backend book delete
        await deleteDoc(ref);
        //frontend book delete
        setBooks(prev => prev.filter(b => b.id !== id))

    }
    
    useEffect(function(){
        setLoading(true);
        let ref = collection(db,'books');
        let q = query(ref,orderBy('date','desc'));
        getDocs(q).then(docs => {
            if(docs.empty){
                setError('no doucments found');
                setLoading(false);
            }else{
                let books = [];
                docs.forEach(doc =>{
                    let book = {id: doc.id , ...doc.data()};
                    books.push(book);
                });
                setBooks(books);
                setLoading(false);
                setError('');
            }
        })
    },[]);

    if (error) {
        return <p>{error}</p>
    }

    let { isDark } = useTheme();

    return (
        <div>
            {loading && <p>loading ... </p>}
            {/* book list */}
            {!!books && (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <div className={`p-4 border border-1 min-h-[420px] ${isDark ? 'text-white bg-dcard border-primary' : ''}`}>
                                <img src={book} alt="" />
                                <div className='text-center space-y-2 mt-3'>
                                    <h1>{b.title}</h1>
                                    <p>{b.description}</p>
                                    {/* genres */}
                                    <div className='flex flex-wrap justify-between items-center'>
                                        <div>
                                            {b.categories.map(c => (
                                                <span key={c} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500'> {c}</span>
                                            ))}
                                        </div>
                                        <div  className='flex space-x-5 items-center'>
                                            <Link to={`edit/${b.id}`}>
                                            <img src={pencil} alt="" />
                                            </Link>
                                            <img src={trash} alt="" onClick={(e) => deleteBook(e,b.id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p>}
        </div>
    )
}