const Form = require("../models/Form");
const User = require("../models/User");
const Response = require("../models/Response");

const formsGet = async (req, res) => {
  try {
    const result = await Form.find().lean();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const createForm = async (req, res) => {
  try {
    const data = {
      createdBy: req.body.createdBy,
      name: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
    };

    const newForm = new Form(data);
    const savedForm = await newForm.save();

    await User.updateOne(
      { _id: data.createdBy },
      { $push: { createdForms: savedForm._id } }
    );

    res.status(200).json(savedForm);
  } catch (error) {
    res.send(error);
  }
};

const getFormById = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findById(formId);

    if (!form) {
      res.status(404).send("Form not found");
    } else {
      res.status(200).json(form);
    }
  } catch (error) {
    res.send(error);
  }
};

const deleteForm = async (req, res) => {
  try {
    const { formId, userId } = req.params;
    const form = await Form.findById(formId);

    if (!form) {
      res.status(404).send("Form not found or already deleted");
    } else if (form.createdBy.toString() === userId) {
      await form.remove();
      res.status(202).send("Form Deleted");
    } else {
      res.status(401).send("You are not the owner of this Form");
    }
  } catch (error) {
    res.send(error);
  }
};

const editForm = async (req, res) => {
  try {
    const formId = req.body.formId;
    const data = {
      name: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
    };

    const updatedForm = await Form.findByIdAndUpdate(formId, data, {
      new: true,
    });
    res.status(200).json(updatedForm);
  } catch (error) {
    res.send(error);
  }
};

const getAllFormsOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      const forms = await Form.find({ _id: { $in: user.createdForms } });
      res.status(200).json(forms);
    }
  } catch (error) {
    res.send(error);
  }
};

const allResponses = async (req, res) => {
  try {
    const result = await Response.find().lean();
    res.json(result);
  } catch (e) {
    res.send(e);
  }
};

const submitResponse = async (req, res) => {
  try {
    const data = {
      formId: req.body.formId,
      userId: req.body.userId,
      response: req.body.response,
    };

    if (data.response.length > 0) {
      const newResponse = new Response(data);
      const savedResponse = await newResponse.save();
      res.status(200).json(savedResponse);
    } else {
      res.status(400).send("Fill at least one field");
    }
  } catch (error) {
    res.send(error);
  }
};

const getResponse = async (req, res) => {
  try {
    const formId = req.params.formId;
    const responses = await Response.find({ formId });

    res.status(200).json(responses);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createForm,
  formsGet,
  deleteForm,
  getFormById,
  submitResponse,
  getResponse,
  allResponses,
  getAllFormsOfUser,
  editForm,
};
