const { FirestoreModel, SubjectModel, CombinationModel, NationModel } = require("../models");
const { SubjectsCollectionName, CombinationsCollectionName } = require("../../constants");

class CombinationController {
  constructor() {
    this.subjectDbRef = new FirestoreModel(SubjectsCollectionName, SubjectModel);
    this.nationDbRef = new FirestoreModel("nations", NationModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.index = this.index.bind(this);
    this.submit = this.submit.bind(this);
  }

  async index(req, res, next) {
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
    return res.render("combination/submit_combination", {
      nations: nations
    });
  }
}

module.exports = new CombinationController();
