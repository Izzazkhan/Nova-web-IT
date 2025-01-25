const KYC = require('../Models/kyc');
const { tryCatch } = require("../utils/tryCatch");

// Submit KYC
exports.submit = tryCatch(async (req, res) => {
  const { userId, name, email } = req.body
  const document = req.file.path
  const kyc = new KYC({ userId, name, email, document });
  await kyc.save();
  res.send("KYC submitted successfully.");
})

// View KYC List (Admin only)
exports.get = tryCatch(async (req, res) => {
  const kycs = await KYC.find().populate('name email');
  res.json(kycs);
})

// Approve/Reject KYC
exports.patch = tryCatch(async (req, res) => {
  const { status } = req.body;
  await KYC.findByIdAndUpdate(req.params.id, { status });
  res.send("KYC status updated.");
});

