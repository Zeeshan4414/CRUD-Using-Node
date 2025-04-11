import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewBooks() {
  const [name, setName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate the year input
    if (!/^\d{4}$/.test(date)) {
      alert("Please enter a valid 4-digit year.");
      return;
    }
    if (name == "") {
      alert("Car Make is required.");
      return;
    }
    if (publisher == "") {
      alert("Car Model is required.");
      return;
    }

    const formData = {
      name,
      publisher,
      date,
    };

    setLoading(true);

    setTimeout(() => {
      axios
        .post('http://localhost:3030/create', formData)
        .then((res) => {
          console.log('Response:', res.data);
          alert("New Car Added Successfully");
          navigate('/');
        })
        .catch((error) => {
          alert('Error in Adding Car');
          console.error('Error:', error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  return (
    <div className="container bg-info text-center mt-5 pt-5 pb-5 border border-light-subtle rounded" style={{ maxWidth: '600px' }}>
      <h1 id='head'><b>Add Cars</b></h1>

      {
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
              data-testid="car-model-input"
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
              required
            />
          </div>

          <button
            type="submit"
            data-testid="submit-button"
            className="btn btn-primary mt-3"
            style={{ maxWidth: '150px', margin: '0 auto' }}
          >
            Submit
          </button>
        </form>
      }
    </div>
  );
}

export default NewBooks;
