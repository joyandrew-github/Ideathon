const Note = require('../models/Note');

// exports.getNotes = async (req, res) => {
//   const notes = await Note.find({ user: req.user._id });
//   res.json(notes);
// };

exports.getNotes = async (req, res) => {
    const { title, description, sortBy, order, page = 1, limit = 10 } = req.query;
  
    try {
      // Build filter object
      const filter = {
        user: req.user._id,
        ...(title && { title: { $regex: title, $options: 'i' } }), // Case-insensitive search
        ...(description && { description: { $regex: description, $options: 'i' } }),
      };
  
      // Sort object (default sort by createdAt)
      const sort = sortBy && order ? { [sortBy]: order === 'desc' ? -1 : 1 } : { createdAt: -1 };
  
      // Paginate
      const notes = await Note.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);
  
      // Count total notes for pagination
      const totalNotes = await Note.countDocuments(filter);
  
      res.json({
        notes,
        totalNotes,
        totalPages: Math.ceil(totalNotes / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

exports.createNote = async (req, res) => {
  const { title, description, secure, voice } = req.body;
  const note = await Note.create({
    user: req.user._id,
    title,
    description,
    secure,
    voice,
  });
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: 'Unauthorized' });

  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: 'Unauthorized' });

  await note.deleteOne();
  res.json({ message: 'Note removed' });
};
