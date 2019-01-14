const User = require('../../models/User');
const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb://user:password1@ds155864.mlab.com:55864/heroku_0zlmp78k",
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

const userList = [
  new User({
    uid: "404123567",
    pw: "password"
  })
];

let done = 0;
for (let i = 0; i < userList.length; i++) {
  userList[i].save((err, result) => {
    done++;
    if (done === userList.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
