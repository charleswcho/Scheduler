import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const Shift = ([start, end], idx) => (
  <TableRow key={idx}>
    <TableRowColumn>{idx + 1}</TableRowColumn>
    <TableRowColumn>{start}</TableRowColumn>
    <TableRowColumn>{end}</TableRowColumn>
  </TableRow>
)

const ScheduleTable = (schedule) => (
  <Table fixedHeader={true} selectable={false} multiSelectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Shift</TableHeaderColumn>
        <TableHeaderColumn>Start</TableHeaderColumn>
        <TableHeaderColumn>End</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {schedule.map((shift, idx) => Shift(shift, idx))}
    </TableBody>
  </Table>
);

export default ScheduleTable;
