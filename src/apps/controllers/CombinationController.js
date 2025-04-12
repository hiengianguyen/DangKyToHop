const { FirestoreModel, SubjectModel, CombinationModel } = require("../models");
const { SubjectsCollectionName, CombinationsCollectionName } = require("../../constants");

class CombinationController {
  constructor() {
    this.subjectDbRef = new FirestoreModel(SubjectsCollectionName, SubjectModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    const combinationId = req.params.id;

    const subjects = await this.subjectDbRef.getAllItems();
    const combination = await this.combinationDbRef.getItemById(combinationId);

    let compulsorySubjects = combination.compulsorySubjects;
    let optionalSubjects = combination.optionalSubjects;

    compulsorySubjects = subjects.filter((subject) => compulsorySubjects.includes(subject.name));
    optionalSubjects = subjects.filter((subject) => optionalSubjects.includes(subject.name));

    res.render("combination/combination_detail", {
      combination: combination,
      compulsorySubjects: compulsorySubjects,
      optionalSubjects: optionalSubjects
    });
  }
}

module.exports = new CombinationController();
