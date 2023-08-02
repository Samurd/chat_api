const { Users, Participants, Conversations } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");


// CREATE USER

const createUser = async (req, res,) => {



    try {
        const {username, email, password} = req.body;



        //saltRounds for hash
        const saltRounds = 10;

        //password hashed
        const hashed = await bcrypt.hash(password, saltRounds);


        await Users.create({username, email, password: hashed});

       res.status(200).send(hashed);
    } catch (error) {
        res.status(400).json(error);
    }
}


// LOGIN USER

const loginUser = async (req, res, next) => {



    try {
        const {email, password} = req.body;
    
        const user = await Users.findOne({ where: {email}});

        // si el usuario existe devuelve un objeto
        // si no existe devuelve un null

        if(!user) {

            return next({
                status: 400,
                errorName: "Invalid Credentials",
                error: "Incorrect email or password"
            })

            // return res.status(400).json({
            //     message: "incorrect email / password"
            // });
        }


        //validamos si la contraseña de la peticion es igual a la contraseña hasheada en la base de datos

        const validPassword = await bcrypt.compare(password, user.password)


        if(!validPassword) {
            next({
                status: 400,
                errorName: "Invalid Credentials",
                error: "Incorrect email or password"
            })

            // return res.status(400).json({
            //     message: "incorrect email / password"
            // });
        }

        //

        const {id, username, firstname, lastname, profileImage, validEmial, createdAt, updatedAt} = user;

        //generar token
        const token = jwt.sign({username, firstname, lastname}, process.env.JWT_SECRET, {algorithm: "HS512", expiresIn: "1h"});

        //  Response ///

        res.json({id, username, email, firstname, lastname, profileImage, validEmial, createdAt, updatedAt, token});

    } catch (error) {
        res.status(400).json(error);
    }
}

const allUsers = async (req, res, next) => {

    try {

        const users = await Users.findAll();

        res.status(200).json(users);
        
    } catch (error) {
        next({
            status: 400,
            errorName: "No found",
            error: error
        })
    }

}

const getConversationByUserId = async (req, res, next) => {
    try {
        const {id} = req.params;
        const conversationsOfUser = await Participants.findAll({
            where: {
                userId: id
            },
            include: Conversations,
        })

        res.status(200).json(conversationsOfUser);
    } catch (error) {
        next({
            error: 400,
            errorName: "Not found",
            error: error
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    allUsers,
    getConversationByUserId
}