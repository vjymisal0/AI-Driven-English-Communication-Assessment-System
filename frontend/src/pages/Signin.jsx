import { useState } from "react";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { BottomWarning } from "../component/Bottomwarning";
import { SubHeading } from "../component/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const Signin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState(""); // Password state
    const navigate = useNavigate();
    const handleSignin = async () => {
        // Validate inputs
        if (!username || !password) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/user/signin", {
                username,
                password
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", username);
                navigate("/assessment");
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('User not found');
                }
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
                <Heading label="Signin" className="text-3xl font-semibold text-center text-gray-800 mb-4" />
                <SubHeading label="Please fill in your details" className="text-lg text-center text-gray-600 mb-6" />

                {/* Input fields */}
                <input
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="e.g., john.doe@gmail.com"
                    className="mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                />
                <input
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="••••••••"
                    type="password"  // Always hide password
                    className="mb-8 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                />

                {/* Signin button */}
                <Button
                    label="Signin"
                    onClick={handleSignin}
                    className="bg-indigo-600 text-white text-lg py-4 rounded-md hover:bg-indigo-700 transition duration-200"
                />

                {/* Bottom warning */}
                <BottomWarning
                    label="Don't have an account?"
                    buttonText="Signup"
                    to="/signup"
                    className="mt-4 text-center text-gray-500"
                />
            </div>
        </div>
    );
}
