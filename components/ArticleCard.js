import Link from "next/link";
import { useState } from "react";

function ArticleCard({ data }) {
  const [viewDetails, setViewDetails] = useState(false);

  return (
    <li
      className="bg-white rounded-xl p-4 my-6 shadow-lg w-[45%] cursor-pointer hover:bg-green-200 transition-all"
      onClick={() => {
        setViewDetails((prev) => !prev);
      }}
    >
      <h3>{data.title}</h3>
      {viewDetails ? (
        <div className="my-4 flex flex-col gap-4">
          {data.url && (
            <>
              <p>
                News Source:{" "}
                <Link
                  href={data.url}
                  target="_blank"
                  className="underline text-blue-500 break-words"
                >
                  {data.url}
                </Link>
              </p>
            </>
          )}
          <p className="text-green-600 text">Author: {data.by}</p>
          <div className="flex justify-between items-center">
            <p className="bg-green-800 text-white p-2 w-fit rounded">
              type: {data.type}
            </p>
            <p>Score: {data.score}</p>
          </div>
          <div className="text-gray-500 text-xs flex justify-between">
            <i>Article-Id: {data.id}</i>
            <i>Date: {new Date(data.time * 1000).toDateString()}</i>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default ArticleCard;
