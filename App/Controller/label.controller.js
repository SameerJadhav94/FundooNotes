class LabelController {
  // eslint-disable-next-line class-methods-use-this
  addLabel = (req, res) =>{
  try{
      const label = {
          label: req.body.label
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