import React from "react";
import Tag from "./Tag";
import "./Tile.css";

export default function Tile({ pose }) {
  return (
    <div className="tile p-[15px]">
      <section className="flex justify-start flex-col">
        <img
          src={
            pose?.image_url ||
            "https://uploads-ssl.webflow.com/6434aeb40ef5841cfc0dc13f/64887cf4f2ff30c1ef304f3a_cybercave.png"
          }
          alt="logo"
          className="tile__img object-cover h-[180px] md:h-[215px] rounded mr-3"
        />
        <div className="flex flex-col">
          <div
            className={`flex flex-wrap flex-1 items-center tile__tags mt-[15px] text-[12px] md:text-[14px]`}
          >
            {pose?.tags &&
              pose?.tags.map((tag) => {
                return <Tag tag={tag} />;
              })}
          </div>
          <a
            href={`/poses/posepage?name=${pose.name}`}
            className={`tile__name mt-[15px] text-[21px] md:text-[24px] font-bold uppercase`}
          >
            <p>{pose.name}</p>
          </a>
        </div>
      </section>

      {/* <p className="tile__desc text-secondary-color text-[14px] md:text-[17px] min-h-fit md:min-h-[78px]">
        {pose.instruction}
      </p> */}

    </div>
  );
}
