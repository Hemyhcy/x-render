import React from 'react';
import { DatePicker } from '@alifd/next';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default function date(p) {
  const { format = 'dateTime' } = p.schema;
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    default:
      // dateTime
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
  }
  let defaultObj = {};
  if (p.value && Array.isArray(p.value) && p.value[0] && p.value[1]) {
    defaultObj = {
      defaultValue: [
        moment(p.value[0], dateFormat),
        moment(p.value[1], dateFormat),
      ],
    };
  }

  const handleChange = value => {
    if (Array.isArray(value) && value[0] && value[1]) {
      const result = [
        moment(value[0]).format(dateFormat),
        moment(value[1]).format(dateFormat),
      ];
      p.onChange(p.name, result);
    }
  };

  return (
    <RangePicker
      style={{ width: '100%' }}
      {...p.options}
      showTime={format === 'dateTime'}
      {...defaultObj}
      format={dateFormat}
      disabled={p.disabled}
      onChange={handleChange}
    />
  );
}
