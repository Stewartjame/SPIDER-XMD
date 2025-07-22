const fs = require("fs");
const file = "./list/lib/warnings.json";

function loadWarnings() {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
}

function saveWarnings(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
  addWarning: (user, groupId) => {
    const data = loadWarnings();
    if (!data[groupId]) data[groupId] = {};
    if (!data[groupId][user]) data[groupId][user] = 0;
    data[groupId][user] += 1;
    saveWarnings(data);
    return data[groupId][user];
  },

  getWarnings: (user, groupId) => {
    const data = loadWarnings();
    return data[groupId]?.[user] || 0;
  },

  resetWarnings: (user, groupId) => {
    const data = loadWarnings();
    if (data[groupId]?.[user]) {
      data[groupId][user] = 0;
      saveWarnings(data);
    }
  }
};