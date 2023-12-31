import React from "react";
import db from "@/db";
import { cookies } from "next/headers";
import PageTitle from "../components/PageTitle";

export default async function Dashboard() {
  const user = await db.getUser(cookies());
  const gamesData = await db.getGamesList(cookies());

  return (
    <div className="p-4 w-full">
      <PageTitle titleText="Dashboard">
        {user ? <p>Current User: {user.username}</p> : null}
      </PageTitle>

      {gamesData ? (
        <>
          {gamesData.map((game) => (
            <h2 key={game.gameName}>{game.gameName}</h2>
          ))}
        </>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}
