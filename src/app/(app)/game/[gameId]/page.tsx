import React from "react";
import MainDiv from "../../../components/MainDiv";
import PageTitle from "../../../components/PageTitle";
import db from "@/db";
import { notFound } from "next/navigation";

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  const gameData = await db.getGame(params.gameId).catch((err) => {
    notFound();
  });

  return (
    <MainDiv>
      <PageTitle titleText={`${gameData.gameName}`}>
        <p>Game ID: {params.gameId}</p>
      </PageTitle>
    </MainDiv>
  );
}
