import "./../App.Css"
import Home from "./Home"
import Calendar from "./Calendar"
import Profile from "./Profile"
import Event from "./Event"
import Log from "./Log"
import { Routes, Route } from "react-router-dom"


export default function Right() {


    return <>
        <div className="w-80 flex flex-col gap-8 px-8 py-10 overflow-scroll" style={{ width: "calc(100% - 19rem)", height: "calc(100vh - 2rem)" }}>


            <Routes>
                <Route path="/" element={<Home ishome={true} />}></Route>
                <Route path="/calendar" element={<Calendar />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/events" element={<Home ishome={false} />}></Route>
                <Route path="/event" element={<Event />}></Route>
                <Route path="/log" element={<Log />}></Route>
            </Routes>

        </div >
    </>
}

