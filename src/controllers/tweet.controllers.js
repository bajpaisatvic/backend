import mongoose from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Content is required to create a tweet");
  }
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User ID is required to create a tweet");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "userId is invalid");
  }

  const tweet = await Tweet.create({
    content,
    owner: userId,
  });

  if (!tweet) {
    throw new ApiError(500, "something went wrong while creating tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet created successfully!"));
  //TODO: create tweet
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "UserId is invalid");
  }

  const tweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  if (!tweets || tweets.length === 0) {
    throw new ApiError(404, "No tweets found for this user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "User tweets fetched successfully!"));
  // TODO: get user tweets
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "TweetId is invalid");
  }
  if (!content) {
    throw new ApiError(400, "Content is required to update tweet");
  }

  const tweet = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweetId),
      },
    },
    {
      $set: {
        content: content,
      },
    },
  ]);

  if (!tweet || tweet.length === 0) {
    throw new ApiError(
      404,
      "Tweet not found or you do not have permission to update this tweet"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully!"));
  //TODO: update tweet
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "TweetId is invalid");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(400, "Tweet not found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not have permission to delete this tweet");
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  if (!deletedTweet) {
    throw new ApiError(500, "something went wrong while deleting tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Tweet deleted successfully!"));
  //TODO: delete tweet
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
