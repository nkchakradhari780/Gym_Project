const equipmentModel = require('../models/equipment_model');

module.exports.addEquipment = async (req, res) => {

    console.log(req.body)
    try {
        let { id, name, type, brand, purchaseDate, purchasePrice, maintenanceDate, condition, location, status, description, quantity } = req.body;

        let existingEquipment = await equipmentModel.findOne({ id });
        if (existingEquipment) {
            return res.status(401).send('Equipment with this ID already exists');
        }

        let newEquipment = await equipmentModel.create({
            id,
            name,
            type,
            brand,
            purchaseDate,
            purchasePrice,
            maintenanceDate,
            condition,
            location,
            status,
            description,
            quantity // Include quantity
        });

        res.status(201).send(newEquipment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports.updateEquipment = async (req, res) => {
    try {
        let { name, type, brand, purchaseDate, purchasePrice, maintenanceDate, condition, location, status, description, quantity } = req.body;
        let {id} = req.params;

        let existingEquipment = await equipmentModel.findOneAndUpdate(
            { id },
            {
                name,
                type,
                brand,
                purchaseDate,
                purchasePrice,
                maintenanceDate,
                condition,
                location,
                status,
                description,
                quantity // Update quantity if provided
            },
            { new: true }
        );

        if (!existingEquipment) {
            return res.status(404).send('Equipment with this ID not found');
        }

        res.send(existingEquipment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
module.exports.removeEquipment = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to get the ID from the URL

        // Attempt to find and delete the equipment using the provided id
        let equipment = await equipmentModel.findOneAndDelete(id );
        
        if (!equipment) {
            // If no equipment is found, return 404
            return res.status(404).send('Equipment not found');
        }

        // If the equipment is found and deleted, send success message
        res.status(200).send("Equipment deleted successfully");
    } catch (err) {
        console.error(err.message);
        // In case of any error, send a 500 server error response
        res.status(500).send('Server error');
    }
};


module.exports.listEquipments = async (req, res) => {
    try {
        // Fetch list of all equipment
        const equipmentList = await equipmentModel.find();
        
        // Get the total count of equipment
        const totalEquipments = await equipmentModel.countDocuments();

        // Send response with the equipment list and total count
        res.status(200).json({
            total: totalEquipments,
            equipments: equipmentList
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.equipmentDetails = async (req,res) => {
    const { id } = req.params;

  try {
    // Find equipment by the unique 'id' field
    const equipment = await equipmentModel.findOne({ id });

    // Check if the equipment exists
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    // Send equipment data in response
    res.status(200).json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}