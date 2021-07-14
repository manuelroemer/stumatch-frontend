import { useState, useEffect } from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Switch,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { MatchRequestPost } from '../../api/matching';

export interface SemesterSelectionProps {
  form: UseFormReturn<MatchRequestPost>;
}

export default function SemesterSelection({ form }: SemesterSelectionProps) {
  const [isFilteringBySemester, setIsFilteringBySemester] = useState(false);
  const [minValue, setMinValue] = useState<string | number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<string | number | undefined>(undefined);
  const min = Math.max(1, +(minValue ?? 1));
  const max = Math.max(1, +(maxValue ?? 1));

  useEffect(() => {
    if (isFilteringBySemester) {
      const adjustedMax = max < min ? min : max;
      setMinValue(min);
      setMaxValue(adjustedMax);
      form.setValue('minSemester', min);
      form.setValue('maxSemester', adjustedMax);
    }
  }, [minValue, isFilteringBySemester]);

  useEffect(() => {
    if (isFilteringBySemester) {
      const adjustedMin = max < min ? max : min;
      setMinValue(adjustedMin);
      setMaxValue(max);
      form.setValue('minSemester', adjustedMin);
      form.setValue('maxSemester', max);
    }
  }, [maxValue, isFilteringBySemester]);

  useEffect(() => {
    if (!isFilteringBySemester) {
      form.setValue('minSemester', undefined);
      form.setValue('maxSemester', undefined);
    }
  }, [isFilteringBySemester]);

  return (
    <FormControl>
      <HStack>
        <FormLabel>Filter by semester</FormLabel>
        <Switch mb="2" isChecked={isFilteringBySemester} onChange={(e) => setIsFilteringBySemester(e.target.checked)} />
      </HStack>
      <HStack>
        <NumberInput min={1} variant="filled" value={minValue} onChange={setMinValue} disabled={!isFilteringBySemester}>
          <NumberInputField placeholder="Min. Semester" id="minSemesterInput" readOnly />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Spacer />
        <NumberInput min={1} variant="filled" value={maxValue} onChange={setMaxValue} disabled={!isFilteringBySemester}>
          <NumberInputField placeholder="Max.Semester" id="maxSemesterInput" readOnly />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <FormHelperText>Select min. and max. semester.</FormHelperText>
    </FormControl>
  );
}
