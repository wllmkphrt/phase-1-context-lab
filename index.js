function createEmployeeRecord(employeeInfo){
    const employeeRecord = {
        firstName : employeeInfo[0],
        familyName : employeeInfo[1],
        title : employeeInfo[2],
        payPerHour : employeeInfo[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return employeeRecord;
}

function createEmployeeRecords(infoArrays){
    return infoArrays.map(createEmployeeRecord);
}

function createTimeInEvent(date){
    const timeInEvent = {
        type : 'TimeIn',
        hour : parseInt(date.slice(11)),
        date : date.slice(0, 10)
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(date){
    const timeOutEvent = {
        type : 'TimeOut',
        hour : parseInt(date.slice(11)),
        date : date.slice(0, 10)
    }
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date){
    const clockIn = this.timeInEvents.filter(clock => Object.values(clock).includes(date));
    const clockOut = this.timeOutEvents.filter(clock => Object.values(clock).includes(date));
    const hours = clockIn.map((element, index) => (clockOut[index].hour-element.hour)/100);
    return hours.reduce(function(total, currentValue){return total + currentValue});
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function calculatePayroll(employees){
    const allWages = employees.map(element => allWagesFor.call(element));
    return allWages.reduce(function(total, currentValue){return total + currentValue});
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(element => element.date)
    const allUniqueDates = [...new Set(eligibleDates)];
    const payable = allUniqueDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}
function findEmployeeByFirstName(srcArray, firstNameString){
    return srcArray.find(element => element.firstName === firstNameString);
}