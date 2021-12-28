class NoteController{
    createNote = (req, res) => {
        const  token = req.user;
        try{
            if (token) {
                return res.status(201).send({
                    success: true,
                    message: "Token verified successfully"
                });
            }else{
                return res.status(400).send({
                    success: false,
                    message: "Wrong Input"
                });
            }  
        }catch(error) {
            return res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
        
    }
}

module.exports = new NoteController();