const fs = require('fs');
const myemail = fs.readFileSync('./email.txt', 'utf8').toString();
const mypas = fs.readFileSync('./pasS.txt', 'utf8').toString();


const handlerSignin = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
        const isValid = (email == myemail) && (mypas == password);
        if (isValid) {
            return res.json({'staatus':'true'})
        } else {
            res.status(400).json('wrong credentials!')
        }
}


module.exports = {
    handlerSignin: handlerSignin
};