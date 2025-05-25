const { FirestoreModel, SubjectModel, CombinationModel, NationModel, RegisteredCombinationModel } = require("../models");
const { SubjectsCollectionName, CombinationsCollectionName } = require("../../constants");

class CombinationController {
  constructor() {
    this.subjectDbRef = new FirestoreModel(SubjectsCollectionName, SubjectModel);
    this.nationDbRef = new FirestoreModel("nations", NationModel);
    this.registeredCombinationDbRef = new FirestoreModel("registeredCombinations", RegisteredCombinationModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.detail = this.detail.bind(this);
    this.submit = this.submit.bind(this);
    this.submited = this.submited.bind(this);
    this.submitedList = this.submitedList.bind(this);
  }

  async detail(req, res, next) {
    const combinationId = req.params.id;

    const subjects = await this.subjectDbRef.getAllItems();
    const combination = await this.combinationDbRef.getItemById(combinationId);

    let compulsorySubjects = combination.compulsorySubjects;
    let optionalSubjects = combination.optionalSubjects;

    compulsorySubjects = subjects.filter((subject) => compulsorySubjects.includes(subject.name));
    optionalSubjects = subjects.filter((subject) => optionalSubjects.includes(subject.name));

    return res.render("combination/combination_detail", {
      combination: combination,
      compulsorySubjects: compulsorySubjects,
      optionalSubjects: optionalSubjects
    });
  }

  async submit(req, res, next) {
    const nations = await this.nationDbRef.getAllItems();
    nations.sort((a, b) => a.name.localeCompare(b.name));

    const combinations = await this.combinationDbRef.getAllItems();
    //sort by name (asc)
    combinations.sort((a, b) => (a.name > b.name ? 1 : -1));

    return res.render("combination/submit_combination", {
      nations: nations,
      combinations: combinations
    });
  }

  async submited(req, res, next) {
    const data = req.body;
    const submitedCombinationModel = new RegisteredCombinationModel(
      undefined,
      data.fullName,
      data.avatarLink,
      data.class9,
      data.dateOfBirth,
      data.placeOfBirth,
      data.gender,
      data.nation,
      data.ordinaryPlace,
      data.presentPlace,
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
      data.combination1,
      data.combination2,
      undefined
    );
    await this.registeredCombinationDbRef.addItem(submitedCombinationModel);
    return res.redirect("/");
  }

  async submitedList(req, res, next) {
    const data = await this.registeredCombinationDbRef.getAllItems();
    return res.render("combination/submited_list", {
      submitedList: data
    });
  }
}

module.exports = new CombinationController();
