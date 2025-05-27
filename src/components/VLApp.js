import React, { useState } from 'react';
import VLNavbar from "./VLNavBar.js";
import { useAuth0 } from '@auth0/auth0-react';
import TeamTable from "./TeamTable.js";





export default function VLApp() {
  const [team, setTeam] = useState([]);
  const [teamCost, setTeamCost] = useState(0);

  return (<main className="text-gray-400 bg-gray-900 body-font">
    <VLNavbar />
    <div className="container mx-auto min-h-screen flex px-10 py-20 md:flex-row flex-col items-center">

      <section>
        <TeamTable team={team} setTeam={setTeam} teamCost={teamCost} setTeamCost={setTeamCost}/>
      </section>
    </div>
  </main>)
};