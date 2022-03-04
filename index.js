function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map((rec) => createEmployeeRecord(rec));
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  const inEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  };

  this.timeInEvents.push(inEvent);

  return this;
}

const createTimeOutEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  const outEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  };
  this.timeOutEvents.push(outEvent);
  return this;
};

function hoursWorkedOnDate(targetDate) {
  const inEvent = this.timeInEvents.find(
    (inEvent) => inEvent.date === targetDate
  );
  const outEvent = this.timeOutEvents.find(
    (outEvent) => outEvent.date === targetDate
  );

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(targetDate) {
  return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}

function findEmployeeByFirstName(array, firstName) {
  return array.find((rec) => rec.firstName === firstName);
}

function calculatePayroll(array) {
  return array.reduce((total, rec) => {
    return total + allWagesFor.call(rec);
  }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
