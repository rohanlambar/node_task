import express from 'express'

import {upload} from './upload.js'

import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT  || 5000 ;
const app = express();

app.post('/api/cloud/upload', upload.array("project",5),(req,res)=>{
         try{
              if(!req.files || !req.files.length === 0){
                return res.status(400)
                          .json({
                            message : "no files uploaded",
                            success : false,
                          });
              }
              const fileUrl = req.files.map((file)=>file.path);

              return res.status(200)
                        .json({
                            message : "successfully uploaded files",
                            success : true,
                            filePath : fileUrl,
                        });}
            catch(err){
                console.log("error : ",err);
                return res.status(500)
                          .json({
                            message : "error while ",
                          })
            }
});

app.listen(PORT,()=>{console.log(`Listening for cloud upload on ${PORT}`)});