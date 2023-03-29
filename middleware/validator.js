const {check, validationResult } = require("express-validator");

const ExceptedCategory = ['breaking-news','tech','political','entertainment'];
const validator = [
    check('title').trim().not().isEmpty().withMessage("Title is required !!"),
    check('content').trim().not().isEmpty().withMessage("Must have some content !!"),
    check('category').isIn(ExceptedCategory).withMessage("Select at least one category !!")
]
const result = (req,res,next) =>{
    const result = validationResult(req);
    const hasError = !result.isEmpty();
    if(hasError){
        const ErrMessage = result.array()[0].msg;
        res.json({success : false, message : ErrMessage});
    }
    next();
}
const ValidateFile = (req,res,next) =>{
    const ExceptedImage = ['png','jpg','jpeg'];
    if(!req.file){
        return res.json({success : false, message : 'Image is required !!'});
    }
    const fileExtention = req.file.mimetype.split('/').pop();
    if(!ExceptedImage.includes(fileExtention) ){
        return res.json({success : false, message : 'Image is not valid !!'});
    }
    next();
}
module.exports = {
    validator,
    result,
    ValidateFile
}