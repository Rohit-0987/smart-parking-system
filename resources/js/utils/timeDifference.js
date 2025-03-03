export function calculateTimeDifference(startTime, endTime) {

    if (startTime.length === 7) startTime = '0' + startTime;
    if (endTime.length === 7) endTime = '0' + endTime;

    const startTimeObj = new Date("2024-01-01T" + startTime);
    const endTimeObj = new Date("2024-01-01T" + endTime);

    const differenceMs = endTimeObj - startTimeObj;

    const differenceHours = differenceMs / (1000 * 60 * 60);

    return differenceHours;
}