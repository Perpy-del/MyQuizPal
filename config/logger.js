const path = require('path')
const rfs = require('rotating-file-stream')

const generator = () => {
    const time = new Date();

    const year = time.getFullYear();
    const month = pad(time.getMonth() + 1);
    const day = pad(time.getDate());

    return `express-${year}-${month}-${day}.log`;
}

const pad = (num) => num > 9 ? `0${num}` : num;
 
// create a rotating write stream
const accessLogStream = rfs.createStream(generator, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../storage/logs')
})

module.exports = accessLogStream;