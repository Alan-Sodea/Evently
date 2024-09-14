import axios from "axios";
import API_URL from "../store/api";
import { useEffect, useState } from "react";
import store from "../store/store";
import { useHookstate } from "@hookstate/core";

interface PropsEvent {
    imageUrl: string;
    title: string;
    messages: any[];
    date: string;
}

export default function Event() {

    let mystore = useHookstate(store);
    let [messages, setMessages] = useState([]);
    let [newmessage, setNewmessage] = useState("");
    let [users, setUsers] = useState([]);
    let [myId, setMyId] = useState([mystore.user.id.get()]);
    // let [users, setUsers] = {}

    let postMessage = async () => {
        await axios.post(`${API_URL}messages/`, {
            email: await mystore.user.email.get(),
            text: newmessage,
            eventId: await mystore.theevent.id.get()
        })
        setNewmessage("");
    }

    useEffect(() => {
        (async () => {
            let values = await axios.get(`${API_URL}users/`);
            values = await values.data;
            values = await values.user;
            setUsers(values);
        })();

    }, [])

    let getusername = (id) => {
        return users.filter((user) => id == user.id)[0].name;
    }

    useEffect(() => {
        let getMessage = async () => {
            let message = await axios.get(`${API_URL}messages/`, {
                params: {
                    eventId: await mystore.theevent.id.get(),
                }
            })
            setMessages(message.data);
        }

        getMessage().catch((error) => {
            console.log({ error })
        })
    }, [messages])

    return <>
        <div className="h-full relative">
            <div className="relative w-full h-56 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("./event.jpg")' }}>
                <div className="absolute top-5 h-fit w-fit left-5 text-white font-helvetica  text-4xl font-bold " style={{ textShadow: "3px 3px 3px black" }}>{mystore.theevent.title.get().toUpperCase()}</div>
                <div className="absolute h-12
                 w-full bottom-0 text-center text-white flex items-center justify-center text-xl font-helvetica"  style={{ background: "linear-gradient(to top, black, rgba(0, 0, 0, .4))" }}>
                    <p>{mystore.theevent.desc.get()}</p>
                </div>
            </div>
            <div className="mt-3 py-5 px-32">
                <div className="w-full min-h-10 flex flex-col gap-3 mb-28">

                    {
                        messages.map((message, index) => {
                            return <>

                                {

                                    (myId == message.userId)
                                        ?
                                        <div key={index} className="flex justify-end w-full">
                                            <div className="py-1 px-3 bg-action text-white rounded-md h-fit w-fit shadow-lg">
                                                <p>{message.text}</p>
                                                <div className="text-right font-bold text-sm">You</div>
                                            </div>
                                        </div>
                                        :
                                        <div key={index} className="flex w-full">
                                            <div className="py-1 px-3 bg-accent text-white rounded-md h-fit w-fit shadow-lg">
                                                <p>{message.text}</p>
                                                <div className="text-right font-bold text-sm">@{getusername(message.userId)}</div>
                                            </div>
                                        </div>

                                }

                            </>
                        })
                    }

                </div>
            </div>


            <div className="outline bg-white outline-1 fixed items-center bottom-10 gap-3 px-2 w-full h-10 flex rounded-3xl" style={{ width: "calc(100% - 23rem)" }}>
                <input type="text" className="outline-none h-3/4 w-full" value={newmessage} onChange={(evt) => { evt.preventDefault(); setNewmessage(evt.target.value) }} />
                <div className="right-1  aspect-square rounded-full bg-action hover:bg-blue-800 transition-colors cursor-pointer bottom-0 h-4/5" onClick={postMessage} ></div>
            </div>
        </div >
    </>
}