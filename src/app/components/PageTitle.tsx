import React from "react";

function PageTitle({
  titleText,
  children,
}: {
  titleText: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold">{titleText}</h1>
      {children}
      <hr className="my-4 w-full" />
    </>
  );
}

export default PageTitle;
