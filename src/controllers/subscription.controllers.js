import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const subscriberId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "ChannelId is invalid");
  }
  const channelObjectId = new mongoose.Types.ObjectId(channelId);
  const subscriberObjectId = new mongoose.Types.ObjectId(channelId);

  const isSubscribed = await Subscription.exists({
    channel: channelObjectId,
    subscriber: subscriberObjectId,
  });

  if (!isSubscribed) {
    const newSubscriber = await Subscription.create({
      channel: channelObjectId,
      subscriber: subscriberObjectId,
    });
  } else {
    const unsubscribe = await Subscription.findByIdAndDelete(isSubscribed._id);
  }

  const user = await User.aggregate([
    {
      $match: {
        _id: subscriberObjectId,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        isSubscribed: {
          $cond: {
            if: {
              $in: [
                channelObjectId,
                {
                  $map: {
                    input: "$subscribedTo",
                    as: "sub",
                    in: "$$sub.channel",
                  },
                },
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        username: 1,
        fullname: 1,
        avatar: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!user) {
    throw new ApiError(500, "something went wrong !");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "toggled subscription status successfully!")
    );

  // TODO: toggle subscription
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
