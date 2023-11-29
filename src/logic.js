import similarity from 'compute-cosine-similarity';

export const poseSimilarity = (pose1, pose2) => {
  const poseVector1 = getPoseVector(pose1);
  const poseVector2 = getPoseVector(pose2);
  return cosineDistanceMatching(poseVector1, poseVector2);
};

function getPoseVector(pose) {

  const xPos = pose.keypoints.map(k => k.x);
  const yPos = pose.keypoints.map(k => k.y);

  let minX = Math.min(...xPos);
  // let maxX = Math.max(...keypoint.position.x);
  let minY = Math.min(...yPos);
  // let maxY = Math.max(...keypoint.position.y);

  const vector = [];
  for (let i = 0; i < xPos.length; i++) {
    vector.push(xPos[i] - minX);
    vector.push(yPos[i] - minY);
  }
  return vector;
}

function getPoseVector2(pose) {

    const xPos = pose.keypoints.map(k => k.position.x);
    const yPos = pose.keypoints.map(k => k.position.y);
  
    let minX = Math.min(...xPos);
    // let maxX = Math.max(...keypoint.position.x);
    let minY = Math.min(...yPos);
    // let maxY = Math.max(...keypoint.position.y);
  
    const vector = [];
    for (let i = 0; i < xPos.length; i++) {
      vector.push(xPos[i] - minX);
      vector.push(yPos[i] - minY);
    }
    return vector;
  }

// Cosine similarity as a distance function. The lower the number, the closer // the match
// poseVector1 and poseVector2 are a L2 normalized 34-float vectors (17 keypoints each
// with an x and y. 17 * 2 = 32)
function cosineDistanceMatching(poseVector1, poseVector2) {
  const cosineSimilarity = similarity(poseVector1, poseVector2);
  const distance = 2 * (1 - cosineSimilarity);
  return Math.sqrt(distance);
}
