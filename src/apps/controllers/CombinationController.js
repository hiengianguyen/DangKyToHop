const { FirestoreModel, SubjectModel, CombinationModel, NationModel, RegisteredCombinationModel, UserModel } = require("../models");
const { SubjectsCollectionName, CombinationsCollectionName, UsersCollectionName } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");
const database = require("../../config/database/index");
const xlsx = require("xlsx");

class CombinationController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.subjectDbRef = new FirestoreModel(SubjectsCollectionName, SubjectModel);
    this.nationDbRef = new FirestoreModel("nations", NationModel);
    this.registeredCombinationDbRef = new FirestoreModel("registeredCombinations", RegisteredCombinationModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.submited = this.submited.bind(this);
    this.submitedList = this.submitedList.bind(this);
    this.submitedDetail = this.submitedDetail.bind(this);
    this.submitCombination = this.submitCombination.bind(this);
  }

  async submited(req, res, next) {
    const data = req.body;
    console.log(data);
    // const submitedCombinationModel = new RegisteredCombinationModel(
    //   undefined,
    //   data.fullName,
    //   data.avatarLink,
    //   req.cookies.secondarySchool,
    //   data.dateOfBirth,
    //   data.placeOfBirth,
    //   data.gender,
    //   data.nation,
    //   data.ordinaryPlace,
    //   data.presentPlace,
    //   data.conduct6,
    //   data.conduct7,
    //   data.conduct8,
    //   data.conduct9,
    //   data.academicRating6,
    //   data.academicRating7,
    //   data.academicRating8,
    //   data.academicRating9,
    //   data.graduationRating,
    //   data.avgLiteratureScore,
    //   data.avgMathScore,
    //   data.avgEnglishScore,
    //   data.avgPhysicsScore,
    //   data.avgChemistryScore,
    //   data.avgBiologyScore,
    //   data.avgHistoryScore,
    //   data.avgGeographyScore,
    //   data.combination1,
    //   data.combination2,
    //   undefined,
    //   new Date()
    // );
    // await this.registeredCombinationDbRef.addItem(submitedCombinationModel);
    return res.json({
      message: "Dữ liệu đã được nhận!",
      data: data
    });
  }

  async submitedList(req, res, next) {
    let data = await database.collection("registeredCombinations").orderBy("registeredAt", "asc").get();
    data = Array.from(data.docs).map((doc) => {
      var result = RegisteredCombinationModel.fromFirestore(doc);
      result.registeredAt = convertToVietnameseDateTime(result.registeredAt.toDate());
      return result;
    });
    return res.render("combination/submited_list", {
      submitedList: data
    });
  }

  async submitedDetail(req, res, next) {
    const submitedCombinationId = req.params.id;
    const data = await this.registeredCombinationDbRef.getItemById(submitedCombinationId, true);
    return res.render("combination/submited_detail", {
      submitedCombinationDetail: data
    });
  }

  async submitCombination(req, res, next) {
    const user = await this.userDbRef.getItemById(req.cookies.userId);
    const nations = await this.nationDbRef.getAllItems(false);
    nations.sort((a, b) => (a.name > b.name ? 1 : -1));

    const subjects = await this.subjectDbRef.getAllItems(false);
    subjects.map((subject) => {
      return subject.docs;
    });
    const combinations = await this.combinationDbRef.getAllItems(false);
    //sort by name (asc)
    combinations.sort((a, b) => (a.name > b.name ? 1 : -1));

    combinations.forEach((combination) => {
      const compulsorySubjects = combination.compulsorySubjects;
      const optionalSubjects = combination.optionalSubjects;

      combination.compulsorySubjects = subjects.filter((subject) => compulsorySubjects.includes(subject.name));
      combination.optionalSubjects = subjects.filter((subject) => optionalSubjects.includes(subject.name));
    });

    res.render("combination/submit_combination", {
      combinations: combinations,
      nations: nations,
      user: user,
      subjects: subjects
    });
  }
}

module.exports = new CombinationController();
