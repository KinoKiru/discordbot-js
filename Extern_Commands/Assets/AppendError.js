const fs = require('fs');
module.exports = function (Error) {
    let d = new Date();
    fs.appendFileSync(__dirname + '/console.text', Error + " On: " + Datesetter(d) + "\n");
}

function Datesetter(date) {
    return date.getHours() + ":" + date.getMinutes() + " " + date.getUTCDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
}
