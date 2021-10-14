import AWS from 'aws-sdk';
import { nanoid } from "nanoid";
import Course from '../models/course'
import slugify from 'slugify'


const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};
const S3 = new AWS.S3(awsConfig)
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
        S3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                return res.sendStatus(400)
            }
            console.log(data)
            res.json(data)

        })
    }catch(err){
        console.log(err)
    }
}

export const removeImage = async (req, res) => {
    try{
        const { image } = req.body;
        console.log(req.body)
        if (!image) return res.status(400).send("No Image");

        const params = {
          Bucket: image.Bucket,
          Key: image.Key,
        };

        S3.deleteObject(params, (err, data) => {
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

export const create = async (req, res) => {
  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });
    if (alreadyExist)
      return res.status(400).send("Course with Title Already Exist");

    const course = await new Course({
      slug: slugify(req.body.name.toLowerCase()),
      instructor: req.user._id,
      title: req.body.name,
      ...req.body,
    });
    course.save();

    console.log(course);
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};
export const read = async (req, res) => {

  console.log(req.body)
  try{
    const course = await Course.findOne({
      slug: req.params.slug,
    }).populate('instructor', "_id name").exec()
    res.json(course)
 

  }catch(err){
    console.log(err)
    return res.send(400).json("Course Creation Failed. Try Again")
  }
}