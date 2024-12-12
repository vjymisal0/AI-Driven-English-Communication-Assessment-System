import { Heading } from "../component/Heading";
import { Button } from "../component/Button";
import { BottomWarning } from "../component/Bottomwarning";
import { SubHeading } from "../component/Subheading";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
                <Heading label="Signup" className="text-3xl font-semibold text-center text-gray-800 mb-4" />
                <SubHeading label="Enter Your information to create an account" className="text-lg text-center text-gray-600 mb-6" />

                {/* Input fields */}
                <input
                    type="text"
                    onChange={(e) => setfirstname(e.target.value)}
                    placeholder="First Name"
                    className="mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                />
                <input
                    type="text"
                    onChange={(e) => setlastname(e.target.value)}
                    placeholder="Last Name"
                    className="mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                />
                <input
                    type="email"
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="Email"
                    className="mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                />
                <input
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                    className="mb-8 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
                />

                {/* Signup button */}
                <Button
                    label="Signup"
                    onClick={async () => {
                        console.log(firstname + " " + lastname);
                        const response = await axios.post("https://backend-node-u13c.onrender.com/user/signup", {
                            firstname,
                            lastname,
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/");
                    }}
                    className="bg-indigo-600 text-white text-lg py-4 rounded-md hover:bg-indigo-700 transition duration-200"
                />

                {/* Bottom warning */}
                <BottomWarning
                    label="Already have an account?"
                    buttonText="Signin"
                    to="/signin"
                    className="mt-4 text-center text-gray-500"
                />
            </div>
        </div>
    );
}
