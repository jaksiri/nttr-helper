import React from "react";
import db from "@/db";
import { cookies } from "next/headers";
import PageTitle from "../../components/PageTitle";
import MainDiv from "../../components/MainDiv";
import Link from "next/link";

export default async function Dashboard() {
  const user = await db.getUser(cookies());
  const gamesData = await db.getGamesList(cookies());

  return (
    <MainDiv>
      <PageTitle titleText="Dashboard">
        {user ? <p>Current User: {user.username}</p> : null}
      </PageTitle>

      {gamesData ? (
        <>
          {gamesData.map((game) => (
            <Link
              key={game.gameName}
              href={`/game/${game.id}`}
              className="block"
            >
              {game.gameName}
            </Link>
          ))}
        </>
      ) : (
        <p>No games found</p>
      )}
    </MainDiv>
  );
}
