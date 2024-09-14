import { useNavigate } from "react-router-dom";
import { useState } from "react"

interface LinkProps {
    children: string,
    color: string,
    img: string,
    onclick: any,
}

function MyLink({ children, color, img, onclick }: LinkProps) {
    return <>
        <div className="relative cursor-pointer py-3 w-full h-12 flex gap-4 items-center pl-3 text-xl font-sans" onClick={onclick}>
            <div className="outline-gray-400 aspect-square h-full bg-center bg-cover" style={{ backgroundImage: `url("./public/${img}")` }}></div>
            <div className={color + " flex font-semibold h-full items-center"}>{children}</div>
        </div>
    </>
}

export default function Left() {

    const [position, setPosition] = useState(0);
    const nav = useNavigate();

    return <>
        <div className="border-r-8 relative lg:relative w-80 p-4 flex pt-10 flex-col gap-5" style={{ height: "calc(100vh - 2rem)" }}>
            <div className={"rounded-md absolute bg-action cursor-pointer w-full h-12 flex gap-4 items-center text-xl font-sans transition-all " + String(((position == 0) && ("top-10")) || ((position == 1) && ("top-28")) || ((position == 2) && ("top-44")) || ((position == 3) && ("top-60")))} style={{ width: "calc(100% - 2rem)" }}></div>
            <MyLink onclick={() => { setPosition(0); nav("/") }} img="home.png" color={String(((position == 0) && ("text-white")) || ((position != 0) && ("text-gray-400")))}>Home</MyLink>
            <MyLink onclick={() => { setPosition(1); nav("/events") }} img="event.png" color={String(((position == 1) && ("text-white")) || ((position != 1) && ("text-gray-400")))}>My Events</MyLink>
            <MyLink onclick={() => { setPosition(2); nav("/calendar") }} img="calendar.png" color={String(((position == 2) && ("text-white")) || ((position != 2) && ("text-gray-400")))}>Calendar</MyLink>
            <MyLink onclick={() => { setPosition(3); nav("/profile") }} img="user.png" color={String(((position == 3) && ("text-white")) || ((position != 3) && ("text-gray-400")))}>Profile</MyLink>
        </div>
    </>
}