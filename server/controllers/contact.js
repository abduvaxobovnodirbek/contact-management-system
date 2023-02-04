const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Contact = require("../models/Contact");
const { cloudinary } = require("../utils/cloudinary");

exports.createContact = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  let numberPattern = /\d+/g;
  req.body.phoneNumber = req.body.phoneNumber.match(numberPattern).join("");

  if (req.body.image) {
    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "dev_setups",
    });

    const contact = await Contact.create({
      ...req.body,
      image: uploadResponse.public_id.slice(11),
    });
    res.status(201).json({
      success: true,
      data: contact,
    });
  } else {
    const contact = await Contact.create({
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: contact,
    });
  }
});

exports.getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user })
    .populate("user category")
    .sort("-createdAt");

  if (!contacts) {
    return next(new ErrorResponse(`contacts not found`, 404));
  }

  res.status(200).json({ success: true, data: contacts });
});

exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    contact.user.toString() !== req.user.id &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to delete this contact`,
        401
      )
    );
  }

  contact.remove();

  res.status(200).json({ success: true, data: {} });
});
