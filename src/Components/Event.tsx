import axios from "axios";
import API_URL from "../store/api";
import { useEffect, useState } from "react";
import store from "../store/store";
import { useHookstate } from "@hookstate/core";
import { useNavigate } from "react-router-dom";

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
    let [dateShow, setDateShow] = useState(false);
    let [newDate, setNewDate] = useState("");
    let [paymentId, setPaymentId] = useState("");
    let [paymentIdShow, setPaymentIdShow] = useState(false);
    let [paymentIdErrorShow, setPaymentIdErrorShow] = useState(false);
    let [correctShow, setCorrectShow] = useState(false);
    let [myId, setMyId] = useState([mystore.user.id.get()]);
    let [creator, setCreator] = useState("");
    const navigate = useNavigate();
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
        console.log("aze")
    })

    let getuseremail = (id: number) => {
        return users.filter((user) => id == user.id)[0].email;
    }


    useEffect(() => {
        console.log("qsd");
        (async () => {
            let values = await axios.get(`${API_URL}users/`);
            values = await values.data;
            values = await values.user;
            setUsers(values);
        })();

        (async () => {
            // console.log(mystore.theevent.userId.get());
            console.log(users);
            setCreator(getuseremail(mystore.theevent.userId.get()))
        })();
    })

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

    let check_payment = (index) => {
        if (index.length == 16) {
            return true
        }
        return false
    }

    return <>
        {(mystore.user.id.get() == mystore.theevent.userId.get())
            ?
            <>
                <div className="z-50 fixed h-16 w-full left-0 flex justify-center transition-transform" style={{ top: "calc((100% - 3rem) / 2 )", transform: String((!dateShow && "translateX(calc(50vw + 30rem))") || (dateShow && "translateX(0)")) }}>
                    <div className="relative bg-blue-200 px-8 gap-2 py-4 flex shadow-lg shadow-black rounded-md">
                        <input type="text" className="h-full py-1 px-2 font-helvetica text-lg font-semibold outline-2 rounded-sm outline" placeholder="Date" value={newDate} onChange={(evt) => { evt.preventDefault(); setNewDate(evt.target.value) }} />
                        <div className="outline outline-1 aspect-square rounded-full bg-green-600 transition-colors hover:bg-green-300 cursor-pointer" onClick={async () => {
                            await axios.get(`${API_URL}events/changes`, {
                                params: {
                                    id: mystore.theevent.id.get(),
                                    email: mystore.user.email.get(),
                                    date: newDate,
                                }
                            });
                            setDateShow(false);
                        }}></div>

                        <div className="outline outline-1 aspect-square rounded-full bg-red-400 transition-colors hover:bg-red-600 cursor-pointer" onClick={() => { setDateShow(false) }}></div>
                    </div>
                </div>

                <div className="z-50 fixed h-16 w-full left-0 flex justify-center transition-transform" style={{ top: "calc((100% - 3rem) / 2 )", transform: String((!correctShow && "translateX(calc(50vw + 30rem))") || (correctShow && "translateX(0)")) }}>
                    <div className="relative bg-blue-200 px-8 gap-2 py-4 flex shadow-lg shadow-black rounded-md">
                        <p className="h-full py-1 px-2 font-helvetica text-lg font-semibold">Are you sure you want to delete event</p>
                        {/* <input type="text" className="h-full py-1 px-2 font-helvetica text-lg font-semibold outline-2 rounded-sm outline" placeholder="Date" value={newDate} onChange={(evt) => { evt.preventDefault(); setNewDate(evt.target.value) }} /> */}
                        <div className="outline outline-1 aspect-square rounded-full bg-green-600 transition-colors hover:bg-green-300 cursor-pointer" onClick={async () => {
                            axios.delete(`${API_URL}events/`, {
                                params: {
                                    email: mystore.user.email.get(), id: mystore.theevent.id.get()
                                }
                            });
                            navigate("/")
                        }
                        }>
                        </div>

                        <div className="outline outline-1 aspect-square rounded-full bg-red-400 transition-colors hover:bg-red-600 cursor-pointer" onClick={() => { setCorrectShow(false) }}></div>
                    </div>
                </div>

                <div className="z-50 fixed h-16 w-full left-0 flex justify-center transition-transform" style={{ top: "calc((100% - 3rem) / 2 )", transform: String((!paymentIdShow && "translateX(calc(50vw + 30rem))") || (paymentIdShow && "translateX(0)")) }}>

                    <div className="relative bg-blue-200 px-8 gap-2 py-4 flex shadow-lg shadow-black rounded-md rounded-t-none">
                        <div className={"z-10  absolute -top-0 bg-red-600 py-1 bg-red left-0 transition-opacity " + String((paymentIdErrorShow && ("w-full")) || (!paymentIdErrorShow && ("w-0")))} style={{ transition: String((!paymentIdErrorShow && "all linear 5s") || (paymentIdErrorShow && "none")) }}></div>
                        <div className="relative z-20 h-full flex items-center"><p className="text-lg font-bold font-helvetica">Card Id :</p></div>
                        <input type="text" className="h-full py-1 px-2 font-helvetica text-lg font-semibold outline-2 rounded-sm outline" placeholder="165989898787878" value={paymentId} onChange={(evt) => { evt.preventDefault(); setPaymentId(evt.target.value) }} />
                        <div className="h-full flex items-center mr-5"><p className="text-lg font-bold font-helvetica">{"( 100$ )"}</p></div>
                        <div className="outline outline-1 aspect-square rounded-full bg-green-600 transition-colors hover:bg-green-300 cursor-pointer" onClick={async () => {
                            let ch = check_payment(paymentId);
                            if (ch) {
                                await axios.get(`${API_URL}events/changes`, {
                                    params: {
                                        id: mystore.theevent.id.get(),
                                        email: mystore.user.email.get(),
                                        certified: !mystore.theevent.certified.get(),
                                    }
                                });
                                setPaymentIdShow(false);
                            }
                            else {
                                setPaymentIdErrorShow(true);
                                setTimeout(() => {
                                    setPaymentIdErrorShow(false);
                                }, 100)

                            }
                        }}></div>

                        <div className="outline outline-1 aspect-square rounded-full bg-red-400 transition-colors hover:bg-red-600 cursor-pointer" onClick={() => { setPaymentIdShow(false) }}></div>
                    </div>
                </div>
            </>

            : <></>
        }

        <div className="h-full relative">
            <div className="relative w-full h-56 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("./event.jpg")' }}>
                <div className="absolute top-5 h-fit w-fit left-5 text-white font-helvetica  text-4xl font-bold " style={{ textShadow: "3px 3px 3px black" }}>{mystore.theevent.title.get().toUpperCase()}</div>
                <div className="absolute right-5 top-5 text outline-1 outline px-4 py-1 bg-accent rounded-md"><p className="text-lg font-helvetica font-bold text-white"><span className="text-lg text-action">Creator <span className="mx-3">:</span></span>{creator}</p></div>
                <div className="absolute h-12 w-full bottom-0 text-center text-white flex items-center justify-center text-xl font-helvetica" style={{ background: "linear-gradient(to top, black, rgba(0, 0, 0, .4))" }}>
                    <p>{mystore.theevent.desc.get()}</p>
                </div>
            </div>
            <div className="mt-3 py-5 px-32 relative">

                {(mystore.user.id.get() == mystore.theevent.userId.get())
                    ?
                    <>
                        <div className="absolute w-10 aspect-square bg-orange-300 top-0 right-0 transition-colors rounded-md hover:bg-orange-500 cursor-pointer" onClick={() => { setPaymentIdShow(true); }}></div>
                        <div className="absolute w-10 aspect-square bg-blue-400 top-12 right-0 transition-colors rounded-md hover:bg-blue-500 cursor-pointer" onClick={() => { setDateShow(true); }}></div>
                        <div className="absolute w-10 aspect-square bg-red-400 top-24 right-0 transition-colors rounded-md hover:bg-red-500 cursor-pointer" onClick={() => { setCorrectShow(true) }}></div>
                    </>

                    :
                    <></>
                }

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
                                                <div className="mt-2 text-right font-bold text-sm">You</div>
                                            </div>
                                        </div>
                                        :
                                        (message.userId == mystore.theevent.userId.get())
                                            ?
                                            <div key={index} className="flex w-full">
                                                <div className="py-1 px-3 bg-black text-white rounded-md h-fit w-fit shadow-lg">
                                                    <p>{message.text}</p>
                                                    <div className="mt-2 text-right font-bold text-sm">{"admin  :  "}{getuseremail(message.userId)}</div>
                                                </div>
                                            </div>
                                            : <div key={index} className="flex w-full">
                                                <div className="py-1 px-3 bg-accent text-white rounded-md h-fit w-fit shadow-lg">
                                                    <p>{message.text}</p>
                                                    <div className="mt-2 text-right font-bold text-sm">{getuseremail(message.userId)}</div>
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