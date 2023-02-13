module.exports = function generateRequest(type) {
  const templates = {
    body: `const { createBodyValidationMiddleware, body } = require('gwik');
const confirmed = require('../../../common/validator/confirmed.validator');

module.exports = createBodyValidationMiddleware([
  body('name').exists(),
  body('password').exists().custom(confirmed('password_confirmation')),
]);`,
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
