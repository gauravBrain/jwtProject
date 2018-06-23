/**
 * @author Gaurav Srivastava
 */

const multer = require('multer');

    path = require('path'),
    upload = multer({ dest: path.resolve('./uploads'), filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, buffer) {
            if (err) return cb(err);
            cb(null, buffer.toString('hex') + path.extname(file.originalname))
        })
    }})

    // Exports module
    module.exports = {

        single : _singleFile ,
        array : _fileArray ,
        fields : _randomFiles,
        any : upload.any
    }



function _singleFile( key ) {
    return upload.single( key );
}

function _fileArray(key, count) {
    return upload.array( key , count );
}

/**
 *  Upload Multiple Files with different keys
 * @param array :: example : [{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]
 * @returns {*}
 * @private
 */
function _randomFiles( array ) {
    return upload.fields( array );
}