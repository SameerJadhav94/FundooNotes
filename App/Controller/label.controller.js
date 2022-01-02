class LabelController {
  // eslint-disable-next-line class-methods-use-this
  addLabel = (req, res) => res.status(200).send({
    success: true,
    message: 'Label added successfully',
  });
}
module.exports = new LabelController();
