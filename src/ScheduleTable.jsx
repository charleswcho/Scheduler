import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';

const Shift = ({ idx, shift: [start, end] }) => (
  <TableRow key={idx}>
    <TableCell>{idx + 1}</TableCell>
    <TableCell>{start}</TableCell>
    <TableCell>{end}</TableCell>
  </TableRow>
);

const ScheduleTable = ({ schedule }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Shift</TableCell>
        <TableCell>Start</TableCell>
        <TableCell>End</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {schedule.map((shift, idx) => (
        <Shift key={idx} idx={idx} shift={shift} />
      ))}
    </TableBody>
  </Table>
);

ScheduleTable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired))
    .isRequired
};

export default ScheduleTable;
