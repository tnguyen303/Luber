require("dotenv").config();

const User = require("../../models/User");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb://user:password1@ds155864.mlab.com:55864/heroku_0zlmp78k`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected..."))
  .catch(err => console.log(err));

const list = [
  new User({
    uid: 4041235678,
    pw: "password",
    role: "rider",
    vehicleType: "std",
    avatar: "./client/src/img/man1.jpg",
    email: "tringuyen552911@gmail.com",
    fullName: "Tri Nguyen",
    billing: {
      cardNumber: 4400664482737243,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Tri Nguyen",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.852079,
      longitude: -84.126463
    }
  }),
  new User({
    uid: 4041235679,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/lady1.jpg",
    email: "uberuser1@gmail.com",
    fullName: "Denise Watson",
    billing: {
      cardNumber: 4400664482737243,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Denise Watson",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.84,
      longitude: -84.126463,
      streetAddress: "1024 Garner Rd SW, Lilburn"
    }
  }),
  new User({
    uid: 4041235698,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/lady2.jpg",
    email: "uberuser2@gmail.com",
    fullName: "Kay Kotheraman",
    billing: {
      cardNumber: 4400664482737256,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Kay Kotheraman",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.913309,
      longitude: -84.140382,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235708,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/lady3.jpg",
    email: "uberuser3@gmail.com",
    fullName: "Rosie Witherspoon",
    billing: {
      cardNumber: 4400664482737255,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Rosie Witherspoon",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.95878,
      longitude: -84.134094,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235718,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man2.jpg",
    email: "uberuser4@gmail.com",
    fullName: "James Sakalakus",
    billing: {
      cardNumber: 4400664482737254,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "James Sakalakus",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.983051,
      longitude: -84.067366,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235672,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man3.jpg",
    email: "uberuser5@gmail.com",
    fullName: "Bill Tuttle",
    billing: {
      cardNumber: 4400664482737253,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Bill Tuttle",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 34.000598,
      longitude: -84.161954,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235673,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/lady4.jpg",
    email: "uberuser6@gmail.com",
    fullName: "Erica Rachu",
    billing: {
      cardNumber: 4400664482737252,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Erica Rachu",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 34.016426,
      longitude: -84.328653,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235748,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man4.jpg",
    email: "uberuser7@gmail.com",
    fullName: "Maungkyaw Aung",
    billing: {
      cardNumber: 4400664482737251,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Maungkyaw Aung",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.885529,
      longitude: -84.362235,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235758,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man1.jpg",
    email: "uberuser8@gmail.com",
    fullName: "Louis Wesley",
    billing: {
      cardNumber: 4400664482737250,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Louis Wesley",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.809044,
      longitude: -84.217007,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235768,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man2.jpg",
    email: "uberuser9@gmail.com",
    fullName: "David Pham",
    billing: {
      cardNumber: 4400664482737249,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "David Pham",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.631194,
      longitude: -84.381021,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235778,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/lady1.jpg",
    email: "uberuser10@gmail.com",
    fullName: "Kathryn Mays",
    billing: {
      cardNumber: 4400664482737248,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Kathryn Mays",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.864144,
      longitude: -84.495107,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235788,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man3.jpg",
    email: "uberuser11@gmail.com",
    fullName: "Eric Kim",
    billing: {
      cardNumber: 4400664482737247,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Eric Kim",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.780274,
      longitude: -84.3829,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235798,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man4.jpg",
    email: "uberuser12@gmail.com",
    fullName: "David Smith",
    billing: {
      cardNumber: 4400664482737246,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "David Smith",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.769804,
      longitude: -84.392192,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235808,
    pw: "password",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man1.jpg",
    email: "uberuser13@gmail.com",
    fullName: "Anil Tellakula",
    billing: {
      cardNumber: 4400664482737245,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "Anil Tellakula",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.776924,
      longitude: -84.393474,
      streetAddress: ""
    }
  }),
  new User({
    uid: 4041235818,
    pw: "password",
    fullName: "John Smith",
    role: "driver",
    vehicleType: "std",
    avatar: "./client/src/img/man2.jpg",
    email: "uberuser14@gmail.com",
    fullName: "John Smith",
    billing: {
      cardNumber: 4400664482737244,
      expMonth: 12,
      expYear: 2022,
      CVV: 705,
      nameOnCard: "John Smith",
      address: "1146 Garner Creek Dr SW",
      city: "Lilburn",
      state: "Georgia",
      zip: 30047
    },
    tripList: [],
    currentLoc: {
      latitude: 33.773894,
      longitude: -84.394668,
      streetAddress: ""
    }
  })
];

let done = 0;
for (let i = 0; i < list.length; i++) {
  list[i].save((err, result) => {
    done++;
    if (done === list.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
