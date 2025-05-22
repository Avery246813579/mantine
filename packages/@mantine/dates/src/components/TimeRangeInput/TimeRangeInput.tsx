import { useCallback, useEffect, useMemo, useRef } from 'react';
import cx from 'clsx';
import {
  __BaseInputProps,
  __InputStylesNames,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  Flex,
  Input,
  InputBase,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '@mantine/core';
import { DateStringValue } from '../../types';
import { TimePicker } from '../TimePicker';

export interface TimeRangeInputProps
  extends BoxProps,
    Omit<__BaseInputProps, 'size'>,
    StylesApiProps<TimeRangeInputFactory>,
    ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Determines whether seconds input should be displayed, `false` by default */
  withSeconds?: boolean;

  /** Minimum possible string time, if `withSeconds` is true, time should be in format HH:mm:ss, otherwise HH:mm */
  minTime?: string;

  /** Maximum possible string time, if `withSeconds` is true, time should be in format HH:mm:ss, otherwise HH:mm */
  maxTime?: string;

  onChange?: (value: [DateStringValue | null, DateStringValue | null] | null) => void;
  value?: [DateStringValue | null, DateStringValue | null] | null;
}

export type TimeRangeInputFactory = Factory<{
  props: TimeRangeInputProps;
  ref: HTMLInputElement;
  stylesNames: __InputStylesNames;
}>;

const defaultProps: Partial<TimeRangeInputProps> = {};

export const TimeRangeInput = factory<TimeRangeInputFactory>((_props, ref) => {
  const props = useProps('TimeInput', defaultProps, _props);
  const { classNames, styles, value, onChange } = props;

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<TimeRangeInputFactory>({
    classNames,
    styles,
    props,
  });

  const endRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!Array.isArray(value) && value !== null && typeof value !== 'undefined') {
      throw new Error('woof');
    }
  }, []);

  const startValue = useMemo(() => {
    if (Array.isArray(value) && value.length > 0) {
      return value[0];
    }

    return null;
  }, [value]);

  const endValue = useMemo(() => {
    if (Array.isArray(value) && value.length > 1) {
      return value[1];
    }

    return null;
  }, [value]);

  const onChangeValue = useCallback(
    (time: any, index: number) => {
      const newArr: any[] = [startValue, endValue];

      newArr[index] = time;

      if (index === 0 && endValue === null) {
        endRef.current?.focus();
      }

      // @ts-ignore
      onChange && onChange(newArr);
    },
    [startValue, endValue, endRef]
  );

  return (
    <Input.Wrapper
      variant="default"
      styles={resolvedStyles}
      classNames={{ ...resolvedClassNames }}
      __staticSelector="TimeInput"
      className="input"
      ref={ref}
    >
      <Flex align="center">
        <TimePicker
          withDropdown
          value={startValue ?? undefined}
          onChange={(value) => onChangeValue(value, 0)}
          variant="unstyled"
          onBlur={() => {
            if (endValue === null) {
              endRef.current?.focus();
            }
          }}
        />

        <div>-</div>

        <TimePicker
          withDropdown
          ref={endRef}
          value={endValue ?? undefined}
          onChange={(value) => onChangeValue(value, 1)}
          variant="unstyled"
        />
      </Flex>
    </Input.Wrapper>
  );
});

TimeRangeInput.classes = InputBase.classes;
TimeRangeInput.displayName = '@mantine/dates/TimeRangeInput';
