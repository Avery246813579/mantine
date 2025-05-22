import { TimeRangeInput } from './TimeRangeInput';

export default { title: 'TimeRangeInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <TimeRangeInput />
    </div>
  );
}

export function WithSeconds() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <TimeRangeInput withSeconds />
    </div>
  );
}

export function WithRange() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <TimeRangeInput type="range" withSeconds />
    </div>
  );
}

export function WithMinMaxTimes() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <TimeRangeInput minTime="10:00" maxTime="18:00" />
    </div>
  );
}
