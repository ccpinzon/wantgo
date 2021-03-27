const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult, body } = require('express-validator');
const normalize = require('normalize-url');
const userService = require('../../services/userService');
const User = require('../../models/User');
//const Role = require('../../models/Role');
function authResp(data, response) {
  response.json(data)
}
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Por favor use en correo valido').isEmail(),
    check(
      'password',
      'La contraseña debe tener mas de 6 caracteres '
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, telefono, documento, pais, roles } = req.body;
    //const rolesFound = await Role.find({ name: { $in: roles } });

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Este usuario ya existe' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        documento,
        pais,
        telefono,
        password,
        // roles: rolesFound.map((role) => role._id)
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/users
// @desc     Edit user
// @access   Public
router.put(
  '/pass',
  [
    [
      check('password', 'campo email es requerido'),
      check(
        'password',
        'La contraseña debe tener mas de 6 caracteres '
      ).isLength({ min: 6 })
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      email,
      password,

    } = req.body;
    console.log(email, password)
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);
    console.log(newPass, "pasword encriptado")
    try {
      const newPassword = await User.findOneAndUpdate({ email: email }, {
        $set: {
          password: newPass
        }
      }, { new: true });
      res.json(newPassword);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error put users');
    }
  }
);
//rutas correo de recuperacion
router.post("/valideToken", function (reqst, resp, callback) {

  userService.valideToken(reqst.body, authResp, resp);
});
router.post("/recoverPass", function (reqst, resp, callback) {
  let user = reqst.body.email;
  console.log("Recovering pass to: ", reqst.body.email);
  userService.recoverPass(user, authResp, resp);
});

router.put('/updatePwd/:id', function (req, resp, callback) {
  console.log("Updating pwd");

  let newPwd1 = req.body.password;
  console.log(newPwd1, "aca los datos a cambiar")
  /**
  validar que la contraseña sea distinta
  **/
  let usrId = req.body.id;
  console.log(usrId, "aca el id del usuario")
  bcrypt.genSalt(10).then((salt) => {
    bcrypt.hash(newPwd1, salt).then((passencrip) => {
      userService.updatePassword(usrId, passencrip, authResp, resp);
      console.log(passencrip, "aca deberia ir el pass encirptado")
    }).catch((err) => {
      console.log(err)
    })


  }).catch((err) => {
    console.log(err)
  })


});

module.exports = router;
