import { __InputStylesNames } from '@mantine/core';
import { inputDefaultProps, inputStylesApiSelectors, tests } from '@mantine-tests/core';
import { TimeRangeInput, TimeRangeInputProps } from './TimeRangeInput';

const defaultProps: TimeRangeInputProps = {
  ...inputDefaultProps,
};

describe('@mantine/dates/TimeRangeInput', () => {
  tests.axe([
    <TimeRangeInput aria-label="test-label" key="1" />,
    <TimeRangeInput label="test-label" key="2" />,
    <TimeRangeInput label="test-label" error key="3" />,
    <TimeRangeInput label="test-label" error="test-error" id="test" key="4" />,
    <TimeRangeInput label="test-label" description="test-description" key="5" />,
  ]);

  tests.itSupportsSystemProps<TimeRangeInputProps, __InputStylesNames>({
    component: TimeRangeInput,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@mantine/dates/TimeInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputProps<TimeRangeInputProps>({
    component: TimeRangeInput,
    props: defaultProps,
    selector: 'input',
  });
});
