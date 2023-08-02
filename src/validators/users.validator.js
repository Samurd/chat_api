const { check, validationResult } = require("express-validator");

const loginUserValidator = [
    //verificar cada una de la propiedades del req
    check("email", "Error con el email")
    .exists()
    .isString()
    .isEmail()
    .withMessage("El formato no esta en email")
    ,

    check("password", "Error con el password ")
    .exists()
    .notEmpty()
    .isString(),

    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            res.status(400).json(error.errors.map((error) => error.msg));
        }
    }
];


const registerUserValidator = [
    check("username", "Error con el username")
    .exists()
    .isString()
    .notEmpty()
    .isLength({min: 5, max: 30})
    ,

    check("email", "Error con el email")
    .exists()
    .isString()
    .isEmail()
    .withMessage("El formato no esta en email")
    ,
    check("password", "Error con el password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({min: 8})
    ,

    (req, res, next) => {
        try {
            validationResult(req).throw();
            next()
        } catch (error) {
            res.status(400).json(error);
        }
    }

];


module.exports = {
    loginUserValidator,
    registerUserValidator
}
