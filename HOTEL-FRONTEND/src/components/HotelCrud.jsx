import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const HotelCrud = () => {
  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState({
    id: '',
    name: '',
    location: '',
    rating: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedHotel, setFetchedHotel] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/hotelapi`;

  useEffect(() => {
    fetchAllHotels();
  }, []);

  const fetchAllHotels = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setHotels(res.data);
    } catch (error) {
      setMessage('Failed to fetch hotels.');
    }
  };

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in hotel) {
      if (!hotel[key] || hotel[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addHotel = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, hotel);
      setMessage('Hotel added successfully.');
      fetchAllHotels();
      resetForm();
    } catch (error) {
      setMessage('Error adding hotel.');
    }
  };

  const updateHotel = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, hotel);
      setMessage('Hotel updated successfully.');
      fetchAllHotels();
      resetForm();
    } catch (error) {
      setMessage('Error updating hotel.');
    }
  };

  const deleteHotel = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllHotels();
    } catch (error) {
      setMessage('Error deleting hotel.');
    }
  };

  const getHotelById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedHotel(res.data);
      setMessage('');
    } catch (error) {
      setFetchedHotel(null);
      setMessage('Hotel not found.');
    }
  };

  const handleEdit = (h) => {
    setHotel(h);
    setEditMode(true);
    setMessage(`Editing hotel with ID ${h.id}`);
  };

  const resetForm = () => {
    setHotel({
      id: '',
      name: '',
      location: '',
      rating: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Hotel Management</h2>

      <div>
        <h3>{editMode ? 'Edit Hotel' : 'Add Hotel'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={hotel.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={hotel.name} onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" value={hotel.location} onChange={handleChange} />
          <input type="number" step="0.1" name="rating" placeholder="Rating" value={hotel.rating} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addHotel}>Add Hotel</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateHotel}>Update Hotel</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Hotel By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getHotelById}>Fetch</button>

        {fetchedHotel && (
          <div>
            <h4>Hotel Found:</h4>
            <pre>{JSON.stringify(fetchedHotel, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Hotels</h3>
        {hotels.length === 0 ? (
          <p>No hotels found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(hotel).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((h) => (
                  <tr key={h.id}>
                    {Object.keys(hotel).map((key) => (
                      <td key={key}>{h[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(h)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteHotel(h.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default HotelCrud;
