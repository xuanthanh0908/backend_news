const fs = require("fs");
const sharp = require("sharp");

const ImageProcess = async (req,id) => {
    fs.access("./data/uploads", (err)=>{
        if(err){
            fs.mkdirSync("./data/uploads");
        }
    })
    const FormatedName = req.file.originalname.split(" ").join("-");
    const fileName = `${id}-${FormatedName}`;
    try {
        await sharp(req.file.buffer).resize({width : 615, height : 350}).toFile('./data/uploads/' + fileName);
    } catch (error) {
        console.log('Error while processing image !!',error);        
    }
    return fileName;
}

module.exports = ImageProcess;