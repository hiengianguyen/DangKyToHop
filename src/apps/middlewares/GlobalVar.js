const { FirestoreModel, RegisteredCombinationModel, UserModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

module.exports = async (req, res, next) => {
  const userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
  const registeredCombinationsDbRef = new FirestoreModel(CollectionNameConstant.RegisteredCombinations, RegisteredCombinationModel);

  const userId = req?.cookies?.userId;
  if (userId === undefined) {
    return next();
  }

  let [user, submited] = await Promise.all([
    userDbRef.getItemById(userId),
    registeredCombinationsDbRef.getItemByFilter({
      userId: userId
    })
  ]);

  if (user) {
    res.locals.user = user;
    res.locals.fullName = user.fullName;
    res.locals.role = user.role;
    res.locals.userId = userId;
  }

  res.locals.isLogin = req?.cookies?.isLogin === "true";
  res.locals.avatar = req?.cookies?.avatar;
  res.locals.submited = submited;
  next();
};
