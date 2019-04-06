const { exec } = require("child_process");
const stamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

console.log(stamp);

const command = `git add . && git commit -m "快速提交=>${stamp}" && git push -u origin master`;

console.log(command);

exec(command, function(err) {
    err && console.log(err);
});
