const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config=require('../config.json');
const Admin = require("../models/admin");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin authentication and registration APIs
 */

/**
 * @swagger
 * /api-docs/admin/login:
 *   post:
 *     summary: Authenticate admin
 *     description: Authenticate an admin using username and password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       404:
 *         description: Username not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserNameNotFound:
 *                   type: string
 *                   example: "Username not found"
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "Admin YOUR_JWT_TOKEN_HERE"
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 passwordincorrect:
 *                   type: string
 *                   example: "Password incorrect"
 */
// @route POST api/users/login
router.post("/login", (req, res) => {
  console.log("This is Body",req.body);
  
  const username = req.body.username;
  const password = req.body.password;
  // Find user by email

  Admin.findOne({ username }).then(admin => {
      console.log("admin",admin);      // Check if user exists
      
      if (!admin) {
        return res.status(404).json({ UserNameNotFound: "Username not found" });
      }
      // Check password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          console.log("Admin Found");
          // User matched
          // Create JWT Payload
          const payload = {
            id: admin.id,
            name: admin.name
          };
          // Sign token
          jwt.sign(
            payload,
            config.secretOrKey,
            {
              expiresIn: 86400 // 1 day in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: token,
                role: "Admin",
                user:admin
              });

            }
            );
          } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
          }
        });
      });
    });
    
    // @route POST api/users/register
    router.post("/register", (req, res) => {
      
        Admin.findOne({ email: req.body.email }).exec()
        .then(admin => {
          if (admin) {
            return res.status(400).json({ email: "Email already exists" });
          } else {
            const newAdmin = new Admin({
                username: req.body.username,
              name: req.body.name,
              mobile:req.body.mobile,
              email: req.body.email,
              password: req.body.password
            });
      // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                if (err) throw err;
                newAdmin.password = hash;
                newAdmin.save()
                  .then(admin => res.json(admin))
                  .catch(err => console.log(err));
              });
            });
          }
        }
        ).catch(err => {
          console.log("User not found")
        });
      });
  module.exports = router;