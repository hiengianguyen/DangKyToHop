class RegisteredCombinationModel {
  constructor(
    id,
    fullName,
    class9,
    dateOfBirth,
    placeOfBirth,
    gender,
    nation,
    ordinaryPlace,
    presentPlace,
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
    combination1,
    combination2,
    isDeleted
  ) {
    this.id = id;
    this.fullName = fullName;
    this.class9 = class9;
    this.dateOfBirth = dateOfBirth;
    this.placeOfBirth = placeOfBirth;
    this.gender = gender;
    this.nation = nation;
    this.ordinaryPlace = ordinaryPlace;
    this.presentPlace = presentPlace;
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
    this.combination1 = combination1;
    this.combination2 = combination2;
    this.isDeleted = isDeleted || false;
  }

  static fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new RegisteredCombinationModel(
      doc.id,
      data.fullName,
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
      data.isDeleted
    );
  }

  toFirestore() {
    return {
      fullName: this.fullName,
      class9: this.class9,
      dateOfBirth: this.dateOfBirth,
      placeOfBirth: this.placeOfBirth,
      gender: this.gender,
      nation: this.nation,
      ordinaryPlace: this.ordinaryPlace,
      presentPlace: this.presentPlace,
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
      combination1: this.combination1,
      combination2: this.combination2,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = RegisteredCombinationModel;
