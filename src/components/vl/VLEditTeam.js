import React, { useEffect, useState, useMemo } from "react";
import VLNavBar from "./VLNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import TeamTable from "./TeamTable.js";
import { useMessage } from "../MessageProvider.js";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth";
import { Link } from "react-router-dom";
import { LOCK_DATE } from "../../constants.js";

const LOCKED = Date.now() > LOCK_DATE;

export default function VLEditTeam() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teamCost, setTeamCost] = useState(0);
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState();
    const { setMessage } = useMessage();

    // fetch players on users team
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/players" });
                setPlayers(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load players:", err);
                setMessage("Failed to load players:" + err);
            }
        };

        if (isAuthenticated) {
            fetchPlayers();
        }
    }, [getAccessTokenSilently, isAuthenticated, setMessage]);

    const handleAddPlayer = async (player) => {
        try {
            const data = await fetchWithAuthPost({ getAccessTokenSilently, url: "/team/add", body: player });;
            setTeam((prev) => [...prev, player]);
            setTeamCost(team.reduce((acc, arrplayer) => acc + parseInt(arrplayer.cost), 0) + player.cost);
            setMessage("Player added: " + player.name);
            console.log("Player added:", data);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            setMessage(`Failed to Add Player: ${player.name} Error: ${err}`);
            console.error("Add player error:", err);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const filteredAndSorted = useMemo(() => {
        return players
            .filter(player =>
                player.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                if (sortAsc === "A-Z" || sortAsc === "Z-A")
                    return ((a.name < b.name) ? -1 : 1) * (sortAsc === "A-Z" ? 1 : -1);
                return (a.cost < b.cost ? -1 : 1) * (sortAsc === "desc" ? 1 : -1);
            });
    }, [players, search, sortAsc]);

    return (<main className="text-gray-400 bg-gray-900 body-font">
        <VLNavBar />
        <div className="container mx-auto flex flex-col px-10 py-20 items-center mx-auto min-h-screen space-y-8">
            {loading && <div className="loader">Loading...</div>}
            <div>
                <div>
                    <h2 className="text-white sm:text-2xl text-2xl mb-4 font-medium title-font">About Edit Team</h2>
                    This is the Edit Team page. You can add players to your team here. The cost of the team is calculated based on the players you select. The total cost of your team is displayed below.
                    <br />
                    <br />
                    Currently you can add and remove players from your team as you like because the backend is using previous finished turnament, specifically Valorant Masters 2024 - Shanghai.
                    <br />
                    <br />
                    The cost of the players is an estimate of how many kills they would be expceted to get in the turnament. This is calculated based of an average of the kills they got in previous turnaments.
                    The model uses a ELO rating system to estimate expected placement of the teams in the turnament and multiplies the kills of the players to get the Cost.
                    <br />
                    <br />
                    For next masters turnament, the teams will be locked before the turnament starts and you will not be able to add or remove players from your team.
                    This is just configured for a demonstration and testing of the functionality of the app.

                </div>
            </div>
            <TeamTable team={team} setTeam={setTeam} teamCost={teamCost} setTeamCost={setTeamCost} />
            <section>
                <h2 className="text-white sm:text-2xl text-2xl font-medium title-font">All Players</h2>
                <input
                    type="text"
                    placeholder="Search player..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sm:text-1 m-1 ml-0 p-2 border border-gray-400 rounded"
                />
                <button onClick={() => setSortAsc(sortAsc === "Z-A" ? "A-Z" : sortAsc === "A-Z" ? "Z-A" : "A-Z")} className="sm:text-1 m-2 hover:underline hover:text-white">
                    Sort Name: {sortAsc === 'A-Z' || sortAsc === 'A-Z' ? sortAsc : 'A-Z'}
                </button>
                <button onClick={() => setSortAsc(sortAsc === "asc" ? "desc" : sortAsc === "desc" ? "asc" : "desc")} className="sm:text-1 m-2 hover:underline hover:text-white">
                    Sort Cost: {sortAsc === 'asc' || sortAsc === 'desc' ? sortAsc : 'asc'}
                </button>
                <table className="table-auto border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-600">
                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">VLR</th>
                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">id</th>
                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Cost</th>
                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Team</th>
                            <th className="border border-gray-300 px-4 py-2 text-white font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSorted.map((player, index) => (
                            <tr className={`hover:bg-gray-700  ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} `} key={player.player_id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        to={`/vl/player-stats/${player.name}`}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        {player.name}
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2"><a href={`https://vlr.gg/player/${player.player_id}`} className="text-indigo-400 hover:underline">VLR</a></td>
                                <td className="border border-gray-300 px-4 py-2">{player.player_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.cost}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.team}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {!LOCKED && <button className="hover:underline hover:text-white" onClick={() => handleAddPlayer(player)}>Add</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    </main>)
};