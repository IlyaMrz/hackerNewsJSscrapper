const handleArchive = (req,res,db) => {
    const { id } = req.body;
    if (!id) {
        return res.json('no id')
    }
    db('news').insert({id: id})
      .then( function (result) {
          res.json({ success: true, message: `${id} inserted` });     // respond back to request
       })
      .catch(err => res.status(400).json('unable to insert id'))
}

module.exports = {
    handleArchive: handleArchive
};