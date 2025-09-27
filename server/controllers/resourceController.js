const Resource= require('../models/ResourceLog');


exports.createResourceLog = async(req, res) => {
            try{
                const {title, description, category, link} = req.body;
                const newResource = new Resource({title, description, category, link});
                const savedResource = await newResource.save();
                res.status(201).json(savedResource); 
            } catch (error) {
            res.status(500).json({message: 'Server Error', error});
            }
};

exports.getAllResourceLogs = async(req, res) => {
            try {
                const resources = await Resource.find();
                res.status(200).json(resources);
            }catch (error) {
                res.status(500).json({message: 'Server Error', error});
            }
};

exports.getResourceLogById = async(req, res) => {
            try{
                const resource = await Resource.findById(req.params.id);
                if(!resource) {
                   return res.status(404).json({message: 'Resource not found'});
                }
                res.status(200).json(resource);
            }catch (error) {
                res.status(500).json({message: 'Server Error', error});
            }
};

exports.updateResourceLog = async(req, res) => {
            try{
               const {title, description, category, link} = req.body;
               const updatedResource = await Resource.findByIdAndUpdate(
                  req.params.id,
                  {title, description, category, link},
                  {new:true}
               );
               if(!updatedResource) {
                  return res.status(404).json({message: 'Resource not found'});
               }
               res.status(200).json(updatedResource);
            }catch (error) {
               res.status(500).json({message: 'Server Error', error});
            }
};

exports.deleteResourceLog = async(req, res) => {
            try{
                const deletedResource = await Resource.findByIdAndDelete(req.params.id);
                if(!deletedResource) {
                 return res.status(404).json({messafe: 'Resource not found'});
                }
                res.status(200).json({message: 'Resource deleted successfully'});
            }catch (error) {
                res.status(500).json({message: 'Server Error', error});
            }
};