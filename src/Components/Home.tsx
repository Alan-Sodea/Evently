import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../store/api"
import store from "../store/store";
import { hookstate, useHookstate } from "@hookstate/core";
import { filter_attr, Events, registereventList } from "../store/datas";

// let myregList = hookstate([]);
// let Events = hookstate([]);

interface PropsEventCard {
    title: string,
    date: string,
    desc: string,
    urlImg: string,
    id: number,
    userId: number,
    certified: boolean,
    onClick: any,
}

function EventCard({ onClick, title, date, desc, urlImg, id, userId, certified }: PropsEventCard) {

    const [islogged, setIslogged] = useState(true);
    const mystore = useHookstate(store);
    const registeredEvents = useHookstate(Events);

    let fetchevents = useCallback(async () => {
        let elt = await axios.get(`${API_URL}register/`, {
            params: {
                userId: await mystore.user.id.get(),
            }
        });
        await registeredEvents.set(elt.data);
    })

    let register = async (eventId) => {
        let elt = await axios.post(`${API_URL}register/`, {
            userId: await mystore.user.id.get(),
            eventId: eventId,
        });
        fetchevents().then(() => {
        }).catch((err) => {
            console.error(err);
        })
    }

    let checkregistered = (userId, eventId) => {
        let table = registeredEvents.get();
        for (let i = 0; i < table.length; i++) {
            if (userId == table[i].userId && eventId == table[i].eventId) {
                return true
            }
        }
        return false;
    }

    let unjoin = async (eventId) => {
        let elt = await axios.delete(`${API_URL}register/`,
            {
                params:
                {
                    userId: await mystore.user.id.get(),
                    eventId: eventId,
                }
            });

        fetchevents().then(() => {
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        (async () => {
            await setIslogged(checkregistered(mystore.user.id.get(), id));
        })()
    })


    return <>
        <div className="relative rounded-md p-3 flex flex-col gap-3 shadow-2xl outline-dotted outline-1 outline-gray-600 h-fit">
            {/* <div className="theme text-sm px-2 py-1 w-fit rounded-md text-action font-medium bg-action-light">Business</div> */}

            {
                certified
                    ? <div className="absolute w-4 aspect-square bg-action m-2 right-0 top-0 rounded-full"></div>
                    : <></>
            }
            <div className="flex flex-col">
                <div className="text-black font-semibold font-helvetica">{title}</div>
                <div className="max-h-14 h-fit overflow-hidden text-gray-600 text-sm">{desc}</div>
            </div>
            <div className={"img placeholder h-24 rounded-md bg-center bg-cover" + String(((islogged || (userId == mystore.user.id.get())) && " cursor-pointer") || (!(islogged || (userId == mystore.user.id.get())) && " cursor-not-allowed"))} style={{ backgroundImage: `url('${urlImg}')` }} onClick={() => {
                if (islogged || (userId == mystore.user.id.get())) { onClick() } else { }
            }}></div>
            <div className="flex justify-between h-fit">
                <div className="flex gap-2 justify-between w-full py-1.5" >
                    <div className="bg-gray-200 h-full aspect-square bg-center bg-contain" style={{ backgroundImage: "url('./../public/calendar.png')" }}></div>
                    <div className="h-full text-gray-600 text-xs">{date}</div>
                </div>
            </div>
            {
                mystore.user.id.get() == userId
                    ? <div className={"outline outline-1 shadow-md shadow-gray-300 h-fit flex items-center justify-center rounded-sm font-bold py-0.5 transition-colors bg-gray-200 text-gray-500 cursor-not-allowed"}>You're the creator</div>
                    : <div className={"outline outline-1 shadow-md shadow-action h-fit flex items-center justify-center rounded-sm font-bold cursor-pointer py-0.5 transition-colors  " + String((islogged && "bg-gray-200 text-gray-500 hover:bg-gray-400 hover:text-white") || (!islogged && "bg-action hover:bg-blue-900 text-white"))} onClick={() => { if (!islogged) { register(id) } else { unjoin(id) } }}>{(islogged && "Unjoin") || (!islogged && "Join")}</div>
            }

        </div>
    </>
}

interface PropsHome {
    ishome: boolean;
}



export default function Home({ ishome }: PropsHome) {
    let [which, setWhich] = useState("Later");
    let fil = useHookstate(filter_attr)
    let [eventList, setEventList] = useState([]);
    const mystore = useHookstate(store);
    let myregList = useHookstate(registereventList);
    const registeredEvents = useHookstate(Events);

    let setRegisteredEvents = (val: any) => {
        registeredEvents.set(val)
    };


    let fetchevents = useCallback(async () => {
        let elt = await axios.get(`${API_URL}register/`, {
            params: {
                userId: await mystore.user.id.get(),
            }
        });
        await registeredEvents.set(elt.data);
    })

    let register = async (eventId) => {
        let elt = await axios.post(`${API_URL}register/`, {
            userId: await mystore.user.id.get(),
            eventId: eventId,
        });
        fetchevents().catch((err) => {
            console.error(err);
        })
    }

    let checkregistered = (userId, eventId) => {
        for (let i = 0; i < registeredEvents.length; i++) {
            if (userId === registeredEvents[i].userId && eventId === registeredEvents[i].eventId) {
                return true
            }
        }
        return false;
    }

    let unjoin = async (eventId) => {
        let elt = await axios.delete(`${API_URL}register/`, {
            params:
            {
                userId: await mystore.user.id.get(),
                eventId: eventId,
            }
        });

        fetchevents().catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        fetchevents().then(() => {
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    const getDayOfWeekIndex = (dateString: string) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        let dayOfWeek = date.getDay();
        return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    };

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        myregList.set(eventList.filter(event => {
            for (let i = 0; i < registeredEvents.get().length; i++) {
                if (registeredEvents[i].eventId.get() == event.id) { return true; } return false;
            }
        }));

    }, [registeredEvents.get()])


    useEffect(() => {
        const fetchevents = async () => {
            let els;
            if (ishome) els = await axios.get(`${API_URL}events/list`);
            else {
                els = await axios.get(`${API_URL}events/me`, {
                    params: {
                        email: mystore.user.email.get()
                    }
                });
            }
            setEventList(els.data);
        };

        fetchevents().catch((error) => {
            console.error({ error })
        });
    })

    const navigate = useNavigate();

    return <>

        <div className="text-2xl font-bold">ALL {(((ishome) && "THE") || ((!ishome) && "YOUR"))} EVENTS</div>
        <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold flex flex-start gap-4 w-full">
                {ishome
                    ? <>
                        <div className={String(((which == "Soon") && ("text-action")) || ((which == "Later") && ("text-gray-400"))) + " transition-colors pb-1 cursor-pointer"} onClick={() => { setWhich("Soon"); }}>
                            <div>Soon</div>
                            <div className={String(((which == "Soon") && ("w-full")) || ((which == "Later") && ("w-0"))) + " elt h-1 bg-action transition-all"}></div>
                        </div>

                        <div className={String(((which == "Later") && ("text-action")) || ((which == "Soon") && ("text-gray-400"))) + " transition-colors pb-1 cursor-pointer flex flex-col items-end"} onClick={() => { setWhich("Later") }}>
                            <div>All</div>
                            <div className={String(((which == "Later") && ("w-full")) || ((which == "Soon") && ("w-0"))) + " elt h-1 bg-action transition-all flex self-right"}></div>
                        </div>
                    </>
                    : <></>
                }

            </div>

            <div className="mb:grid-cols-1 sm:grid-cols-1 xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 grid 2xl:grid-cols-6">
                {


                    which == "Soon"
                        ? eventList.filter((event) => (event.date.slice(event.date.length - 7, event.date.length) == getCurrentDate().slice(event.date.length - 7, event.date.length))).filter((elt) => { return ((elt.title.split(" ").join("").toLowerCase().indexOf(fil.get().split(" ").join("").toLowerCase()) != -1) || (elt.date.indexOf(fil.get()) != -1)) }).map((event) => <EventCard certified={event.certified} userId={event.userId} id={event.id} key={event.id} title={event.title} date={event.date} urlImg={event.urlImg} desc={event.desc} onClick={() => { navigate("/event"); mystore.theevent.set(event) }} />)
                        : eventList.filter((elt) => { return ((elt.title.split(" ").join("").toLowerCase().indexOf(fil.get().split(" ").join("").toLowerCase()) != -1) || (elt.date.indexOf(fil.get()) != -1)) }).map((event) => <EventCard certified={event.certified} userId={event.userId} key={event.id} id={event.id} title={event.title} date={event.date} urlImg={event.urlImg} desc={event.desc} onClick={() => { navigate("/event"); mystore.theevent.set(event) }} />)
                }
            </div>
        </div >
    </>
}
