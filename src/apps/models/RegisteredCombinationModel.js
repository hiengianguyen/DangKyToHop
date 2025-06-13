class RegisteredCombinationModel {
  constructor(
    id,
    fullName,
    dateOfBirth,
    secondarySchool,
    schoolDistrict,
    gender,
    placeOfBirth,
    currentPlace,
    nation,
    avatarLink,
    combination1,
    combination2,
    fullNameDad,
    fullNameMom,
    jobOfDad,
    jobOfMom,
    phoneOfDad,
    phoneOfMom,
    mathScore,
    literatureScore,
    englishScore,
    conduct6,
    conduct7,
    conduct8,
    conduct9,
    academicRating6,
    academicRating7,
    academicRating8,
    academicRating9,
    graduationRating,
    avgLiteratureScore,
    avgMathScore,
    avgEnglishScore,
    avgPhysicsScore,
    avgChemistryScore,
    avgBiologyScore,
    avgHistoryScore,
    avgGeographyScore,
    isDeleted,
    userId,
    registeredAt
  ) {
    this.id = id;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.secondarySchool = secondarySchool;
    this.schoolDistrict = schoolDistrict;
    this.gender = gender;
    this.placeOfBirth = placeOfBirth;
    this.currentPlace = currentPlace;
    this.nation = nation;
    this.avatarLink = avatarLink;
    this.combination1 = combination1;
    this.combination2 = combination2;
    this.fullNameDad = fullNameDad;
    this.fullNameMom = fullNameMom;
    this.jobOfDad = jobOfDad;
    this.jobOfMom = jobOfMom;
    this.phoneOfDad = phoneOfDad;
    this.phoneOfMom = phoneOfMom;
    this.mathScore = mathScore;
    this.literatureScore = literatureScore;
    this.englishScore = englishScore;
    this.conduct6 = conduct6;
    this.conduct7 = conduct7;
    this.conduct8 = conduct8;
    this.conduct9 = conduct9;
    this.academicRating6 = academicRating6;
    this.academicRating7 = academicRating7;
    this.academicRating8 = academicRating8;
    this.academicRating9 = academicRating9;
    this.graduationRating = graduationRating;
    this.avgLiteratureScore = avgLiteratureScore;
    this.avgMathScore = avgMathScore;
    this.avgEnglishScore = avgEnglishScore;
    this.avgPhysicsScore = avgPhysicsScore;
    this.avgChemistryScore = avgChemistryScore;
    this.avgBiologyScore = avgBiologyScore;
    this.avgHistoryScore = avgHistoryScore;
    this.avgGeographyScore = avgGeographyScore;
    this.isDeleted = isDeleted || false;
    this.userId = userId;
    this.registeredAt = registeredAt || new Date();
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new RegisteredCombinationModel(
      doc.id,
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
      data.isDeleted,
      data.userId,
      data.registeredAt
    );
  }

  toFirestore() {
    return {
      fullName: this.fullName,
      dateOfBirth: this.dateOfBirth,
      secondarySchool: this.secondarySchool,
      schoolDistrict: this.schoolDistrict,
      gender: this.gender,
      placeOfBirth: this.placeOfBirth,
      currentPlace: this.currentPlace,
      nation: this.nation,
      avatarLink: this.avatarLink,
      combination1: this.combination1,
      combination2: this.combination2,
      fullNameDad: this.fullNameDad,
      fullNameMom: this.fullNameMom,
      jobOfDad: this.jobOfDad,
      jobOfMom: this.jobOfMom,
      phoneOfDad: this.phoneOfDad,
      phoneOfMom: this.phoneOfMom,
      mathScore: this.mathScore,
      literatureScore: this.literatureScore,
      englishScore: this.englishScore,
      conduct6: this.conduct6,
      conduct7: this.conduct7,
      conduct8: this.conduct8,
      conduct9: this.conduct9,
      academicRating6: this.academicRating6,
      academicRating7: this.academicRating7,
      academicRating8: this.academicRating8,
      academicRating9: this.academicRating9,
      graduationRating: this.graduationRating,
      avgLiteratureScore: this.avgLiteratureScore,
      avgMathScore: this.avgMathScore,
      avgEnglishScore: this.avgEnglishScore,
      avgPhysicsScore: this.avgPhysicsScore,
      avgChemistryScore: this.avgChemistryScore,
      avgBiologyScore: this.avgBiologyScore,
      avgHistoryScore: this.avgHistoryScore,
      avgGeographyScore: this.avgGeographyScore,
      isDeleted: this.isDeleted,
      userId: this.userId,
      registeredAt: this.registeredAt
    };
  }
}

module.exports = RegisteredCombinationModel;
