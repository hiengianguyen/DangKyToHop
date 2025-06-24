const {
  FirestoreModel,
  SubjectModel,
  CombinationModel,
  NationModel,
  RegisteredCombinationModel,
  UserModel,
  SecondarySchoolModel,
  FavouriteSubmittedModel
} = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");
const { convertVietnameseDatetimeToDate } = require("../../utils/convertVietnameseDatetimeToDate");

class CombinationController {
  constructor() {
    this.userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
    this.subjectDbRef = new FirestoreModel(CollectionNameConstant.Subjects, SubjectModel);
    this.nationDbRef = new FirestoreModel(CollectionNameConstant.Nations, NationModel);
    this.secondarySchoolDbRef = new FirestoreModel(CollectionNameConstant.SecondarySchools, SecondarySchoolModel);
    this.registeredCombinationsDbRef = new FirestoreModel(CollectionNameConstant.RegisteredCombinations, RegisteredCombinationModel);
    this.combinationDbRef = new FirestoreModel(CollectionNameConstant.Combinations, CombinationModel);
    this.favouriteSubmittedDbRef = new FirestoreModel(CollectionNameConstant.FavouriteSubmitted, FavouriteSubmittedModel);
    this.submited = this.submited.bind(this);
    this.submitedList = this.submitedList.bind(this);
    this.submitedDetail = this.submitedDetail.bind(this);
    this.submitCombination = this.submitCombination.bind(this);
    this.delete = this.delete.bind(this);
    this.saveDoc = this.saveDoc.bind(this);
    this.unsaveDoc = this.unsaveDoc.bind(this);
    this.savedSubmitted = this.savedSubmitted.bind(this);
  }

