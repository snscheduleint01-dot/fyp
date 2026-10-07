import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: "dlwqcfkc8",
    api_key: "572354957554736",
    api_secret: "istqvSQLaQacNOvvB6tuvNy787c",
  });
  console.log("Cloudinary Connected");
};

export default connectCloudinary;
