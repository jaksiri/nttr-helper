import React from "react";
import MainDiv from "../../../components/MainDiv";
import PageTitle from "../../../components/PageTitle";
import db from "@/db";
import { notFound } from "next/navigation";
import GameClientBoard from "./components/GameClientBoard";
import DeleteGame from "./components/DeleteGame";
import { cookies } from "next/headers";

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  const gameData = await db.getGame(cookies(), params.gameId).catch((err) => {
    console.error(err);
    notFound();
  });

  return (
    <MainDiv>
      <PageTitle titleText={`${gameData.gameName}`}>
        <p>
          Game ID: {params.gameId}, <DeleteGame gameId={params.gameId} />
        </p>
      </PageTitle>
      <GameClientBoard
        gameId={params.gameId}
        gameLength={gameData.gameLength}
      ></GameClientBoard>
    </MainDiv>
  );
}
