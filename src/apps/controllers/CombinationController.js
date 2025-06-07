const {
  FirestoreModel,
  SubjectModel,
  CombinationModel,
  NationModel,
  RegisteredCombinationModel,
  UserModel,
  SecondarySchoolModel
} = require("../models");
const {
  SubjectsCollectionName,
  CombinationsCollectionName,
  UsersCollectionName,
  SecondarySchoolsCollectionName
} = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");
const database = require("../../config/database/index");
const xlsx = require("xlsx");

class CombinationController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.subjectDbRef = new FirestoreModel(SubjectsCollectionName, SubjectModel);
    this.nationDbRef = new FirestoreModel("nations", NationModel);
    this.secondarySchoolDbRef = new FirestoreModel(SecondarySchoolsCollectionName, SecondarySchoolModel);
    this.registeredCombinationDbRef = new FirestoreModel("registeredCombinations", RegisteredCombinationModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.submited = this.submited.bind(this);
    this.submitedList = this.submitedList.bind(this);
    this.submitedDetail = this.submitedDetail.bind(this);
    this.submitCombination = this.submitCombination.bind(this);
  }

  async submited(req, res, next) {
    const data = req.body;
    const submitedCombinationModel = new RegisteredCombinationModel(
      undefined, // id
      data.fullName,
      data.dateOfBirth,
      data.secondarySchool,
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
      new Date() // registeredAt
    );
    await this.registeredCombinationDbRef.addItem(submitedCombinationModel);
    return res.json({
      message: "Dữ liệu đã được nhận!",
      data: data
    });
  }

  async submitedList(req, res, next) {
    let data = await database.collection("registeredCombinations").orderBy("registeredAt", "asc").get();
    data = Array.from(data.docs).map((doc) => {
      var result = RegisteredCombinationModel.fromFirestore(doc);
      console.log(result);
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

    const secondarySchools = await this.secondarySchoolDbRef.getAllItems(false);
    const districts = secondarySchools.map((doc) => {
      return {
        districtId: doc.districtId,
        districtName: doc.districtName
      };
    });

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

    return res.render("combination/submit_combination", {
      combinations: combinations,
      nations: nations,
      user: user,
      subjects: subjects,
      districts: districts,
      secondarySchools: JSON.stringify(secondarySchools),
      signin: req.cookies.isLogin
    });
  }
}

module.exports = new CombinationController();
