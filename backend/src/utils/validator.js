// const validator =require("validator");

// // req.body 

// const validate = (data)=>{
   
//     const mandatoryField = ['firstName',"emailId",'password'];

//     const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

//     if(!IsAllowed)
//         throw new Error("Some Field Missing");

//     if(!validator.isEmail(data.emailId))
//         throw new Error("Invalid Email");

//     if(!validator.isStrongPassword(data.password))
//         throw new Error("Week Password");
// }

// module.exports = validate;

const validate = (data)=>{
   
    const mandatoryField = ['firstName',"emailId",'password'];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");

    if(!validator.isStrongPassword(data.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }))
        throw new Error("Weak Password - need 8+ chars, uppercase, lowercase, number, and symbol");
    
    return true;  // ← ADD THIS LINE
}
module.exports = validate;