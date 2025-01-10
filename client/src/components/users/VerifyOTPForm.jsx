import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import {toast} from "react-toastify";

const SimpleOTPForm = () => {
    const {VerifyOTPRequest,isSubmit} = UserStore();
    const navigate = useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.querySelector(`input[name='otp-${index + 1}']`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.querySelector(`input[name='otp-${index - 1}']`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all digits are filled
        if (otp.join('').length !== 6) {
            toast.error('Please enter a complete 6-digit OTP')
            return;
        }
        // Send otp to your api request
        let res = await VerifyOTPRequest(otp.join(''))
        if(res){
            navigate('/reset-password')
            toast.success('OTP Send Successfully')
        }{
            toast.error("Wrong Email Address !")
        }
    };

    return (
        <div className='mx-4 py-8 bg-white'>
            <div className="w-full max-w-sm mx-auto p-6 border rounded-lg shadow-sm">
                <h2 className="text-black text-opacity-90 text-2xl font-semibold text-center mb-6">Enter OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`otp-${index}`}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className="md:w-12 w-10 h-12 text-center text-2xl bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        ))}
                    </div>

                    {
                        !isSubmit?(
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            >
                                Verify OTP
                            </button>
                        ): (
                            <button
                                className='flex items-center justify-center gap-3 w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none'>
                                <span>Loading</span>
                                <span className="loading loading-spinner loading-sm"></span>
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default SimpleOTPForm;