import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/getrecord/${id}`)
      .then((res) => {
        const book = res.data;

        if (book.Error) {
          setError(book.Error);
        } else {
          setName(book.name);
          setPublisher(book.publisher);
          setDate(book.date);
        }
      })
      .catch((err) => {
        console.error('Error fetching book:', err.message);
        setError("Error fetching the book");
      });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate year format
    if (!/^\d{4}$/.test(date)) {
      alert("Please enter a valid 4-digit year.");
      return;
    }
    
    


    setLoading(true);
    const formData = { name, publisher, date };

    try {
      await axios.put(`http://localhost:3030/update/${id}`, formData);
      alert("Car Updated Successfully");
      navigate('/');
    } catch (error) {
      console.error('Error updating Car:', error.message);
      setError("Error updating the Car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error ? (
        <div className="container bg-danger text-center mt-5 pt-5 pb-5 border border-light-subtle rounded" style={{ maxWidth: '600px' }}>
          <h3>{error}</h3>
        </div>
      ) : (
        <div className="container bg-info text-center mt-5 pt-5 pb-5 border border-light-subtle rounded" style={{ maxWidth: '600px' }}>
          <h1><b>Update Car</b></h1>
          <form onSubmit={handleFormSubmit} className="container-sm d-flex flex-column align-items-center m-5" style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="name" className="form-label me-3" style={{ width: '120px' }}>
                <b>Car Make:</b>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                data-testid="car-make-input"
                className="form-control"
                style={{ maxWidth: '300px' }}
                placeholder="Enter Car Make"
                onChange={(e) => setName(e.target.value)}
                
                value={name}
              />
            </div>

            <div className="d-flex align-items-center mb-3">
              <label htmlFor="publisher" className="form-label me-3" style={{ width: '120px' }}>
                <b>Car Model:</b>
              </label>
              <input
                type="text"
                name="publisher"
                id="publisher"
                data-testid="model-input"
                className="form-control"
                style={{ maxWidth: '300px' }}
                placeholder="Enter Car Model"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
               
              />
            </div>

            <div className="d-flex align-items-center mb-3">
              <label htmlFor="date" className="form-label me-3" style={{ width: '120px' }}>
                <b>Manufacturer Year:</b>
              </label>
              <input
                type="text"
                name="date"
                id="date"
                data-testid="year-input"
                className="form-control"
                style={{ maxWidth: '300px' }}
                placeholder="YYYY"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                
              />
            </div>

            <button
              type="submit"
              data-testid="update-button"
              className="btn btn-primary mt-3"
              style={{ maxWidth: '150px', margin: '0 auto' }}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Update;
