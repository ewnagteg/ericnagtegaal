import React, { useEffect, useState, useMemo } from "react";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useMessage } from "../MessageProvider.js";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth.js";
import { Link } from "react-router-dom";


export default function VLMatches() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [matches, setMatches] = useState([]);
    const { setMessage } = useMessage();

    // fetch players on users team
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/match/getall" });
                let matchid = 0;
                let colour = 0;
                let colours = ['bg-gray-900', 'bg-gray-800'];
                for (let match of data['matches']) {
                    if (match.match_id !== matchid) {
                        colour = (colour + 1) % colours.length;
                        matchid = match.match_id;
                    }
                    match.colour = colours[colour];
                }
                data['matches'].sort((a, b) => b.match_id - a.match_id);
                setMatches(data['matches' || []]);
            } catch (err) {
                console.error("Failed to load matches:", err);
                setMessage("Failed to load matches:" + err);
            }
        };

        if (isAuthenticated) {
            fetchMatches();
        }
    }, [getAccessTokenSilently, isAuthenticated, setMessage]);


    return (<main className="text-gray-400 bg-gray-900 body-font">
        <VLNavBar />
        <div className="container mx-auto flex flex-col px-10 py-20 items-center mx-auto min-h-screen space-y-8">
            <section>
                <div className="w-full overflow-x-auto">

                    <table className="table-auto border border-gray-300 w-full sm:table">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">player_id</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">match_id</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">kills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(matches).map(([id, row]) => (
                                <tr className={`hover:bg-gray-700  ${row.colour} `} key={id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link
                                            to={`https://vlr.gg/player/${row.player_id}`}
                                            className="text-indigo-400 hover:underline"
                                        >
                                            {row.player_id}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link
                                            to={`https://vlr.gg/${row.match_id}`}
                                            className="text-indigo-400 hover:underline"
                                        >
                                            {row.match_id}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{row.kills}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>)
};