import About from "../models/About.js";

// Get About (public) — creates default if none exists
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch about info.", error: err.message });
  }
};

// Update About (admin only)
export const updateAbout = async (req, res) => {
  try {
    const { photo, name, tagline, bio } = req.body;

    let about = await About.findOne();
    if (!about) {
      about = await About.create({ photo, name, tagline, bio });
    } else {
      about.photo = photo ?? about.photo;
      about.name = name ?? about.name;
      about.tagline = tagline ?? about.tagline;
      about.bio = bio ?? about.bio;
      await about.save();
    }

    res.status(200).json({ message: "About info updated successfully.", about });
  } catch (err) {
    res.status(500).json({ message: "Failed to update about info.", error: err.message });
  }
};