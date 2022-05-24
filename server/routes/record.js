const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("usernames");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("records")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   username: req.body.username,
   company: req.body.company_name,
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   email: req.body.email,
   password: req.body.password,
   password_check: req.body.password_check,
   signature_template: {
        signature_name: req.body.signature_name,
        heading_color: req.body.heading_color,
        byline_color_1: req.body.byline_color_1,
        byline_color_2: req.body.byline_color_2,
        logo_url: req.body.logo_url,
        logo_width: req.body.logo_width,
        extra_heading_color_1: req.body.extra_heading_color_1,
        extra_heading_color_value_1: req.body.extra_heading_color_value_1,
        extra_heading_color_2: req.body.extra_heading_color_2,
        extra_heading_color_value_2: req.body.extra_heading_color_value_2,
        extra_heading_color_3: req.body.extra_heading_color_3,
        extra_heading_color_value_3: req.body.extra_heading_color_value_3,
        extra_heading_color_4: req.body.extra_heading_color_4,
        extra_heading_color_value_4: req.body.extra_heading_color_value_4,
      }
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb("records"); 
 let myquery = { _id: ObjectId( req.params.id )}; 

 
 let newValues = {   
   $set: {     
     signature_template: {

        heading_color: req.body.$set.signature_template.heading_color ? req.body.$set.signature_template.heading_color : "",
        byline_color_1: req.body.$set.signature_template.byline_color_1 ? req.body.$set.signature_template.byline_color_1 : "",
        byline_color_2: req.body.$set.signature_template.byline_color_2 ? req.body.$set.signature_template.byline_color_2 : "",
        logo_url: req.body.$set.signature_template.logo_url ? req.body.$set.signature_template.logo_url : "",
        logo_width: req.body.$set.signature_template.logo_width ? req.body.$set.signature_template.logo_width : "",
        extra_heading_color_1: req.body.$set.signature_template.extra_heading_color_1 ? req.body.$set.signature_template.extra_heading_color_1 : "",
        extra_heading_color_value_1: req.body.$set.signature_template.extra_heading_color_value_1 ? req.body.$set.signature_template.extra_heading_color_value_1 : "",
        extra_heading_color_2: req.body.$set.signature_template.extra_heading_color_2 ? req.body.$set.signature_template.extra_heading_color_2 : "",
        extra_heading_color_value_2: req.body.$set.signature_template.extra_heading_color_value_2 ? req.body.$set.signature_template.extra_heading_color_value_2 : "",
        extra_heading_color_3: req.body.$set.signature_template.extra_heading_color_3 ? req.body.$set.signature_template.extra_heading_color_3 : "",
        extra_heading_color_value_3: req.body.$set.signature_template.extra_heading_color_value_3 ? req.body.$set.signature_template.extra_heading_color_value_3 : "",
        extra_heading_color_4: req.body.$set.signature_template.extra_heading_color_4 ? req.body.$set.signature_template.extra_heading_color_4 : "",
        extra_heading_color_value_4: req.body.$set.signature_template.extra_heading_color_value_4 ? req.body.$set.signature_template.extra_heading_color_value_4 : "",
      }
   }, 
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newValues, function (err, res) {
      if (err) throw err;
      response.json(res);
      console.log(newValues);
    });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;