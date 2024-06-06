const regUser = require('../model/reguser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// handle errors for backend
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', username: '', phonenumber: '',address:'',course:'' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = ' email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'Entered password is incorrect';
  }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }
    // validation errors
    if (err.message.includes('Reg_users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// controller actions
module.exports.register_get = (req, res) => {
    res.render('register');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}









//for jwt token purpous
const maxAge = 3 * 24 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
        expiresIn: maxAge
    });
}

module.exports.register_post = async (req, res) => {
    const { username, email, password, phonenumber } = req.body;
    try {
        // Verify email using Hunter API
        const hunterApiKey = "bfd746001b26869f3839d939ea134f345d8c5c3b"; 
        const hunterApiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunterApiKey}`;
        const emailVerificationResponse = await axios.get(hunterApiUrl);

        if (emailVerificationResponse.data.data.result !== "deliverable") {
            return res.status(400).json({ errors: { email: 'It is not a valid Email' } });
        }

        const reguser = await regUser.create({ username, email, password, phonenumber });
        const token = createToken(reguser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1 });
        res.status(201).json({ reguser: reguser._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

module.exports.login_post =async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await regUser.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
        res.status(200).json({user:user._id});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}