const crypto = require('crypto');

const generateHash = (value) => {
    const hash = crypto.createHmac('sha256', process.env.SECRET)
        .update(value)
        .digest('hex');

    return hash;
};

module.exports = generateHash;
