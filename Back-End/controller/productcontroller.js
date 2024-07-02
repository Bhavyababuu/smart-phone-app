const product = require("../Schema/productschema");
const multer = require('multer');
const path = require('path');
const express = require('express');

const bodyParser = require("body-parser");
const app = express();
const util = require('util');
const fs = require('fs').promises;  // Make sure to import fs.promises

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create product
const Createproduct = async (req, res) => {
  try {
    const newProduct = new product({
      productname: req.body.productname,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename, // store the filename instead of the full path
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

const imageDirectory = path.join(__dirname, './uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDirectory);
  },
  filename: function (req, file, cb) {
    console.log("File name is:" + file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

 


// View all products
const Viewproduct = async (req, res) => {
  try {
    
    const data = await product.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const download= (req, res) => {
  const fName = req.body.productname;
  console.log("File is:" + fName);
  const filePath = path.join(__dirname, 'uploads' + fName);
  const fileName = fName;

  fs.stat(filePath, (err, stat) => {
    if (err) {

      res.status(404).send('File not found');
    } else {

      res.download(filePath, fileName);
    }
  });
}




const imageview = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(imageDirectory, fileName);

  console.log('File path:', filePath);

  try {
    const stats = await fs.stat(filePath);
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error:', err);
    res.status(404).send('File not found');
  }
};





const viewsingleproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const singleproduct = await product.findById({ _id: id });
    res.json(singleproduct);
  } catch (error) {
    res.json({ message: "Product not found", error: error.message });
  }
};

const removeproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const removeproduct = await product.findByIdAndRemove({ _id: id });
    res.json({ msg: "Product removed", removeproduct: removeproduct });
  } catch (error) {
    res.json({ message: "Failed to remove product", error: error.message });
  }
};

const updateproduct = async (req, res) => {
  const { productname, category, price, description } = req.body;
  const _id = req.body.id;

  try {
    const updateddata = await product.findByIdAndUpdate(_id, { productname, category, price, description });
    res.json({ msg: "Product updated", updateddata: updateddata });
  } catch (error) {
    res.json({ message: "Failed to update product", error: error.message });
  }
};



module.exports = { Createproduct, Viewproduct, viewsingleproduct, removeproduct, updateproduct,imageview,download };


