import React, { useEffect, useState } from "react";
import VLNavBar from "./VLNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth";


export default function VLGroups() {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState([]);
    const [invite, setInvite] = useState("");
    const [groupId, setGroupId] = useState("");

    const [name, setName] = useState("");
    const [groupNameId, setGroupNameId] = useState("");
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchWithAuth({ getAccessTokenSilently, url: "/groups/get" });
                setGroup(data.groups);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load group:", err);
            }
        };

        if (isAuthenticated) {
            fetchProfile();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchWithAuthPost({
                getAccessTokenSilently, url: "/groups/join", body: {
                    invite: invite,
                    groupId: groupId
                }
            });
            console.log(data);
            setGroup(prev => [
                ...prev,
                {
                    id: groupId,
                    inviteNumber: invite,
                    owner: "",
                    name: "" // TODO: join should give name, someone forgot to add that
                }
            ]);
        } catch (err) {
            console.error("Update Username error:", err);
        }
    };

    const createGroup = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchWithAuthPost({
                getAccessTokenSilently, url: "/groups/create", body: {
                    invite: invite,
                    groupId: groupId
                }
            });
            if (data.success) {
                setGroupId(String(data.id));
                setGroup(prev => [
                    ...prev,
                    {
                        id: data.groupId,
                        inviteNumber: data.inviteNumber,
                        owner: user.sub,
                        name: ""
                    }
                ]);
            }

        } catch (err) {
            console.error("Update Username error:", err);
        }
    }

    const deleteGroup = async (target) => {
        try {
            const data = await fetchWithAuthPost({
                getAccessTokenSilently, url: "/groups/delete", body: {
                    groupId: target
                }
            });

            if (data.success) {
                const newGroups = group.filter(g => g.id !== target);
                setGroup(newGroups);
            }

        } catch (err) {
            console.error("Delete group error:", err);
        }
    }

    const leaveGroup = async (target) => {
        try {
            const data = await fetchWithAuthPost({
                getAccessTokenSilently, url: "/groups/leave", body: {
                    groupId: target
                }
            });

            if (data.success) {
                const newGroups = group.filter(g => g.id !== target);
                setGroup(newGroups);
            }

        } catch (err) {
            console.error("Leave group error:", err);
        }
    }

    const setGroupName = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchWithAuthPost({
                getAccessTokenSilently, url: "/groups/name", body: {
                    groupId: groupNameId,
                    name: name
                }
            });

        } catch (err) {
            console.error("Update group name error:", err);
        }
    }

    return (<main className="text-gray-400 bg-gray-900 min-h-screen body-font">
        <VLNavBar />
        <div className="container mx-auto flex flex-col px-10 py-20 items-center space-y-4">
            {loading && <div className="loader">Loading...</div>}
            <section className="relative py-10">
                <div className="container mx-auto px-5">
                    <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">Your Groups</h2>
                    <div>
                        {loading == false && group.length > 0 &&
                            <table className="table-auto border border-gray-300 w-full">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Group Id</th>
                                        <th className="border border-gray-300 px-4 py-2">name</th>
                                        <th className="border border-gray-300 px-4 py-2">Owner</th>
                                        <th className="border border-gray-300 px-4 py-2">Invite Number</th>
                                        <th className="border border-gray-300 px-4 py-2">Delete Group</th>
                                        <th className="border border-gray-300 px-4 py-2">Leave Group</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(group).map(([id, row]) => (
                                        <tr key={id}>
                                            <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.owner == user.sub ? "You" : ""}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.inviteNumber}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {row.owner == user.sub ?
                                                    <button className="hover:text-white hover:underline" onClick={() => deleteGroup(row.id)}>Delete</button>
                                                    : ""
                                                }
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {row.owner != user.sub ?
                                                    <button className="hover:text-white hover:underline" onClick={() => leaveGroup(row.id)}>Leave</button>
                                                    : ""
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }

                    </div>
                    <div className="container mx-auto px-5 m-4">
                        {
                            loading == false &&
                            <button
                                onClick={(e) => createGroup(e)}
                                type="submit"
                                className="w-full text-white bg-green-500 px-3 py-3 ml-4 hover:bg-green-600 transition rounded"
                            >
                                Create Group
                            </button>
                        }
                    </div>
                    {
                        loading == false &&
                        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 rounded">
                            <h2 className="text-xl font-bold mb-4">Join Group</h2>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">
                                    Group Id
                                </label>
                                <input
                                    type="text"
                                    value={groupId}
                                    onChange={(e) => setGroupId(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">
                                    Group invite code
                                </label>
                                <input
                                    type="text"
                                    value={invite}
                                    onChange={(e) => setInvite(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-gray-300 bg-gray-700 py-2 px-4 rounded hover:bg-gray-800 transition"
                            >
                                Submit
                            </button>
                        </form>
                    }
                    {
                        loading == false &&
                        <form onSubmit={setGroupName} className="max-w-sm mx-auto p-4 rounded">
                            <h2 className="text-xl font-bold mb-4">Set Group Name</h2>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">
                                    Group Id
                                </label>
                                <input
                                    type="text"
                                    value={groupNameId}
                                    onChange={(e) => setGroupNameId(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">
                                    Group Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-gray-300 bg-gray-700 py-2 px-4 rounded hover:bg-gray-800 transition"
                            >
                                Submit
                            </button>
                        </form>
                    }
                </div>
            </section>
        </div>
    </main>)
};