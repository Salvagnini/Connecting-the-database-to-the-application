import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const nameSchema = new Schema ({
    
    name: String,
    })

const Name = mongoose.model('name', nameSchema);

export {Name, nameSchema};