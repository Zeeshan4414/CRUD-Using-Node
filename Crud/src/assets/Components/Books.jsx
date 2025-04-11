import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'ldrs/ping';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading , setLoading] =  useState(true);

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:3030')
                .then(res => {
                    setBooks(res.data);
                    
                    setLoading(false); 
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false); 
                });
        }, 2000);
    }, []); 

    const handleDelete = (id) => {
        axios
        .delete('http://localhost:3030/delete/'+id)
        
        .then(res => window.location.reload())
        alert("Book Deleted Successfully")

        .catch(err => console.log(err))
    }

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                    <l-ping size="75" speed="2" color="skyBlue" className="d-flex flex-column"></l-ping>
                </div>
            ) : (
                <div className="container py-5">
                    {books.length !== 0 ? (
                        <>
                            <h1 className="text-center mb-4 pb-2 border-bottom">List of Cars</h1>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Id</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Year</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book) => (
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td>{book.name}</td>
                                                <td>{book.publisher}</td>
                                                <td>{book.date}</td>
                                                <td className="d-flex justify-content-between">
                                                    <Link to={`/update/${book.id}`}>
                                                        <button className="btn btn-info btn-sm mr-2">Update</button>
                                                    </Link>
                                                    <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(book.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/create" className="btn btn-success">
                                    Add New Car
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center mt-4">
                            <h3 className="text-muted">No Record Found</h3>
                            <Link to="/create" className="btn btn-primary mt-3">Add New Car</Link>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Books;
