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
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{titleText}</h1>
      {children}
      <hr className="mt-2 mb-4 w-full" />
    </>
  );
}

export default PageTitle;
