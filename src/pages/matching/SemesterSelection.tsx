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

export default function SemesterSelection() {
  const [isFilteringBySemester, setIsFilteringBySemester] = useState(false);
  const [minValue, setMinValue] = useState<string | number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<string | number | undefined>(undefined);
  const min = Math.max(1, +(minValue ?? 1));
  const max = Math.max(1, +(maxValue ?? 1));

  useEffect(() => {
    const adjustedMax = max < min ? min : max;
    setMinValue(min);
    setMaxValue(adjustedMax);
  }, [minValue]);

  useEffect(() => {
    const adjustedMin = max < min ? max : min;
    setMinValue(adjustedMin);
    setMaxValue(max);
  }, [maxValue]);

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
