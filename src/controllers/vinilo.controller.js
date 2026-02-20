const Vinilo = require('../models/Vinilo');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.getAllVinilos = async (req, res) => {
    try {
        const vinilos = await Vinilo.find({});
        return res.status(200).json({ vinilos });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener vinilos',
            error: error.message
        })
    }
}

exports.createVinilo = async (req, res) => {
    try {
        const { name, price, description, img, currency, slug } = req.body;
        const product = await stripe.products.create({
            name,
            description,
            images: [img],
            metadata: {
                productDescription: description,
                slug
            }
        });

            const stripePrice = await stripe.prices.create({
            unit_amount: price,
            currency,
            product: product.id   
        });


        const newVinilo = await Vinilo.create({ 
            idProd: product.id,
            priceID: stripePrice.id,
            name, 
            price, 
            description,
            img,
            currency,
            slug
        });

        if (!newVinilo) return res.status(400).json({ error: 'No fue posible crear vinilo' });

        return res.status(201).json({ datos: newVinilo });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear vinilo',
            error: error.message
        })
    }
}

exports.updateViniloById = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const updatedVinilo = await Vinilo.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true, runValidators: true }
        )
        if (!updatedVinilo) return res.status(404).json({ message: 'Vinilo no encontrado' });
        return res.status(200).json({ viniloActualizada: updatedVinilo });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al actualizar la vinilo',
            error: error.message
        })
    }
}

exports.deleteViniloById = async (req, res) => {
    try {
        const deletedVinilo = await Vinilo.findByIdAndDelete(req.params.id);
        if (!deletedVinilo) return res.status(404).json({ message: 'Vinilo no encontrado' });
        return res.status(200).json({ message: 'Vinilo se elimino correctamente' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar vinilo',
            error: error.message
        })
    } 
}



exports.getViniloById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const vinilo = await Vinilo.findById(id).lean();
    if (!vinilo) {
      return res.status(404).json({ message: 'Vinilo no encontrado' });
    }
    return res.status(200).json({ vinilo });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener vinilo',
      error: error.message
    });
  }
};
