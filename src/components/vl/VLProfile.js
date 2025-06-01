import React, { useEffect, useState } from "react";
import VLNavBar from "./VLNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth";


export default function VLProfile() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/profile"});
                setProfile(data);
                if (data[0]?.username) {
                    setUsername(data[0].username); // Pre-fill form
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to load players:", err);
            }
        };

        if (isAuthenticated) {
            fetchProfile();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetchWithAuthPost({ getAccessTokenSilently, url: "/profile", body: username });

            setProfile((prev) =>
                prev.length === 0
                    ? [{ user_id: "unknown", username }]
                    : [{ ...prev[0], username }]
            );
        } catch (err) {
            console.error("Update Username error:", err);
        }
    };

    return (<main className="text-gray-400 bg-gray-900 min-h-screen body-font">
        <VLNavBar />
        <div className="container mx-auto flex flex-col px-10 py-20 items-center space-y-4">
            {loading && <div className="loader">Loading...</div>}
            <section className="relative py-10">
                <div className="container mx-auto px-5">
                    <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">Profile</h2>
                    <table className="table-auto border border-gray-300 w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">User Id</th>
                                <th className="border border-gray-300 px-4 py-2">user name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(profile).map(([id, row]) => (
                                <tr key={id}>
                                    <td className="border border-gray-300 px-4 py-2">{row.user_id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </main>)
};