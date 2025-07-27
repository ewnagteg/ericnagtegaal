import { useEffect, useState } from "react";
import VLNavBar from "./VLNavBar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useMessage } from "../MessageProvider.js";
import { fetchWithAuth } from "../../api/fetchWithAuth.js";
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
                data['matches'].sort((a, b) => new Date(b.MatchInfo.match_date) - new Date(a.MatchInfo.match_date));
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

                    <table className="table-auto border border-gray-300 w-full hidden sm:table">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">player_id</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">match_id</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">kills</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">team1</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">team2</th>
                                <th className="border border-gray-300 px-4 py-2 text-white font-bold">date</th>
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
                                    <td className="border border-gray-300 px-4 py-2">{row.MatchInfo.team1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.MatchInfo.team2}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.MatchInfo.match_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="sm:hidden space-y-4">
                        {Object.entries(matches).map(([id, row]) => (
                            <div className="bg-gray-800 p-4 rounded shadow">
                                <div className="text-gray-300 text-sm">Player ID:
                                    <Link
                                        to={`https://vlr.gg/player/${row.player_id}`}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        {row.player_id}
                                    </Link>
                                </div>
                                <div className="text-gray-300 text-sm">Match ID:
                                    <Link
                                        to={`https://vlr.gg/${row.match_id}`}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        {row.match_id}
                                    </Link>
                                </div>
                                <div className="text-gray-300 text-sm">Kills: {row.kills}</div>
                                <div className="text-gray-300 text-sm">Team1: {row.MatchInfo.team1}</div>
                                <div className="text-gray-300 text-sm">Team2: {row.MatchInfo.team2}</div>
                                <div className="text-gray-300 text-sm">Date: {row.MatchInfo.match_date}</div>
                                <div className="text-gray-300 text-sm">Match ID:
                                    <Link
                                        to={`https://vlr.gg/${row.match_id}`}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        {row.match_id}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </main>)
};