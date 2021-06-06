import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination:(req,file,done)=>{
        done(null,path.resolve(__dirname,"../public/files"))
    }
});

const fileFilter = (req,file,next) => {
    if(file.mimetype === 'text/csv'){
        next(null,true);
    }
    else{
        next(new Error('File not found!!'),false);
    }
};

exports.upload = multer({
    storage,
    limits: {
        fileSize: 1024*1024*5,
    },
    fileFilter,
});