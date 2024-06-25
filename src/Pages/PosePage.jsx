import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Tag from "../Components/Tag";
import instance from "../axiosInstance";
import { CircularProgress } from "@mui/material";

export default function PosePage() {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setanchorEl] = useState(null);
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [pose, setPose] = useState(null);
  const [readMore, setreadMore] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();


  const fetchPose = () => {
    setLoading(true);
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    setName(name);
    if (!name) {
      setError(true);
      setLoading(false);
      return;
    }
    instance
      .get(`http://localhost:5000/exercise/${name}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          console.log(res.data.exercise);
          setPose(res.data.exercise);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };


  useEffect(() => {
    console.log("I am getting Poses");
    fetchPose();
  }, []);

  return (
    <>
      {!error && !loading && (
        <div className="font-['Archivo'] pb-[60px] lg:pb-[100px] secondary-white-background">
          <section className="flex lg:flex-row flex-col lg:items-inherit items-center p-[20px] md:p-[40px] lg:p-[60px] max-w-[1300px] mx-auto">
            <div className="lg:w-[50%] lg:pr-[30px]">
              <img
                src={pose?.image_url || "https://uploads-ssl.webflow.com/6434aeb40ef5841cfc0dc13f/64887cf4f2ff30c1ef304f3a_cybercave.png"}
                alt="pose-logo"
                className="pose-page__image lg:mr-12 rounded-[20px] object-cover lg:mb-0 lg:mb-[0px] mb-[22px] w-[100%] lg:w-[600px] sm:h-[400px] h-[217px]"
              ></img>
            </div>
            <div className="flex flex-col justify-center w-[100%] lg:w-[50%] lg:pl-[30px]">
              <div className="md:mb-6 mb-5 flex justify-between">
              
                  <h1 className="pose-page__name font-bold md:text-[32px] text-[22px] text-secondary-color uppercase">
                    {pose?.name}
                  </h1>
                
              </div>
              {readMore ? (
                <p className="text-neutral-700 text-[16px] leading-normal font-normal mb-9 font-['gandhi-sans']">
                  {pose?.instruction}
                  <span
                    className="pointer read-more"
                    onClick={() => {
                      setreadMore(false);
                    }}
                  >
                    {" "}
                    Read Less
                  </span>
                </p>
              ) : (
                <p className="pose-page__desc secondary-text font-normal sm:text-[16px] text-[14px] mb-9 font-['gandhi-sans']">
                  {pose?.instruction.substring(0, 200)}
                  <span
                    className="pointer read-more"
                    onClick={() => {
                      setreadMore(true);
                    }}
                  >
                    {" "}
                    Read More
                  </span>
                </p>
              )}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between mb-[30px] gap-[20px]">
                <div className="flex gap-[20px] items-center">
                  <div className="pose-page__tags text-[12px] md:text-[14px] dim-text-primary italic capitalize font-light">
                    {pose?.tags &&
                      pose?.tags.map((tag) => {
                        return <Tag tag={tag}/>;
                      })}
                  </div>
                </div>
               
              </div>
              
            </div>
          </section>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center w-full mb-4">
          <CircularProgress style={{ color: "#6F150F" }} />
        </div>
      )}
    </>
  );
}
