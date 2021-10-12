
import AWS from 'aws-sdk';
import {nanoId} from 'nanoid'

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};
const S3 = AWS.S3(awsConfig)
export const uploadImage = async(req, res) =>{
    
    try{
        const {image} = req.body;
        if(!image) return res.status(400).send("No Image")
        const base64Data = new Buffer.from(
          image.replace(/^data:image\/w+;base64,/, ""), "base64"
        );
        const type = image.split(';')[0].split('/')[1]
        const params = {
          Bucket: "edemy-60",
          Key: `${nanoid()}.${type}`,
          Body: base64Data,
          ACL:"public-read",
          ContentEncoding: "base64",
          ContentType: `image/${type}`,
        };
        s3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                return res.sendStatus(400)
            }


        })
    }catch(err){
        console.log(err)
    }
}

export const removeImage = async (req, res) => {
    try{
        const { image } = req.body;
        if (!image) return res.status(400).send("No Image");

        const params = {
          Bucket: image.Bucket,
          Key: image.Key,
        };

        s3.deleteObject(params, (err, data) => {
          if (err) {
            console.log(err);
            return res.sendStatus(400);
          }
          res.send({ok:true})
        }); 
    }catch(err){
        console.log(err)
    }
}