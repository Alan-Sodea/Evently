import { useHookstate } from "@hookstate/core";
import { useCallback, useEffect, useState } from "react"
import store from "../store/store";
import axios from "axios";
import API_URL from "../store/api";
import { Events, registereventList } from "../store/datas";
import { useNavigate } from "react-router-dom";



export default function Calendar() {
    const [info, setInfo] = useState(false);
    const [msg, setMsg] = useState("");
    const [month, setmonth] = useState("");
    const [year, setyear] = useState("");
    const [number, setnumber] = useState(0);
    let [eventList, setEventList] = useState([]);
    let [myeventList, setMyEventList] = useState([]);

    let navigate = useNavigate();

    const myregList = useHookstate(registereventList);
    const mystore = useHookstate(store);
    const registeredEvents = useHookstate(Events);

    let checkEvent = (event: any) => {
        for (let j = 0; j < registeredEvents.get().length; j++) {

            if (registeredEvents[j].eventId.get() == event.id) {
                return true;
            }
        }
        for (let p = 0; p < myeventList.length; p++) {

            if (myeventList[p].title == event.title) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        const fetchevents = async () => {
            let els;
            els = await axios.get(`${API_URL}events/list`);

            setEventList(els.data);
        };

        fetchevents().catch((error) => {
            console.error({ error })
        });
    }, [])


    useEffect(() => {
        const fetchevents = async () => {
            let els;
            els = await axios.get(`${API_URL}events/me`, {
                params: {
                    email: mystore.user.email.get()
                }
            });;
            setMyEventList(els.data);
        };
        fetchevents().catch((error) => {
            console.error({ error })
        });
    }, [])

    let fetchevents = useCallback(async () => {
        let elt = await axios.get(`${API_URL}register/`, {
            params: {
                userId: await mystore.user.id.get(),
            }
        });
        await registeredEvents.set(elt.data);
        let a = await eventList.filter(checkEvent);

        await myregList.set(a);
        console.log({ reg: myregList.get() });
    })

    useEffect(() => {
        fetchevents().then(() => {
            // console.log({ elt: myregList.get() });
        }).catch((err) => {
            console.error(err);
        })
    })

    const isinfo = (day: number): boolean | String => {

        let date = (String(day).padStart(2, '0') + "/" + month.padStart(2, '0') + "/" + year)
        if (checkDay(date)) {
            setInfo(true);
            setMsg(eventList.filter((event) => event.date == date)[0].title)
        }
        else {
            setInfo(false);
            return false
        }
        return true;
    }

    const getDayOfWeekIndex = (dateString: string) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        let dayOfWeek = date.getDay();
        return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    };

    const checkDay = (day: string) => {
        for (let i = 0; i < myregList.get().length; i++) {
            if (day == myregList[i].date.get()) {
                if (day == "14/02/2008") console.log("qsd");
                return true;
            }
        }
        return false;

    }

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        setnumber(getDayOfWeekIndex(`01/${month}/${year}`));
    });

    return <>

        <div className="relative flex flex-col gap-8 h-full">

            <div className="flex justify-between">
                <div className="text-2xl font-bold">MY CALENDAR</div>

                <div className={"placeholder w-fit px-5 py-2 rounded-sm shadow-xl cursor-pointer text-white bg-action font-bold  " + String((info && "block") || (!info && "hidden"))} onClick={() => { mystore.theevent.set(eventList.filter((elt) => elt.title == msg)[0]); navigate("/event") }}>{msg}</div>

            </div>

            <div className="h-full mb-10 flex flex-col">
                <div className="border-2 bg-accent border-double flex justify-center px-5 h-fit py-3 text-center font-bold text-action text-xl rounded-t-lg ">
                    {/* <div className="outline-double h-10 flex flex-col items-center pt-0.5 shadow-lg shadow-action rounded-full font-extrabold text-2xl aspect-square text-accent bg-action cursor-pointer">{"<"}</div> */}
                    <div className="flex items-center justify-center gap-10">
                        <input className="bg-transparent outline-action outline-dotted outline-1 px-3 w-28 text-center placeholder-shown:w-40 transition-all" placeholder="Month : 01" value={month} onChange={(evt) => { evt.preventDefault(); setmonth(evt.target.value) }} type="text" /><input value={year} onChange={(evt) => { evt.preventDefault(); setyear(evt.target.value) }} className="bg-transparent outline-action outline-dotted outline-1 px-3 text-center w-28 placeholder-shown:w-36 transition-all" placeholder="Year : 2024" type="text" />
                    </div>
                    {/* <div className="outline-double h-10 flex flex-col items-center pt-0.5 shadow-lg shadow-action rounded-full font-extrabold text-2xl aspect-square text-accent bg-action cursor-pointer">{">"}</div> */}
                </div>


                <div className="pt-3 h-fit grid grid-cols-7">
                    {
                        ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((item, key) => <div key={key} className="h-fit flex items-center  justify-center">
                            <div className={"w-2/3 bg-action h-10 shadow-lg rounded-sm flex items-center justify-center text-lg text-white font-bold "}>{item}</div>
                        </div>)
                    }
                </div>

                <div className=" h-fit grid grid-cols-7">
                    {
                        Array(number).fill(0).map((elt, index) => {
                            return <div key={index}></div>
                        })
                    }
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((item, key) => <div key={key} className="aspect-square h-fit flex items-center justify-center">
                            <div className={"outline-double w-2/3 aspect-square shadow-lg rounded-sm cursor-pointer hover:scale-105 transition-all transition-transform transition-colors flex items-center justify-center text-3xl font-bold " + (String(checkDay((String(item).padStart(2, '0') + "/" + month.padStart(2, '0') + "/" + year)) && "bg-accent text-action") || (!checkDay((String(item).padStart(2, '0') + "/" + month.padStart(2, '0') + "/" + year)) && "bg-white"))} onClick={() => isinfo(item)}>{item}</div>
                        </div>
                        )
                    }

                </div>
            </div>

        </div >
    </>
}