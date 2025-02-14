import React, { useEffect, useState } from "react";
import UserStore from "../../store/UserStore.js";
import { toast } from "react-toastify";

const Profile = () => {
    const { ProfileDetails, SaveProfileRequest, ProfileDetailsRequest } = UserStore();

    const [formData, setFormData] = useState({
        cus_name: '',
        cus_add: '',
        cus_city: '',
        cus_state: '',
        cus_postcode: '',
        cus_country: '',
        cus_phone: '',
        cus_email: '',
        ship_name: '',
        ship_add: '',
        ship_city: '',
        ship_state: '',
        ship_postcode: '',
        ship_country: '',
        ship_phone: ''
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    // Update formData if ProfileDetails changes
    useEffect(() => {
        if (ProfileDetails) {
            setFormData({
                cus_name: ProfileDetails.cus_name || '',
                cus_add: ProfileDetails.cus_add || '',
                cus_city: ProfileDetails.cus_city || '',
                cus_state: ProfileDetails.cus_state || '',
                cus_postcode: ProfileDetails.cus_postcode || '',
                cus_country: ProfileDetails.cus_country || '',
                cus_phone: ProfileDetails.cus_phone || '',
                cus_email: ProfileDetails.cus_email || '',
                ship_name: ProfileDetails.ship_name || '',
                ship_add: ProfileDetails.ship_add || '',
                ship_city: ProfileDetails.ship_city || '',
                ship_state: ProfileDetails.ship_state || '',
                ship_postcode: ProfileDetails.ship_postcode || '',
                ship_country: ProfileDetails.ship_country || '',
                ship_phone: ProfileDetails.ship_phone || ''
            });
        }
    }, [ProfileDetails]); // Update formData when ProfileDetails changes

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle adding profile (shows the input form)
    const handleAddProfile = () => {
        setIsFormVisible(true); // Show the form when the "Add Profile" button is clicked
    };

    // Handle profile update (logs the profile data)
    const handleUpdate = async () => {
        let res = await SaveProfileRequest(formData);
        if (res) {
            toast.success("Profile Saved Successfully");
            await ProfileDetailsRequest();
        } else {
            toast.error("Something went wrong");
        }
    };

    // Check if form is complete: all fields should not be empty
    const isFormComplete = Object.values(formData).every(value => value !== "");

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {/* If no customer data, show "Add Profile" button */}
                {ProfileDetails === null && !isFormVisible ? (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">No Profile</h2>
                        <p className="text-gray-500 mt-4">You don't have a profile yet.</p>
                        <button
                            className="mt-6 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary"
                            onClick={handleAddProfile}
                        >
                            Add Profile
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{ProfileDetails === null? 'Create' : 'Update'} Your Profile</h2>
                        {isFormVisible || ProfileDetails !== null ? (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Billing Information */}
                                <div className="flex flex-col space-y-4">
                                    <input
                                        type="text"
                                        name="cus_name"
                                        placeholder="Name"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="cus_phone"
                                        placeholder="Phone"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_phone}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="email"
                                        name="cus_email"
                                        placeholder="Email"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_email}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="cus_add"
                                        placeholder="Address"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_add}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="cus_city"
                                        placeholder="City"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_city}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="cus_state"
                                        placeholder="State"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_state}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="cus_postcode"
                                        placeholder="Postcode"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_postcode}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="cus_country"
                                        placeholder="Country"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.cus_country}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Shipping Information */}
                                <div className="flex flex-col space-y-4">
                                    <input
                                        type="text"
                                        name="ship_name"
                                        placeholder="Shipping Name"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="ship_phone"
                                        placeholder="Shipping Phone"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_phone}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="ship_add"
                                        placeholder="Shipping Address"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_add}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="ship_city"
                                        placeholder="Shipping City"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_city}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="ship_state"
                                        placeholder="Shipping State"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_state}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="ship_postcode"
                                        placeholder="Shipping Postcode"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_postcode}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="ship_country"
                                        placeholder="Shipping Country"
                                        className="p-2 border focus:border-black text-black bg-white rounded-md outline-none focus:outline-none"
                                        value={formData.ship_country}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {/* Update Button with Conditional Styling */}
                        <button
                            className={`mt-6 py-2 px-4 rounded-lg ${isFormComplete ? "bg-primary text-white hover:bg-primary" : "bg-gray-200 text-gray-600 cursor-not-allowed"}`}
                            onClick={handleUpdate}
                            disabled={!isFormComplete} // Disable the button if form is not complete
                        >
                            Update Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
