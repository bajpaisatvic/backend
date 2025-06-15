import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(401, "Title and Description is required");
  }
  const videoLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!videoLocalPath) {
    throw new ApiError(401, " video not found");
  }
  if (!thumbnailLocalPath) {
    throw new ApiError(401, "thumbnail not found");
  }

  const videofile = await uploadOnCloudinary(videoLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videofile) {
    throw new ApiError(500, "something went wrong while uploading video file");
  }
  if (!thumbnail) {
    throw new ApiError(500, "something went wrong while uploading thumbnail");
  }

  //   console.log(videofile);
  const video = await Video.create({
    title,
    description,
    videofile: videofile.url,
    thumbnail: thumbnail.url,
    isPublished: true,
    owner: await User.findById(req.user._id).select("-password -refreshToken"),
    duration: videofile.duration,
  });

  if (!video) {
    throw new ApiError(500, "something went wrong while creating video");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video published succesfully"));
  // TODO: get video, upload to cloudinary, create video
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
