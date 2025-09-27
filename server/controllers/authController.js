const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../data/users.js');


exports.login = async(req, res) => {
       const {username, password } = req.body;
       
       const user = users.find((u)=> u.username === username);
       if(!user) {
            return res.status(401).json({message: 'invalid credentials'});
}
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
               return res.status(401).json({message: 'Invalid username or password'});
            }
       const token = jwt.sign(
            {id: user.id, username: user.username, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
       );
       res.json({token});

};