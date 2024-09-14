import { useEffect, useState } from "react";
import API_URL from "../store/api";
import store from "../store/store";
import { hookstate, none, useHookstate } from "@hookstate/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { filter_attr } from "../store/datas";
const show = hookstate(false);

function RegisterEvent() {
    let [showedMessage, setShowedMessage] = useState(false);
    let [title, setTitle] = useState("");
    let [date, setDate] = useState("");
    let [value, setValue] = useState("");
    let mystore = useHookstate(store)
    const theshow = useHookstate(show);

    let showMessage = async (msg: string) => {
        document.querySelector("#firstChild").innerHTML = msg;
        setShowedMessage(true);
    };

    let handleTitle = (evt: any) => {
        evt.preventDefault();
        setTitle(evt.target.value);
    }

    let handleDate = (evt: any) => {
        evt.preventDefault();
        setDate(evt.target.value);
    }

    let createEvent = async () => {

        if (value == "" || title == "" || date == "") await showMessage("All inputs have to be filled");
        else if (value.length > 50) await showMessage("Desctiption have to be up to 50 characters long");
        else if ((!/[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/.test(date)) || (date[0] == "3" && parseInt(date[1]) > 1) || (date[3] == "1" && parseInt(date[4]) > 2)) await showMessage("Invalid Date");
        else {
            axios.post(`${API_URL}events/`, {
                email: { ...mystore.user.get() }.email,
                title,
                desc: value,
                date,
                urlImg: "./event.jpg",
            }); theshow.set(false); setShowedMessage(false);
        }

    }

    return <>
        <div className={"absolute top-0 left-0 h-screen w-screen flex justify-center items-center transition-opacity " + String(theshow.get() && "opacity-100" || !theshow.get() && "opacity-0 hidden")}>
            <div className="absolute p-0 top-3 right-16 h-10 aspect-square rounded-full z-20 bg-red-600 hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center" onClick={() => theshow.set(false)}>
                <div className="h-fit aspect-square font-bold text-white">X</div>
            </div>
            <div className="bg-black opacity-50 z-10 absolute top-0 left-0 w-screen h-screen transition-all "></div>

            <div className="relative h-fit bg-gray-300 rounded-lg z-20 w-1/2 p-4">
                <div className="outline-1 h-full flex gap-3">
                    <div className="relative justify-between flex flex-col gap-10 outline-1 h-full w-1/2 p-10">
                        <div className="flex flex-col gap-3">
                            <div className="font-garamond font-bold text-lg h-10 flex justify-between items-center gap-2">
                                <div className="w-fit px-2">Title : </div>
                                <input className="bg-transparent border-b-1 w-60 md:w-7/12 px-2 dnone" value={title} onChange={handleTitle} style={{ borderBottom: "1px solid black" }} />
                            </div>

                            <div className="font-garamond font-bold text-lg h-10 flex justify-between items-center gap-2">
                                <div className="w-fit px-2">Date : </div>
                                <input className="bg-transparent border-b-1 w-60 md:w-7/12 px-2 dnone" value={date} onChange={handleDate} style={{ borderBottom: "1px solid black" }} />
                            </div>

                            <div className="font-garamond font-bold text-lg flex flex-col justify-between items-center gap-2" style={{ height: "calc(100% - 3.75rem -  3.75rem - 5.25rem)" }}>
                                <div className="w-full">
                                    <div className="w-fit px-2">Description</div>
                                </div>
                                {/* <div id="desc" contentEditable={true} className="w-full h-60 p-1 relative dnone" style={{ border: "1px solid black" }}>
                                </div> */}
                                <label>
                                    <textarea value={value} name="postContent" className="bg-transparent outline outline-1 h-full w-full p-2" onChange={(evt) => { evt.preventDefault(); setValue(evt.target.value) }} />
                                </label>
                            </div>
                        </div>
                        <button className="border-1 hover:bg-blue-800 transition-all cursor-pointer border border-black py-1 text-lg bottom-8 right-8 h-fit w-fit px-4 bg-action text-white font- semibold font-garamond flex items-center justify-center rounded-md" onClick={() => { createEvent() }}>Create</button>


                    </div>
                    <div className="w-1/2 aspect-square p-10">
                        <div className="outline-1 outline-dashed h-full"></div>
                    </div>
                </div>
            </div>

            <div id="message" className={"fixed m-4 bottom-0 right-0 h-12  min-w-56 flex bg-red-500 text-white font-[sans-serif] z-50 px-3 justify-between items-center gap-3"} style={{ transition: "all .3s linear", transform: String(((showedMessage) && "none") || (!showedMessage) && "translateY(calc(100% + 3rem))") }} ><span id="firstChild">Invalid values</span><span className={"relative flex z-20 bg-red-700 px-2  items-center text-sm rounded-full h-fit aspect-square cursor-pointer hover:bg-red-800"} onClick={(evt) => { theshow.set(false) }}>X</span>
                <div className="absolute z-30 bg-black bottom-0 left-0 h-1" style={{ width: "100%" }} ></div>
            </div>
        </div>

    </>
}


export default function NavBar() {
    const fil = useHookstate(filter_attr);
    const mystore = useHookstate(store);
    const theshow = useHookstate(show);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    let [profileCard, setProfileCard] = useState(false)

    return <>
        <div className="w-full h-16 p-4 flex items-center justify-between">
            <div className="h-full aspect-square">
                {/* <img className="h-full" src="./../src/assets/react.svg" /> */}
                <div className="flex h-ull items-center text-4xl font-serif font-bold">E<span className="text-action">v</span>e<span className="text-action">n</span>t<span className="text-action">l</span>y</div>
            </div>
            <div className="h-full py-0.5 flex flex-end gap-1 outline-dotted outline-action outline-1 overflow-hidden" style={{ transition: "all ease-in-out 1s", width: String(expanded && "2rem" || (!expanded) && "24rem") }}>
                <div className="ml-1 aspect-square my-0.5 bg-center bg-no-repeat bg-contain cursor-pointer" style={{ backgroundImage: "url('./../public/search.svg')" }} onClick={() => setExpanded(!expanded)}></div>
                <input type="text" className="outline-none h-full pl-2 w-96 dnone font-garamond font-bold" value={fil.get()} onChange={(evt) => { evt.preventDefault(); fil.set(evt.target.value) }} />
            </div>
            <div className="flex gap-5 h-full">
                <div className="outline-double rounded-sm h-full aspect-square bg-action-light text-action ouline-double outline-1 flex justify-center items-center font-bold cursor-pointer" onClick={() => theshow.set(true)}><span className="scale-150">+</span></div>
                <div className="text-xl outline-double rounded-full h-full aspect-square bg-action-light text-action ouline-double outline-1 flex justify-center items-center cursor-pointer" onClick={() => { setProfileCard(true) }}>A</div>
                <div className={"placeholder z-50 fixed gap-3 w-48 aspect-square rounded-md bg-action-light py-5 flex items-center flex-col justify-between shadow-lg top-20 right-5 transition-all " + String((profileCard && "translate-x-0") || (!profileCard && "translate-x-96"))}>
                    <div className="outline outline-2 outline-white w-1/2 aspect-square bg-blue-700 rounded-full flex items-center justify-center text-white font-bold font-helvetica"><p className="scale-150 text-4xl">{mystore.user.name.get()[0].toUpperCase()}</p></div>
                    <div className="text-xl text-black font-bold font-helvetica">@{mystore.user.name.get()}</div>
                    <div className="outline outline-1 outline-accent px-4 py-1 rounded-sm bg-action text-black font-bold cursor-pointer hover:bg-blue-700 hover:text-white transition-all" onClick={() => { mystore.user.set(none); navigate("/log") }}>Log out</div>
                    <div onClick={() => { setProfileCard(false) }} className="h-5 aspect-square bg-red-500 hover:bg-red-700 transition-colors rounded-full abolute flex items-center justify-center p-2 py-4 font-bold absolute top-2 right-2 cursor-pointer">x</div>
                </div>
            </div>
        </div >

        {
            theshow && <RegisterEvent />
        }

    </>
}