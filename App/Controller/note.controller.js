class NoteController{
    createNote = (req, res) => {
        try{
            return res.status(200).json({
                success: true,
                message: "Note created successfully"
            });
        }catch(error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
        
    }
}

module.exports = new NoteController();