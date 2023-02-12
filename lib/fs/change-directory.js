const { promisify } = require('util')
const child_process = require('child_process')
const exec = promisify(child_process.exec)

module.exports = async function changeDirectory(dirPath) {
    try {
        await exec(`cd ${dirPath}`)
    } catch (err) {
        throw new Error('failed to change directory');
    }
}