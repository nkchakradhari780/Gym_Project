const Announcement = require('../models/announcement_model');

module.exports.sendAnnouncement = async (req, res) => {
    try {
      const { message, roles } = req.body;
      const newAnnouncement = new Announcement({ message, roles });
      await newAnnouncement.save();
      res.status(201).json({ message: 'Announcement created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports.getAnnouncement = async (req, res) => {
    try {
      const role = req.role;
      if(!role){
        return res.status(400).json({error: "Role not found in cookies"})
      }

      const announcements = await Announcement.find({ roles: role });
      res.status(200).json(announcements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };