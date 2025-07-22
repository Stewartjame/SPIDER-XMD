const fs = require("fs");
const file = "./list/lib/antistatus.json";

function loadSettings() {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
}

function saveSettings(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
  isAntiStatusOn: (groupId) => {
    const data = loadSettings();
    return data[groupId] === true;
  },

  setAntiStatus: (groupId, value) => {
    const data = loadSettings();
    data[groupId] = value;
    saveSettings(data);
  }
};