  async submited(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const userId = req?.cookies?.userId;
      const data = req?.body;
      const currentTime = new Date();
      if (data) {
        const submitedCombinationModel = new RegisteredCombinationModel(
          undefined, // id
          data.fullName,
          data.dateOfBirth,
          data.secondarySchool,
          data.schoolDistrict,
          data.gender,
          data.placeOfBirth,
          data.currentPlace,
          data.nation,
          data.avatarLink,
          data.combination1,
          data.combination2,
          data.fullNameDad,
          data.fullNameMom,
          data.jobOfDad,
          data.jobOfMom,
          data.phoneOfDad,
          data.phoneOfMom,
          data.mathScore,
          data.literatureScore,
          data.englishScore,
          data.conduct6,
          data.conduct7,
          data.conduct8,
          data.conduct9,
          data.academicRating6,
          data.academicRating7,
          data.academicRating8,
          data.academicRating9,
          data.graduationRating,
          data.avgLiteratureScore,
          data.avgMathScore,
          data.avgEnglishScore,
          data.avgPhysicsScore,
          data.avgChemistryScore,
          data.avgBiologyScore,
          data.avgHistoryScore,
          data.avgGeographyScore,
          undefined, // isDeleted
          userId,
          convertToVietnameseDateTime(currentTime) // registeredAt
        );
        const submitedByUserId = await this.registeredCombinationsDbRef.getItemByFilter({
          userId: userId
        });

        if (submitedByUserId) {
          await this.registeredCombinationsDbRef.updateItem(submitedByUserId.id, submitedCombinationModel.toFirestore());
          return res.json({
            message: "Cập nhật thông tin đăng ký vào lớp 10 thành công.",
            userId: userId
          });
        } else {
          await this.registeredCombinationsDbRef.addItem(submitedCombinationModel);
          return res.json({
            message: "Gửi thông tin đăng ký vào lớp 10 thành công.",
            userId: userId
          });
        }
      }
    } else {
      return res.redirect("/");
    }
  }

  async submitedList(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const userId = req?.cookies?.userId;
      let data = await this.registeredCombinationsDbRef.getAllItems();

      data = data.sort((a, b) => {
        return convertVietnameseDatetimeToDate(a.registeredAt) - convertVietnameseDatetimeToDate(b.registeredAt);
      });

      let allIdDocSaved = await this.favouriteSubmittedDbRef.getItemsByFilter({
        userId: userId
      });

      allIdDocSaved = allIdDocSaved.map((docSaved) => docSaved.submittedId);

      Array.from(data).forEach((doc) => {
        if (allIdDocSaved.includes(doc.id)) {
          doc.favourite = true;
        } else {
          doc.favourite = false;
        }
      });

      return res.render("combination/submited_list", {
        submitedList: data,
        submitedListData: JSON.stringify(data),
        role: req?.cookies?.role,
        isSavedPage: false
      });
    } else {
      return res.redirect("/");
    }
  }

  async submitedDetail(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const userId = req?.params?.userId ?? req?.cookies?.userId;
      const data = await this.registeredCombinationsDbRef.getItemByFilter({
        userId: userId
      });

      return res.render("combination/submited_detail", {
        submitedCombinationDetail: data,
        role: req?.cookies?.role,
        userId: req?.cookies?.userId
      });
    } else {
      return res.redirect("/");
    }
  }

  async submitCombination(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.query?.role === undefined) {
        return res.redirect(`/combination/submit-combination?role=${req?.cookies?.role}`);
      }
      let docSubmited;

      if (req?.query?.step) {
        docSubmited = await this.registeredCombinationsDbRef.getItemByFilter({
          userId: req?.cookies?.userId
        });
      }

      const step = Number(req?.query?.step) || 1;
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);

      const secondarySchools = await this.secondarySchoolDbRef.getAllItems();
      const districts = secondarySchools.map((doc) => {
        return {
          districtId: doc.districtId,
          districtName: doc.districtName
        };
      });

      const nations = await this.nationDbRef.getAllItems();
      nations.sort((a, b) => (a.name > b.name ? 1 : -1));

      const subjects = await this.subjectDbRef.getAllItems();
      subjects.map((subject) => {
        return subject.docs;
      });
      const combinations = await this.combinationDbRef.getAllItems();
      //sort by name (asc)
      combinations.sort((a, b) => (a.name > b.name ? 1 : -1));

      combinations.forEach((combination) => {
        const compulsorySubjects = combination.compulsorySubjects;
        const optionalSubjects = combination.optionalSubjects;

        combination.compulsorySubjects = subjects.filter((subject) => compulsorySubjects.includes(subject.name));
        combination.optionalSubjects = subjects.filter((subject) => optionalSubjects.includes(subject.name));
      });

      return res.render("combination/submit_combination", {
        combinations: combinations,
        nations: nations,
        user: user,
        subjects: subjects,
        districts: districts,
        secondarySchools: JSON.stringify(secondarySchools),
        signin: req?.cookies?.isLogin,
        role: req?.cookies?.role,
        step: step,
        submitedDetail: docSubmited || false,
        isEdit: docSubmited ? true : false,
        userId: req?.cookies?.userId
      });
    } else {
      return res.redirect("/");
    }
  }

  async delete(req, res, next) {
    const docId = req?.params?.id;
    await this.registeredCombinationsDbRef.softDeleteItem(docId);
    return res.redirect("back");
  }

  async saveDoc(req, res, next) {
    const docId = req?.body?.docId;
    const userId = req?.cookies?.userId;

    const docSubmitedSaved = await this.favouriteSubmittedDbRef.getItemByFilter({
      userId: userId,
      submittedId: docId
    });

    if (docSubmitedSaved) {
      await this.favouriteSubmittedDbRef.updateItem(docSubmitedSaved.id, { isDeleted: false });
    } else {
      const favouriteSubmittedModal = new FavouriteSubmittedModel(undefined, userId, docId, undefined);
      await this.favouriteSubmittedDbRef.addItem(favouriteSubmittedModal);
    }

    return res.json({
      message: "Lưu hồ sơ học sinh thành công"
    });
  }

  async unsaveDoc(req, res, next) {
    const docId = req?.body?.docId;
    const userId = req?.cookies?.userId;

    const docSubmitedSaved = await this.favouriteSubmittedDbRef.getItemByFilter({
      userId: userId,
      submittedId: docId
    });

    await this.favouriteSubmittedDbRef.softDeleteItem(docSubmitedSaved.id);
    return res.json({
      message: "Gỡ lưu hồ sơ học sinh thành công"
    });
  }

  async savedSubmitted(req, res, next) {
    const userId = req?.cookies?.userId;
    let allDocSubmittedSaved = await this.favouriteSubmittedDbRef.getItemsByFilter({
      userId: userId,
      isDeleted: false
    });

    if (allDocSubmittedSaved) {
      allDocSubmittedSaved = await Promise.all(
        allDocSubmittedSaved.map(async (docSaved) => await this.registeredCombinationsDbRef.getItemById(docSaved.submittedId))
      );

      Array.from(allDocSubmittedSaved).forEach((doc) => {
        doc.favourite = true;
      });
    } else {
      allDocSubmittedSaved = [];
    }

    return res.render("combination/submited_list", {
      submitedList: allDocSubmittedSaved,
      submitedListData: JSON.stringify(allDocSubmittedSaved),
      role: req?.cookies?.role,
      isSavedPage: true
    });
  }
}

module.exports = new CombinationController();
