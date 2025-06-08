import React, { useEffect, useState } from "react";
import VLNavbar from "./VLNavBar.js";
import TeamTable from "./TeamTable.js";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useAuth0 } from "@auth0/auth0-react";
import { LOCK_DATE } from "../../constants.js";

const locked = Date.now() > LOCK_DATE;
const daysleft = Math.floor((LOCK_DATE - Date.now()) / (1000 * 60 * 60 * 24));

export default function VLApp() {
    const [team, setTeam] = useState([]);
    const [teamCost, setTeamCost] = useState(0);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [news, setNews] = useState();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/news" });
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNews(data);
            } catch (err) {
                console.error("Failed to fetch news:", err);
            }
        };
        if (isAuthenticated) {
            fetchNews();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    return (<main className="text-gray-400 bg-gray-900 body-font">
        <VLNavbar />
        <div className="container mx-auto flex flex-col items-center mx-auto min-h-screen">
            <div className="container mx-auto flex flex-col items-start mt-4">
                <h2 className="text-white sm:text-3xl text-left">Announcements</h2>
            </div>
            <div className="container max-h-[500px] mx-auto flex md:flex-col mt-4 p-4 overflow-auto">
                {news && <div className="container mx-auto flex flex-col">
                    {news
                        .map(article => (
                            <div key={article.date} className="border-b border-gray-600 pb-4 mb-4">
                                <h2 className="text-white sm:text-2xl">{article.header}</h2>
                                <div>{article.body}</div>
                            </div>
                        ))}
                </div>}
            </div>
            <div className="container mx-auto flex md:flex-row mt-4 p-4">
                <h2 className="text-white sm:text-2xl">{locked
                    ? "Teams are locked"
                    : <span>Days left until teams locked: {daysleft}</span>
                }</h2>
            </div>
            <div className="container mx-auto flex md:flex-row flex-col items-center p-4">

                <section>
                    <TeamTable team={team} setTeam={setTeam} teamCost={teamCost} setTeamCost={setTeamCost} />
                </section>
            </div>
        </div>
    </main>)
};