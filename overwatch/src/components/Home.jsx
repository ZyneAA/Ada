import Sidebar from './Sidebar';
import StatsCard from './StatsCard';
import OrderReport from './OrderReport';
import Lang_Report from "./Lang_Report"
import Search_User from './Search_User';
import Most_Used_Langs from './Most_Used_Langs';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {

    const[change, set_chnage] = useState(1)

    const location = useLocation()
    const { login } = location.state || null

    useEffect(() => {

        console.log(login)

    }, [])

    const handeler = (val) => {

        set_chnage(val)

    }

    return (<div className="flex w-full min-h-screen font-sans bg-gray-800">
        <main className="flex flex-col flex-1 gap-6 p-4">
            <header>
                <h1 className="text-3xl font-semibold leading-loose text-white">Overwatch Admin Pannel<br></br></h1>
            </header>
            <hr className="border-gray-700" />
            <StatsCard 
                change={handeler}
            />
            {
                change == 1 ?
                <OrderReport /> :
                change == 3 ?
                <Lang_Report /> :
                <></>
            }

        </main>
        <aside className="flex flex-col gap-y-6 pt-6 pr-6 w-96">
            <div className='text-right'>
                <a href='/login'><button className='text-white border p-2 rounded-lg mb-10'>Logout</button></a>
            </div>
            <Search_User />
            <Most_Used_Langs />
        </aside>
    </div>)

}

export default Home