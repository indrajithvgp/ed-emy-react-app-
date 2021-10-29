import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import Course from "../models/course";
import slugify from "slugify";
import fs from "fs";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};
const S3 = new AWS.S3(awsConfig);
export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No Image");
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = image.split(";")[0].split("/")[1];
    const params = {
      Bucket: "edemy-60",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(data);
      res.json(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeImage = async (req, res) => {
  try {
    const { image } = req.body;
    console.log(req.body);
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
      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req, res) => {
  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.title.toLowerCase()),
    });
    // console.log(alreadyExist);
    if (alreadyExist) return res.status(400).send("Course with Title Already Exist");
    
    const course = await new Course({
      slug: slugify(req.body.title.toLowerCase()),
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
export const read = async (req, res,next) => {
  
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
    })
      .populate("instructor", "_id name")
      .exec();
      // console.log(course);
    res.status(201).json(course);
    next()
  } catch (err) {
    console.log(err);
    return res.send(400).json("Course Creation Failed. Try Again");
  }
};

export const uploadVideo = async (req, res) => {
  try {
    // if (req.user._id != req.params.instructorId) {
    //   return res.status(401).send("Unauthorized");
    // }
    const { video } = req.files;
    if (!video) return res.status(400).send("No Video");

    const params = {
      Bucket: "edemy-60",
      Key: `${nanoid()}.${video.type.split("/")[1]}`,
      Body: fs.readFileSync(video.path),
      ACL: "public-read",
      // ContentEncoding: "base64",
      ContentType: video.type,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.log("err", err);
        return res.sendStatus(400);
      }
      console.log("sent", data);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const removeVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(401).send("Unauthorized");
    }
    const { Bucket, Key } = req.body;
    console.log(Bucket, Key)
    if (!Bucket || !Key) return res.status(400).send("No Video");

    const params = {
      Bucket,
      Key,
    };
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("err", err);
        return res.sendStatus(400);
      }
      console.log("sent", data);
      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const addLesson = async (req, res) => {
  try {
    const { slug, instructorId } = req.params;
    const { title, content, video } = req.body;
    // if (req.user._id != req.params.instructorId) {
    //   return res.status(401).send("Unauthorized");
    // }
    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Add Lesson Failed");
  }
};

export const update = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await Course.findOne({ slug: slug }).exec();
    if (course.instructor != req.user._id) {
      return res.status(402).send("Unauthorized");
    }
    const updated = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message)
  }
};

export const removeLesson = async(req, res, next) => {
  try {
    const { slug, lessonId } = req.params;
    const findCourse = await Course.findOne({ slug: slug }).exec();
    if (findCourse.instructor != req.user._id) {
      return res.status(402).send("Unauthorized");
    }
    const course = await Course.findByIdAndUpdate(findCourse._id, {
      $pull: { lessons: { _id: lessonId } },
    }).exec();
    res.json({ok:true});
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}

export const updateLesson = async(req, res)=>{
  try{
    const {slug} = req.params
  const {_id, title, content, video, free_preview} = req.body
  const course = await Course.findOne({slug: slug}).select('instructor').exec()
  // if(course.instructor_id != req.user._id){
  //   return res.status(400).send('Unauthorized')
  // }
  const updated = await Course.updateOne(
    { "lessons.id": _id },
    {
      $set: {
        "lessons.$.title": title,
        "lessons.$.content": content,
        "lessons.$.video": video,
        "lessons.$.free_preview": free_preview,
      },
    },{new: true}
  ).exec();
  console.log(updated);
  res.json({ok:true})
  }catch(err){
    console.log(err)
    res.status(400).send("Update Failed")
  }
}
export const publish = async (req, res) => {

const {courseId} = req.params
    const course = await Course.findById(courseId).select("instructor").exec()
  console.log(course)
  try{
    const {courseId} = req.params
    const course = await Course.findById(courseId).select("instructor").exec()
    
    // if(course.instructor._id!=req.user._id){
    //   return res.status(400).send("Unauthorized")

    // }
    const updated = await Course.findByIdAndUpdate(courseId, {published: true}, {new:true}).exec()
    res.json(updated)
  }catch(err){
    console.log(err)
    return res.status(400).send('Course Publish Failed')
  }
}
export const unpublish = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select("instructor").exec();
    // if (course.instructor._id != req.user._id) {
    //   return res.status(400).send("Unauthorized");
    // }
    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Course Unpublish Failed')
  }
}

export const courses = async (req, res) => {
  const all = await Course.find({published: true}).populate("instructor", "_id name").exec()
  res.json(all)
}