import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../utilities";
import { poseSimilarity } from "../logic";
import data from "../data.json";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";
import { RendererCanvas2d } from "../utils";
import poses from "../poses.json";
import { useParams, useLocation } from "react-router-dom";

export default function Exercise() {
  const SIMILARITY_THRESHOLD_EXCELLENT = 0.25;
  const SIMILARITY_THRESHOLD_GOOD = 0.55;
  const SIMILARITY_THRESHOLD_OKAY = 0.6;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const image = useRef(null);
  const [score, setscore] = useState("Your review");
  const [review, setReview] = useState(0);
  const [currPose, setcurrPose] = useState(0);
  const location = useLocation();

  useEffect(() => {
    
    runPosenet();
  });

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const idx = (Number)(queryParams.get("idx"));
    setcurrPose(idx)
  },[])

  const runPosenet = async () => {
    try {
      console.log("here");
      await tf.ready();
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );

      setInterval(() => {
        detect(detector);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const getCoordinates = async (detector) => {
    const pose = await detector.estimatePoses(image.current);
    const videoWidth = image.current.width;
    const videoHeight = webcamRef.current.height;

    console.log(pose[0]);

    return pose[0];
  };

  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      const pose = await detector.estimatePoses(video);

      if (!image.current) {
        console.log("changing image");
        return;
      }
      const tree = await getCoordinates(detector);

      if (tree && tree?.keypoints && pose && pose[0]?.keypoints) {
        let score = poseSimilarity(tree, pose[0]);
        let str = "";
        if (score <= SIMILARITY_THRESHOLD_EXCELLENT) {
          str = "Excellent!!";
        } else if (score <= SIMILARITY_THRESHOLD_GOOD) {
          str = "Good!";
        } else if (score <= SIMILARITY_THRESHOLD_OKAY) {
          str = "Okay";
        } else {
          str = "Meh..";
        }
        if(Math.round((1 - score) * 100)>90){
          setReview("Hurray! You can now move on to next pose ....")

          setTimeout(()=>{
            setcurrPose((idx)=>{
              return idx+1
            })
          },2000)
          
          return
        }
        setscore(Math.round((1 - score) * 100));
        setReview(str);
        
      } else return;

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      return pose[0];
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    // const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    const renderer = new RendererCanvas2d(canvasRef.current);
    // renderer.drawCtx(video)
    renderer.drawResult(pose[0]);
  };

  return (
    <div className="m-4">
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setcurrPose(e.target.value);
          // image.current.src = poses[e.target.value].img
        }}
        value={currPose}
      >
        {poses.map((pose, idx) => {
          return (
            <option key={idx} id={idx} value={idx}>
              {pose.name}
            </option>
          );
        })}
      </select>

      <div className="flex">
        <div>
          <div className="flex">
            <p className="text-[30px]">{`${review}  ${score}`}</p>
          </div>
          <img
            src={poses[currPose]["image_url"]}
            ref={image}
            height={320}
            width={320}
          ></img>
        </div>

        <div>
          <canvas
            className="object-fill"
            ref={canvasRef}
            style={{
              position: "absolute",
              
              
              right: 76,
             
              zindex: 8,
              width: 500,
              height: 700,
            }}
          />

          <Webcam
            className="object-fill"
            ref={webcamRef}
            style={{
              position: "hidden",
              
              right: 76,
              textAlign: "center",
              width: 500,
              height: 700,
              position: "absolute",
            }}
          />
        </div>
      </div>
    </div>
  );
}
