import { useState } from "react";
import store from "../store/store";
import { useHookstate } from "@hookstate/core";
import axios from "axios";
import API_URL from "../store/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const mystore = useHookstate(store);

    const [email, setEmail] = useState(mystore.user.email.get());
    const [username, setUsername] = useState(mystore.user.name.get());
    const [pass, setPass] = useState(mystore.user.password.get());
    const navigate = useNavigate();

    const save = async () => {
        const user = await axios.put(`${API_URL}users/`,
            {
                name: username,
                email: email,
                password: pass,
            }
        );

        await mystore.user.password.set(user.password);
        await mystore.user.name.set(user.name);
        await navigate("/profile");

    }

    return <>
        <div className="relative flex flex-col gap-8 h-full items-center">
            <div className="text-2xl font-bold w-full">MY PROFILE</div>

            <div className="outline-1 w-96 max-w-full py-5 shadow-lg rounded-md outline-double h-fit flex flex-col gap-10 justify-between items-center">
                <div className="outline-double w-5/12 aspect-square rounded-full bg-accent text-action text-7xl flex items-center justify-center">{username[0].toUpperCase()}</div>

                <div>
                    <div className="h-10 flex items-center text-lg w-96 px-10 justify-between"><label className="font-bold">Email</label><input className="outline-dotted outline-1 pl-2" value={email} type="text" disabled /></div>
                    <div className="h-10 flex items-center text-lg w-96 px-10 justify-between"><label className="font-bold">Name</label><input className="outline-dotted outline-1 pl-2" value={username} type="text" onChange={(evt) => { evt.preventDefault(); setUsername(evt.target.value) }} /></div>
                    <div className="h-10 flex items-center text-lg w-96 px-10 justify-between"><label className="font-bold">Password</label><input className="outline-dotted outline-1 pl-2" value={pass} type="text" onChange={(evt) => { evt.preventDefault(); setPass(evt.target.value) }} /></div>
                </div>

                <div className="outline-1 outline py-1.5 px-6 text-lg bg-action text-white rounded-md font-semibold cursor-pointer hover:scale-105 transition-transform" onClick={save}>Save</div>
            </div>
        </div>
    </>
}