var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment =  require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var flash = require("connect-flash");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//var uri = ;
mongoose.connect("mongodb+srv://YTAmitxSpectre:opendhonistyle@cluster0-v45fm.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// app.listen(3000, function(req, res){
// 	console.log("The YelpCamp server has started!!!!")
// });

app.listen(process.env.PORT || 3000, () => {
    console.log("The YelpCamp server has started!!!!");
})