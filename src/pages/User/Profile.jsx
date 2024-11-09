import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { userData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
    profilePicture: userData?.profilePictureUrl || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement profile update logic
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-6">
          <img 
            src={formData.profilePicture || '/default-avatar.png'} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{formData.name}</h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full px-4 py-2 border rounded"
              disabled={!isEditing}
            />
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 