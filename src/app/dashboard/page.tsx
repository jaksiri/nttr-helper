import React from "react";
import db from "@/db";
import { cookies } from "next/headers";
import Logout from "../components/Logout";
import { Button } from "@/components/ui/button";
import PageTitle from "../components/PageTitle";

async function Dashboard() {
  const user = await db.getUser(cookies());

  return (
    <div className="p-4 w-full">
      <PageTitle titleText="Dashboard"></PageTitle>
      {user ? <p>Current User: {user.username}</p> : null}
    </div>
  );
}

export default Dashboard;
