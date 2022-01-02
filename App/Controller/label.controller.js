const validation = require('../utilities/validation');
class LabelController {
  // eslint-disable-next-line class-methods-use-this
  addLabel = (req, res) =>{
  try{
      const label = {
          userId: req.user.tokenData.id,
          noteId: req.params.id,
          label: req.body.label
      }
      const validateLabel = validation.labelValidation.validate(label);
      if (validateLabel.error) {
          res.status(400).send({ 
              success: false,
              message: 'Wrong label validation'
          })
      }
        res.status(200).send({
            success: true,
            message: 'Label added successfully',
        });
  }catch(error){
      res.status(500).send({
          success: false,
          message: 'Internal server error',
      })
  }; 
  };
}

module.exports = new LabelController();