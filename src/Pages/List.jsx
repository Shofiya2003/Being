import React, { useEffect, useState } from "react";
import Tile from "../Components/Tile";
import instance from "../axiosInstance";
import { CircularProgress } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";

export default function CyberCave() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState(undefined);
  
  const fetchTools = (page, sortBy, type, value) => {
    setLoading(true);
    if (!page) page = currentPage + 1;
    let url = `http://localhost:5000/exercises?page=1`;
    if (searchQuery !== "" && type !== "search") {
      url += `&search=${searchQuery}`;
    }

    instance
      .get(url)
      .then((response) => {
        if (response.data !== 0) {
          setTools((prev) => {
            let result = [];

            if (page === 1) result = response.data.exercises;
            else result = prev.concat(response.data.exercises);
            console.log(result)
            return result;
          });
          setCurrentPage(page);
          if (response.data.length !== 10) {
            setHasNext(false);
          } else {
            setHasNext(true);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasNext(false);
        setError(true);
      });
  };

  const [sentryRef] = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasNext,
    onLoadMore: fetchTools,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
  });


  useEffect(() => {
    fetchTools(1);
  }, []);

  return (
    <>
      <main className="font-['Archivo'] pb-[60px] lg:pb-[100px] secondary-white-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[46px] px-[20px] sm:px-[40px] lg:px-[60px] max-w-[1300px] mx-auto">
          {tools?.map((tool, idx) => {
            return (
              <Tile
                key={`${tool.name} ${idx}`}
                pose={tool}
              ></Tile>
            );
          })}
        </div>

        {(loading || hasNext) && (
          <div
            ref={sentryRef}
            className="flex items-center justify-center w-full mb-4"
          >
            <CircularProgress style={{ color: "#6F150F" }} />
          </div>
        )}
      </main>
    </>
  );
}
