const multer = require('multer');

const avatarStorage = multer.diskStorage({
    destination: 'media/avatars/',
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        const fileName = `${req.body.email}.${extension}`;
        cb(null, fileName);
    }
});

const avatarFileFilter = (req, file, next) => {
    // @TODO: Validate using file-type (need to convert image to buffer)
    const regx = /^image\/.+$/;

    const isMimeValid = regx.test(file.mimetype);

    if (isMimeValid) {
        next(null, true);
    } else {
        next(new Error('Invalid file type'));
    }
};

// for parsing multipart/form-data
const avatarUpload = multer({
    storage: avatarStorage,
    fileFilter: avatarFileFilter,
    limits: {
        fileSize: 50000,
    },
}).single('avatar');

module.exports = avatarUpload;