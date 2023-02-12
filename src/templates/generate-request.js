module.exports = function generateRequest(type) {
  const templates = {
    body: `const { body } = require('gwik');

module.exports = [
    body('name').exists()
];`,
    multipart: `const uploadMiddleware = require('../../../common/middlewares/upload.middleware');

module.exports = uploadMiddleware({
  field: 'photo',
  allowedTypes: ['png', 'PNG', 'jpg'],
  dir: 'users',
  getFilename: ({ req, file }) => file.originalname,
});`,
  };

  return templates[type];
};
