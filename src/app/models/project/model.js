'use-strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  projectId: {
    type: Number,
    required: true,
    unique: true
  },

  projectName: {
    type: String,
    required: true,
  },

  projectDescription: {
    type: String,
    required: true
  },

  comments: {
    author: {
      type: String,
      required: true
    }
  },

  status: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = { Project };
