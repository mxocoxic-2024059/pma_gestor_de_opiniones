import { Schema, model } from "mongoose";

const fieldSchema = new Schema({
    fieldName: {
        type: String,
        required: [true, 'El nombre del campo es obligatorio'],
        trim: true,
        max: [100, 'El nombre del campo no puede exceder los 100 caracteres']
    },
        fieldType: {
        type: String,
        required: [true, 'El tipo del campo es obligatorio'],
        enum: {
            values: ['NATURAL', 'SINTETICA', 'CONCRETO'],
            message: 'El tipo del campo no es valido'
        }
    },
    Capacity: {
        type: String,
        required: [true, 'La capacidad del campo es obligatoria'],
        enum: {
            values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'],
            message: 'La capacidad del campo no es valida'
        }
    },
    pricePerHour: {
        type: Number,
        required: [true, 'El precio por hora del campo es obligatorio'],
        min: [0, 'El precio por hora no puede ser negativo']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    photo: {
        type: String,
        default: 'fields/kinal_sports_nyvxo5'
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { 
    timestamps: true,
    versionKey: false
});

fieldSchema.index({ isActive: 1 });
fieldSchema.index({ fieldType: 1 });
fieldSchema.index({ isActive: 1, fieldType: 1 });

export default model('Field', fieldSchema);
