import { Advertisement } from '../api/advertisement';

export function getTargetGroup(advertisement: Advertisement) {
  if (!advertisement.studyProgramId) {
    return !advertisement.facultyId ? '' : advertisement.faculty?.name;
  }

  if (!advertisement.faculty) {
    return '';
  } else if (!advertisement.studyProgramId) {
    return advertisement.faculty.name;
  } else {
    const studyProgram = advertisement.faculty?.studyPrograms.find(
      (studyProgram) => studyProgram._id === advertisement.studyProgramId,
    );
    return !studyProgram ? '' : studyProgram.name;
  }
}
