import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../store/api"
import store from "../store/store";
import { useHookstate } from "@hookstate/core";
import { useNavigate } from "react-router-dom";


export default function Log() {
    let mystore = useHookstate(store);
    let navigate = useNavigate();
    let [sign, setSign] = useState(false);
    let [showedMessage, setShowedMessage] = useState(false);
    let [password, setPassword] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");

    let register = async () => {
        try {
            let elt = await axios.post(`${API_URL}users/register`, {
                name: username,
                email: email,
                password: password
            });
            await mystore.user.set(elt);
            navigate("/");
        }
        catch (err: any) {
            showMessage(err.response.data.error || err);
        }

    }

    let login = async () => {
        try {
            let elt = await axios.get(`${API_URL}users/login`, {
                params:
                {
                    email: email,
                    password: password
                }
            });
            await mystore.user.set(elt.data);
            navigate("/");
        }
        catch (err: any) {
            showMessage(err.response.data.error || err);
        }
    }

    let checkemail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            return 1;
        } else {
            return "Invalid Email";
        }
    }

    let checkpassword = (password: string) => {
        if (password.length > 4) {
            return 1;
        } else {
            return "Password must be at least 5 characters";
        }
    }


    let handlepassword = (evt: any) => {
        evt.preventDefault();
        setPassword(evt.target.value);
    }

    let handleusername = (evt: any) => {
        evt.preventDefault();
        setUsername(evt.target.value);
    }

    let handleemail = (evt: any) => {
        evt.preventDefault();
        setEmail(evt.target.value);
    }

    let showMessage = async (msg: string) => {
        document.querySelector("#firstChild").innerHTML = msg;
        setShowedMessage(true);
    };


    return <>
        <div className="h-screen flex min-h-full items-center flex-col bg-gray-100 justify-center px-6 py-12 lg:px-8">
            <div className="w-full max-w-md py-10 shadow-2xl shadow-black bg-white transition-transform rounded-lg" style={{ transform: `rotateY(${sign && 180 || !sign && 0}deg)` }}>
                {
                    !sign
                        ? <>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                        <div className="mt-2">
                                            <input id="email" name="email" type="email" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={handleemail} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                            <div className="text-sm">
                                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <input id="password" name="password" type="password" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={handlepassword} />
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => { login() }}>Sign in</button>
                                    </div>
                                </div>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Not a member?
                                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setSign(!sign)}>Register here</a>
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <div style={{ transform: "rotateY(180deg)" }}>
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register to our website</h2>
                                </div>

                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                            <div className="mt-2">
                                                <input id="email" name="email" type="email" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={handleemail} />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">username</label>
                                                <div className="text-sm">
                                                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <input id="password" name="password" type="text" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={username} onChange={handleusername} />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                <div className="text-sm">
                                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <input id="password" name="password" type="password" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={handlepassword} />
                                            </div>
                                        </div>

                                        <div>
                                            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => {
                                                register();
                                            }}>Sign Up</button>
                                        </div>
                                    </div>

                                    <p className="mt-10 text-center text-sm text-gray-500">
                                        Already have an account ?
                                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setSign(!sign)}>Log here</a>
                                    </p>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>

        <div id="message" className={"fixed placeholder m-4 bottom-0 right-0 h-12  min-w-56 flex bg-red-500 text-white font-[sans-serif] z-0 px-3 justify-between items-center gap-3"} style={{ transition: "all .3s linear", transform: String(((showedMessage) && "none") || (!showedMessage) && "translateY(calc(100% + 3rem))") }} ><span id="firstChild">Invalid values</span><span className={"relative flex z-20 bg-red-700 px-2  items-center text-sm rounded-full h-fit aspect-square cursor-pointer hover:bg-red-800"} onClick={(evt) => { setShowedMessage(!showedMessage) }}>X</span>
            <div className="absolute z-30 bg-black bottom-0 left-0 h-1" style={{ width: "100%" }} ></div>
        </div>
    </>
}