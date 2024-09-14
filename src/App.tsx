import './App.css'
import Left from "./Components/Left";
import Home from "./Components/Home"
import { useEffect } from 'react';
import Calendar from "./Components/Calendar"
import Profile from "./Components/Profile"
import Event from "./Components/Event"
import Log from "./Components/Log";
import store from "./store/store";
import Navbar from "./Components/Navbar";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';

interface PropsPage {
  element: any,
}

function Page({ element }: PropsPage) {

  const mystore = useHookstate(store);
  const navigate = useNavigate();
  useEffect(() => {
    if ({ ...mystore.user.get() }.name == undefined) {
      navigate("/log");
    }
  }, [])

  return <>
    {
      ({ ...mystore.user.get() }.name != undefined)

        ?
        <div className='w-screen h-screen overflow-hidden flex flex-col'>
          <Navbar></Navbar>

          <div className='main flex gap-1'>
            <Left></Left>

            <div className="w-80 flex flex-col gap-8 px-8 py-10 overflow-scroll" style={{ width: "calc(100% - 19rem)", height: "calc(100vh - 2rem)" }}>
              {element}
            </div >
          </div>
        </div>
        : <></>
    }
  </>
}

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/log" element={<Log />}></Route>
        <Route path='/' element={<Page element={<Home ishome={true} />} />} />
        <Route path='/calendar' element={<Page element={<Calendar />} />} />
        <Route path='/profile' element={<Page element={<Profile />} />} />
        <Route path='/events' element={<Page element={<Home ishome={false} />} />} />
        <Route path='/event' element={<Page element={<Event />} />} />
        <Route path='/log' element={<Page element={<Log />} />} />
      </Routes>
    </>
  )
}

