import path from 'path';
const fs = require("fs");
const csv = require('csv-parser');
const neatCsv = require('neat-csv');
import {fileService} from "../service/file.service"



const sendFile= (req,res,next)=>{
console.log(req.file);
    fs.readFile(path.resolve(__dirname,`../public/files/${req.file.filename}`), async (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        var fileData= await neatCsv(data);
        console.log(fileData);
        fileData.forEach( async items=>{
            var email=items.email;
            var content = items.content;
            await fileService.getDetails(email,(data)=>{
            toMail(data,content,email);
            })
        });
        const toMail = (data,content,email) => {
            var mailList = [email];
          
            let transporter = nodeMailer.createTransport({
              host: process.env.GMAIL_SERVICE_HOST,
              port: process.env.GMAIL_SERVICE_PORT,
              secure: process.env.GMAIL_SERVICE_SECURE,
              auth: {
                user: process.env.GMAIL_USER_NAME,
                pass: process.env.GMAIL_USER_PASSWORD,
              },
            });
            mailList.toString();
            let mailOptions = {
              to: mailList,
              text:
                "Dear Sir/Madam,\n\n" +
                "First Name:"+data.first_name.capitalize() +
                "Last Name"+data.last_name.capitalize() +
                " News letter content is"+content
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return logger.error(error);
              }
              logger.info("Message " + info.messageId + " sent:" + info.response);
            });
          };

      });

}

export const fileController={
    sendFile
}