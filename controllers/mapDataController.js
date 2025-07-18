const { mapData } = require("../models");

//add data
const create = async (req, res) => {
  try {
    userId = req.user.id;
    const { start_location, destination, vehicle } = req.body;

    if (!start_location || !destination || !vehicle) {
      return res.status(400).json({
        message: "All fields are require",
      });
    }

    const data = await mapData.create({
      userId,
      start_location,
      destination,
      vehicle,
    });

    return res.status(200).json({
      message: "Successfylly Created",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get Data
const getData = async (req, res) => {
  try {
    const userId = req.user.id;

    const exsitingData = await mapData.findAll({ where: { userId } });
    if (exsitingData.length === 0) {
      return res.status(404).json({
        message: "No record found",
      });
    }

    return res.status(200).json({
      message: "Record fatch successfylly",
      exsitingData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { create, getData };
