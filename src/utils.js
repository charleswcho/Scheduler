/**
 * Converts string time to decimal time
 * @function
 * @param {string} time - The time in string form '10:15'
 * @return {number} - The time in decmial form 10.25
 */

const timeToNumber = (shift) => {
  shift = shift.map(time => {
    let timeArr = time.split(':')

    timeArr[1] = parseInt(timeArr[1], 10) / 60
    timeArr[1] = timeArr[1].toString().slice(1)

    return parseFloat(timeArr.join(''))
  })

  return shift
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
  if (start > end) {
    return true
  }
  
  // start value is less than first schedule value AND
  // end value is larger than last schedule value
  if (start < scheduleFirst && end > scheduleLast)
    return true

  if (start < scheduleFirst) {
    let val = schedule.some(range => end > range[0])

    if (val) return true
  }

  if (end > scheduleLast) {
    let val = schedule.some(range => start < range[1])

    if (val) return true
  }

  for (let i = 0; i < schedule.length; i++) {
    let scheduleStart = schedule[i][0],
        scheduleEnd = schedule[i][1]

    // Start time within range
    if (start > scheduleStart && start < scheduleEnd)
      return true

    // End time within range
    if (end > scheduleStart && end < scheduleEnd)
      return true

    // Start range the same as the schedule start range
    // End range the same as the schedule end range
    if (start === scheduleStart || end === scheduleEnd)
      return true
  }

  return false
}
