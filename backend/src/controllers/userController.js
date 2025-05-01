import catchAsync from "../utils/catchAsync.js";
import User from "../modules/userModule.js";

export const createUserHandler = catchAsync(async (req, res, _next) => {
  req.body.email = req.body.email.toLowerCase();
  const user = await User.create(req.body);

  return res.status(200).json({
    status: "success",
    message: "user created successfully",
    id: user.id, //remove in prod
  });
});

export const getCurrentUserHandler = catchAsync(async (_req, res, _next) => {
  let user = await User.findById(res.locals.user._id)
    .select("-password")
    .lean();

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
