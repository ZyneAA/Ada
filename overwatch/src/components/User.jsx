import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
    const { user_id } = useParams();

    const [user, set_user] = useState({});
    const [exe, set_exe] = useState([]);
    const [visit_log, set_visit_log] = useState({});
    const [visibleCount, set_visibleCount] = useState(15);
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        const get_user = async () => {
            try {
                const user = await axios.get(
                    `http://localhost:8000/bridge/v1/labyrinth/check_user_exist_by_id?id=${user_id}`
                );
                set_user(user.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const get_exe = async () => {
            try {
                const exe = await axios.get(
                    `http://localhost:8000/bridge/v1/labyrinth/get_exe_data_by_user_id?user_id=${user_id}`
                );
                set_exe(exe.data);
            } catch (error) {
                console.error('Error fetching execution data:', error);
            }
        };

        const get_visitation = async () => {
            try {
                const visit = await axios.get(
                    `http://localhost:8000/bridge/v1/labyrinth/get_visitations_by_user_id?user_id=${user_id}`
                );
                console.log(visit.data[0].last_login)
                set_visit_log(visit.data[0]);
            } catch (error) {
                console.error('Error fetching visit data:', error);
            }
        };

        get_user();
        get_exe();
        get_visitation();

        set_loading(false)

    }, [user_id]);

    const loadMore = () => {
        set_visibleCount(prevCount => prevCount + 15);
    };

    if(loading) {

        return(
            <></>
        )

    }

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-2xl font-semibold mb-4 pt-4 pb-6">User Information</h1>

            <div className="flex flex-row gap-11 border-t border-b">
                <div className="mb-8 text-left">
                    <h2 className="text-xl font-semibold py-4">User Details</h2>
                    <p><strong>ID:</strong> {user_id}</p>
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold py-4">Last Visitation</h2> 
                    <p><strong>Last Login:</strong> {visit_log.last_login}</p>
                    <p><strong>Last Visit:</strong> {visit_log.last_visit}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-center p-9">Execution History</h2>
                <table className="w-full text-center">
                    <thead>
                        <tr className="text-sm font-semibold text-white">
                            <td className="py-4 border-b border-gray-700">Language</td>
                            <td className="py-4 border-b border-gray-700 text-center">Execution Date</td>
                            <td className="py-4 border-b border-gray-700 text-center">Language Version</td>
                        </tr>
                    </thead>
                    <tbody>
                        {exe.slice(0, visibleCount).map((order, index) => (
                            <tr key={index} className="text-sm text-gray-500">
                                <td className="py-4">{order.language}</td>
                                <td className="py-4 text-center">{order.date}</td>
                                <td className="py-4 flex justify-center">
                                    <span
                                        className={`flex justify-center py-1 w-2 font-medium capitalize rounded-full ${order.version === 'completed'
                                            ? 'bg-accent-green/20 text-accent-green'
                                            : order.version === 'preparing'
                                                ? 'bg-accent-purple/20 text-accent-purple'
                                                : 'bg-accent-orange/20 text-accent-green'
                                            }`}
                                    >
                                        {order.version}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {visibleCount < exe.length && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={loadMore}
                            className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
