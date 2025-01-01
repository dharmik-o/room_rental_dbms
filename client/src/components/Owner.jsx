import React, { useEffect, useState } from 'react';
import "../styles/Owner.css";
import axios from "axios";
import { HiOutlinePencil } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";

export default function Owner() {
    const [roomDetails, setRoomDetails] = useState([]);
    const ownerId = localStorage.getItem('user_id');
    const [editData, setEditData] = useState(null);
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/rooms/${ownerId}`);
                console.log('API Response:', response.data);
                setRoomDetails(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setRoomDetails([]);
            }
        };
        fetchRoomDetails();
    }, [ownerId]);

    const [addData, setAddData] = useState({
        ownerArea: "",
        ownerPrice: "0",
        ownerRoomType: ""
    });

    const handleChange = (e) => {
        setAddData({ ...addData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            owner_id: ownerId, // From localStorage
            ownerarea: addData.ownerArea,
            ownerRoomType: addData.ownerRoomType,
            ownerPrice: parseFloat(addData.ownerPrice),
        };
    
        console.log('Payload being sent:', payload);
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/owner", payload);
            console.log('Server response:', response.data);
            setAddData({ ownerArea: "", ownerPrice: "0", ownerRoomType: "" });
            const element = document.getElementsByClassName("addDetails")[0];
            if(element) element.classList.add("hidden");
        } catch (err) {
            console.error('Error adding room:', err.response?.data || err.message);
        }
    };
    const handleEdit = (room) => {
        setEditData({ ...room });
      };
    const handleEditChange = (e) => {
        setEditData({
          ...editData,
          [e.target.name]: e.target.value,
        });
      };
    const handleDelete = async (roomId) => {
        console.log('Room ID to delete:', roomId); 
        const confirmDelete = window.confirm('Are you sure you want to delete this room?');
        if (confirmDelete && roomId) {
          try {
            const response = await axios.delete(`http://localhost:5000/api/owner/rooms/${roomId}`);
            console.log('Room deleted successfully:', response.data);
            setRoomDetails(roomDetails.filter(room => room.room_id !== roomId)); // Remove room from the list
          } catch (error) {
            console.error('Error deleting room:', error);
          }
        } else {
          console.error('No valid roomId provided');
        }
      };
      
      const handleConfirm = async () => {
        try {
          await axios.put(`http://localhost:5000/api/owner/rooms/${editData.room_id}`, editData);
          const updatedRooms = roomDetails.map((room) =>
            room.room_id === editData.room_id ? editData : room
          );
          setRoomDetails(updatedRooms);
          setEditData(null);
        } catch (error) {
          console.error('Error updating room:', error);
        }
      };

    return (
        <>
            <nav>Dashboard<p style={{ float: "right" }}>owner</p></nav>
            <div className="details_table">
  <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr>
        <th>Area</th>
        <th>Room Type</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {roomDetails.length > 0 ? (
        roomDetails.map((room, index) => (
          <tr key={index}>
            <td>
              {editData && editData.room_id === room.room_id ? (
                <input
                  type="text"
                  name="area"
                  value={editData.area}
                  onChange={handleEditChange}
                />
              ) : (
                room.area
              )}
            </td>
            <td>
              {editData && editData.room_id === room.room_id ? (
                <select
                  name="room_type"
                  value={editData.room_type}
                  onChange={handleEditChange}
                >
                  <option value="Single">Single</option>
                  <option value="Shared">Shared</option>
                  <option value="Studio">Studio</option>
                </select>
              ) : (
                room.room_type
              )}
            </td>
            <td>
              {editData && editData.room_id === room.room_id ? (
                <input
                  type="text"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                />
              ) : (
                room.price
              )}
            </td>
            <td>
              {editData && editData.room_id === room.room_id ? (
                <button onClick={handleConfirm}>Confirm</button>
              ) : (
                <>
                  <HiOutlinePencil onClick={() => { handleEdit(room) }} />
                  <MdDeleteForever onClick={() => { handleDelete(room.room_id) }} />
                </>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ textAlign: 'center' }}>No rooms available</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

<div className="addDetails hidden">
  <h2>Add available rooms</h2>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Area"
      name="ownerArea"
      value={addData.ownerArea}
      onChange={handleChange}
    />
    <select
      name="ownerRoomType"
      id="ownerRoomtype"
      value={addData.ownerRoomType}
      onChange={handleChange}
      required
    >
      <option value="">Select Room Type</option>
      <option value="Single">Single</option>
      <option value="Shared">Shared</option>
      <option value="Studio">Studio</option>
    </select>
    <input
      type="text"
      placeholder="Price"
      name="ownerPrice"
      value={addData.ownerPrice}
      onChange={handleChange}
    />
    <input type="submit" value="ADD" />
  </form>
</div>

        </>
    );
}
