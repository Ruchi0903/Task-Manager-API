import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // you can adjust this later
    });
};

export default generateToken;