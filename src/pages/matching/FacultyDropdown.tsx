import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { Faculty, StudyProgram } from '../../api/faculty';

export interface FacultyDropdownProps {
  facultyData: Array<Faculty>;
}

export default function FacultyDropdown({ facultyData }: FacultyDropdownProps) {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(undefined);
  const [selectedStudyProgram, setSelectedStudyProgram] = useState<StudyProgram | undefined>(undefined);
  const studyPrograms = facultyData
    .filter((faculty) => selectedFaculty === undefined || faculty.id === selectedFaculty.id)
    .flatMap((faculty) => faculty.studyPrograms);

  const handleFacultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const faculty = facultyData.find((faculty) => e.target.value === faculty.id);
    setSelectedFaculty(faculty);
    setSelectedStudyProgram(undefined);
  };

  const handleStudyProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedStudyProgram = studyPrograms.find((studyProgram) => e.target.value === studyProgram.id);
    setSelectedStudyProgram(selectedStudyProgram);

    if (selectedStudyProgram) {
      const associatedFaculty = facultyData.find((faculty) =>
        faculty.studyPrograms.some((studyProgram) => studyProgram.id === selectedStudyProgram?.id),
      );
      setSelectedFaculty(associatedFaculty);
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel>Faculty</FormLabel>
        <Select
          variant="filled"
          placeholder="Any Faculty"
          value={selectedFaculty?.id ?? ''}
          onChange={handleFacultyChange}>
          {facultyData.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </Select>
        <FormHelperText>Select the faculty you would like to meet.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Study Program</FormLabel>
        <Select
          variant="filled"
          placeholder="Any Study Program"
          value={selectedStudyProgram?.id ?? ''}
          onChange={handleStudyProgramChange}>
          {studyPrograms.map((studyProgram) => (
            <option key={studyProgram.id} value={studyProgram.id}>
              {studyProgram.name}
            </option>
          ))}
        </Select>
        <FormHelperText>Select the study program you would like to meet.</FormHelperText>
      </FormControl>
    </>
  );
}
