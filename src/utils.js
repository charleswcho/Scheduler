/**
 * Converts shift times from string to decimal
 * @function
 * @param {Array.<string>} shift - The shift times in string form
 * @return {Array.<number>} - The shift times in decmial form
 */

const timeToNumber = (shift) => {               // ['10:15', '12:00']
  return shift.map(time => {                    // '10:15' -> '12:00'
    let timeArr = time.split(':')               // ['10','15'] -> ['12','00']

    timeArr[1] = parseInt(timeArr[1], 10) / 60  // ['10', 0.25] -> ['12', 0]
    timeArr[1] = timeArr[1].toString().slice(1) // ['10', '.25'] -> ['12', '']

    return parseFloat(timeArr.join(''))         // 10.25 -> 12
  })
}

/**
 * Converts shifts from 24 Hour to 12 Hour time format
 * @function
 * @param {Array.<Array>} schedule - An array of shifts in 24 Hour time format
 * @return {Array.<Array>} - An array of shifts in 12 Hour time format
 */

export const formatSchedule = (schedule) => {          // [['12:00', '13:00']]
  return schedule.map(shiftStrArr => {                 // ['12:00', '13:00']
    return shiftStrArr.map(shiftStr => {               // '12:00' -> '13:00'
      let shiftStrArr = shiftStr.split(':'),           // ['12','00'] -> ['13','00']
          shiftHoursNum = parseInt(shiftStrArr[0], 10) // 12 -> 13

      if (shiftHoursNum < 12) {
        return shiftStr + ' AM'
      } else if (shiftHoursNum === 12) {               // '12:00 PM'
        return shiftStr + ' PM'
      } else {
        shiftHoursNum -= 12                            // '1'
        shiftStrArr[0] = shiftHoursNum.toString()      // ['1', '00']
        return shiftStrArr.join(':') + ' PM'           // '1:00 PM'
      }
    })
  })
}

/**
 * Sorts schedule by earlier to later shifts
 * @function
 * @param {Array.<Array>} schedule - An array of shifts
 */

export const sortSchedule = (schedule) => {
  schedule.sort((shift1, shift2) => {
    shift1 = timeToNumber(shift1)
    shift2 = timeToNumber(shift2)

    return shift1[0] - shift2[0]
  })
}

/**
 * Checks if the input time range is valid for the given schedule
 * @function
 * @param {Array} time - The input time range
 * @param {Array.<Array>} schedule - The schedule of time ranges being utilized
 * @return {bool} - If the input time conficts with the schedule
 */

export const isConflicting = (time, schedule) => {
  if (schedule.length === 0)
    return false

  time = timeToNumber(time)
  schedule = schedule.map(shift => timeToNumber(shift))

  let start = time[0],
      end = time[1],
      scheduleFirst = schedule[0][0],
      scheduleLast = schedule[schedule.length - 1][1]

  // start should always be smaller than end
  if (start > end) return true

  // start value is less than first schedule value AND
  // end value is larger than last schedule value
  if (start < scheduleFirst && end > scheduleLast) return true

  // start value is less than first schedule value BUT
  // end value is larger than any of the start values
  if (start < scheduleFirst) {
    let val = schedule.some(range => end > range[0])

    if (val) return true
  }
  // end value is larger than the last schedule value But
  // start value is less than any of the end values
  if (end > scheduleLast) {
    let val = schedule.some(range => start < range[1])

    if (val) return true
  }

  for (let i = 0; i < schedule.length; i++) {
    let scheduleStart = schedule[i][0],
        scheduleEnd = schedule[i][1]

    // Start time within range
    if (start > scheduleStart && start < scheduleEnd) return true
    // End time within range
    if (end > scheduleStart && end < scheduleEnd) return true
    // Start range the same as the schedule start range
    // End range the same as the schedule end range
    if (start === scheduleStart || end === scheduleEnd) return true
  }

  return false
}
