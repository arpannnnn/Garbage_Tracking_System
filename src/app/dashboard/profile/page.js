"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useToast } from '../../../../components/ui/use-toast';
import { app } from "../../../../firebase/firebase";
import { useSession } from "next-auth/react";
import Loader from "../../../../components/Loader";

function ProfileSection() {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const citizenshipRef = useRef("");
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    citizenship: "",
    mobileNumber: "",
    latitude: "",
    longitude: "",
    role: "",
  });
  const [editableUserData, setEditableUserData] = useState({
    fullName: "",
    email: "",
    citizenship: "",
    mobileNumber: "",
    latitude: "",
    longitude: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (status === "authenticated" && session?.user?.uid) {
      try {
        const q = query(
          collection(db, "users"),
          where("uid", "==", session.user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No matching documents found.");
        } else {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUserData(data);
            setEditableUserData(data);
          });
        }
      } catch (error) {
        setError("Error getting user data: " + error.message);
      }
    }

    setLoading(false);
  }, [db, session, status]);

  useEffect(() => {
    getUser();
  }, [getUser]);


  const handleFullNameChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setEditableUserData((prevState) => ({
        ...prevState,
        fullName: value,
      }));
    }
  };


  const handleMobileNumberChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setEditableUserData((prevState) => ({
        ...prevState,
        mobileNumber: value,
      }));
    }
  };

  const handleCitizenshipChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 16) {
      value = value.slice(0, 16); // Only 16 digits allowed
    }
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    citizenshipRef.current = formattedValue;
    setEditableUserData((prevState) => ({
      ...prevState,
      citizenship: formattedValue,
    }));
    event.target.value = formattedValue;
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setEditableUserData((prevState) => ({
      ...prevState,
      role: value,
    }));
  };



  const handleUpdateUserData = async () => {
    if (
      !editableUserData.fullName.trim() ||

      !editableUserData.citizenship.trim() ||
      !editableUserData.mobileNumber.trim() ||
      !editableUserData.role.trim()
    ) {
      toast({
        title: 'All fields must be filled out correctly.',
        description: 'Please fill out all fields correctly before updating user data.',
        variant: 'destructive',
      });

      return;
    }
    setUpdateLoading(true);
    try {
      const userRef = doc(db, "users", session.user.uid);

      // Update the user data
      await updateDoc(userRef, editableUserData);
      setUserData(editableUserData);
      toast({
        title: 'User data updated successfully.',
        description: 'User data has been updated successfully.',
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }

    setUpdateLoading(false);
  };
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setEditableUserData((prevState) => ({
            ...prevState,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          Hi, {userData.fullName || "User"}!
        </h2>
        <div className="profile-details">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={editableUserData.fullName}
              onChange={handleFullNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="citizenship">
              Citizenship
            </label>
            <input
              type="text"
              id="citizenship"
              name="citizenship"
              placeholder="Enter your citizenship number"
              value={editableUserData.citizenship}
              onChange={handleCitizenshipChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={editableUserData.mobileNumber}
              onChange={handleMobileNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 flex">
            <div className="mr-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="Click to get latitude"
                value={editableUserData.latitude}
                readOnly

                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="Click to get longitude"
                value={editableUserData.longitude}
                readOnly

                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300 cursor-pointer"
              />

            </div>

          </div>
          <button
            onClick={fetchLocation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold mb-2 py-2 px-2 text-sm  rounded focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300"
          >
            Update Location
          </button>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={editableUserData.role}
              onChange={handleRoleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Role</option>
              <option value="staff">Staff</option>
              <option value="user">User</option>
            </select>
          </div>
          <button
            onClick={handleUpdateUserData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring focus:border-blue-300"
            disabled={updateLoading}
          >
            {updateLoading ? "Updating..." : "Update User Data"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
