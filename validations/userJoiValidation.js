const Joi=require("joi");
const password_complexity=require("joi-password-complexity");
const password={
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
}
function signUpDetails(input){
    const schema=Joi.object({
        name:Joi.string().min(5).max(20).required(),
        email:Joi.string().email().required(),
        password:password_complexity(password).required() 
    })
    return schema.validate(input);
}
function updateUserDetails(input) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20),
    email: Joi.string().email(),
    password: password_complexity()
  }).min(1); // ensures at least one field is provided

  return schema.validate(input);
}
function signInCheck(input) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20),
    email: Joi.string().email(),
    password: password_complexity()
  }).min(2); // ensures at least one field is provided

  return schema.validate(input);
}

module.exports={signUpDetails,updateUserDetails,signInCheck};