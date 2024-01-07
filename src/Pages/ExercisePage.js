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

export default function Exercise() {
  const SIMILARITY_THRESHOLD_EXCELLENT = 0.25;
  const SIMILARITY_THRESHOLD_GOOD = 0.55;
  const SIMILARITY_THRESHOLD_OKAY = 0.6;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const image = useRef(null);
  const [score, setscore] = useState("Your review");
  const [review,setReview] = useState(0);
  const [currPose,setcurrPose] = useState(0)
  useEffect(() => {
    runPosenet();
  });

  const runPosenet = async () => {
    try {
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
    console.log(">>>>>>>>>>>>>>",image.current)
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
      
      if(!image.current){
        console.log("changing image")
        return 
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
        setscore(Math.round((1-score)*100))
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

  const poses = [
    {
      img:"/tree.jpg",
      name:"Tree Pose"
    },
    {
      img:"/warrior-one.webp",
      name:"Warrior-I Pose"
    },
    {
      img:"/warrior-2.webp",
      name:"Warrior-II Pose"
    },
    {
      img:"/side-bend.jpg",
      name:"Side Bend"
    },
    {
      img:"/reverse-warrior-pose.webp",
      name:"Reverse Warrior Pose"
    }
  ]
  return (
    <div className="m-4">
      <select onChange={(e)=>{
        console.log(e.target.value)
        setcurrPose(e.target.value)
        // image.current.src = poses[e.target.value].img
      }}>
        {poses.map((pose,idx)=>{
          return <option key={idx} id={idx} value={idx}>{pose.name}</option>
        })}
      </select>
      <div className="flex">
        <p className="text-[30px]">{`${review}  ${score}`}</p>
       
      </div>

      <img src={poses[currPose].img} ref={image} height={320} width={320}></img>

      <canvas
      className="object-fill"
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 1024,
          height: 1024,
        }}
      />

      <Webcam
        className="object-fill"
        ref={webcamRef}
        style={{
          position: "hidden",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 1024,
          height: 1024,
          
        }}
      />
    </div>
  );
}
