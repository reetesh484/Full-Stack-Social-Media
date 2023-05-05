import User from "../model/User.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const getUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  if (!friends) {
    throw new CustomError("Friends not found", 404);
  }

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  res.status(200).json({
    success: true,
    formattedFriends,
  });
});

//update
export const addRemoveFriend = asyncHandler(async (req, res) => {
  const { id, friendId } = req.params;
  const user = User.findById(id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const friend = await User.findById(friendId);

  if (!friend) {
    throw new CustomError("Friend not found", 400);
  }

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((fid) => fid !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  }

  await user.save();
  await friend.save();


  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  if (!friends) {
    throw new CustomError("Friends not found", 404);
  }

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  res.status(200).json({
    success: true,
    formattedFriends,
  });
});
