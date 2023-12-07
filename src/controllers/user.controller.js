import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already exists: username, email
  //check for images , check for avatar
  //upload them to cloudinary, check avatar is uploaded or not
  //create user object - create entry in DB
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { username, email, fullname, password } = req.body;
  console.log("email:", email);

  //* Check whether any of the fields are empty are not, using some()
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //* Check whether the user exists or not in DB
  const existedUser = User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already existed");
  }

  //* Since we added multer middleware in register route
  // * so multer gave us access to files, so we can use req.files

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // * Upload these two images to Cloudinary, which will take time
  // * so use async await
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Finally saving the user details in MongoDB
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // * Find User inside the DB, if User is successfully created
  // * then remove password and refreshToken field inside the response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new Error(500, "Something went wrong while registering the user");
  }

  // * Finally return the response to User

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfullly"));
});

export { registerUser };
