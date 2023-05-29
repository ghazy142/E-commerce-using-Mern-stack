import multer from "multer";

const fileValidation = {
  image: ["image/jpeg", "image/png", "image/gif"],
  file: ["application/pdf", "application/msword"],
  video: ["video/mp4"],
};

function fileUpload(customValidation = []) {
  const storage = multer.diskStorage({});

  const upload = multer({ storage });
  return upload;
}

export { fileUpload };
