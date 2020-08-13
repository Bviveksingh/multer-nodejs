import express, {Request,Response,NextFunction} from 'express';
import {ProductModel} from '../models/Product';
import multer from 'multer';
import path from 'path';


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
    }
  });


const fileFilter = (req: any,file: any,cb: any) => {

  if(file.mimetype === "image/jpg"  || file.mimetype === "image/jpeg"  || file.mimetype === "image/png"){
    cb(null, true);
  }
  else{
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
  }



 }

const upload = multer({storage: storage, fileFilter : fileFilter});

router.post('/', upload.array('images',5),async(req:Request,res:Response, next:NextFunction)=>{
    let newProduct = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        images: req.files
    });
    await newProduct.save();
    res.send(newProduct);
});

export {router as ProductRoutes};
