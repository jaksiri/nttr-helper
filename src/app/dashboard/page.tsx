import React from "react";

import db from "@/db";
import { cookies } from "next/headers";
import Logout from "../components/Logout";

async function Dashboard() {
  const user = await db.getUser(cookies());

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Current User: {user.username}</p> : null}
      <Logout />
    </div>
  );
}

export default Dashboard;
