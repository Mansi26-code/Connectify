const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2; // Cloudinary package
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/social";

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
}

connectToDB();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "drdtgt2co",
  api_key: process.env.CLOUDINARY_API_KEY || "916724369196793",
  api_secret: process.env.CLOUDINARY_API_SECRET || "nDetHdOnjCI51atyI2gZIkMyYK8",
});

// Multer Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "social_app", // Folder in Cloudinary where images will be stored
    format: async (req, file) => "jpg", // Format for uploaded images
    public_id: (req, file) => file.originalname, // Use original filename as the public ID
  },
});

const upload = multer({ storage });

// Static file serving (optional, if you still want to serve static files locally)
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Cloudinary upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    // Cloudinary automatically returns the URL of the uploaded file
    return res.status(200).json({
      message: "File uploaded successfully.",
      fileUrl: req.file.path || req.file.secure_url, // Using Cloudinary's URL
    });
  } catch (err) {
    console.error("File upload error:", err);
    return res.status(500).json({ message: "Failed to upload file.", error: err });
  }
});

// Route to handle post creation
app.post("/api/posts", async (req, res) => {
  try {
    const { desc, img } = req.body; // Extract post data from request

    // Create a new post (assuming a Post model exists)
    const newPost = new Post({
      desc,
      img, // Save the image URL (optional)
      // Add other fields like userId, createdAt, etc.
    });

    // Save the post to the database
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost); // Return the saved post
  } catch (err) {
    console.error("Failed to create post:", err);
    return res.status(500).json({ message: "Failed to create post", error: err });
  }
});

// Test route for home
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// Test route for users
app.get("/users", (req, res) => {
  res.send("Welcome to the users page");
});

// Start the server
app.listen(8800, () => {
  console.log("Backend Server is listening on port 8800");
});
