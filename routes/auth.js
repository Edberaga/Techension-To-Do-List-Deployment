const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Sign In Route
router.post("/register", async(req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashpassword = bcrypt.hashSync(password);     //use bcrypt to hides user password at database
        const user = new User({email, username, password: hashpassword}); //add
        await user.save().then(() =>  res.status(200).json({ user: user }));
    } catch (error) {
        res.status(400).json({ message: "User Email Already Exists" });
    }
});

//LOGIN
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            res.status(400).json({ message: "Account not Found"});
        }
        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!checkPassword) {
            res.status(400).json({ message: "Password entered is Incorrect"});
        }

        const {password, ...others} = user._doc;
        res.status(200).json({ others, message: `Account ${others.username} has lSuccesfully Login!` });
    } catch (error) {
        res.status(400).json({ message: "User Email Already Exists" });
    }
});

module.exports = router;