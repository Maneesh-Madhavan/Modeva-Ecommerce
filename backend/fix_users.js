import mongoose from "mongoose";
import 'dotenv/config';

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

const fixUsers = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
        console.log("Connected to DB");

        const users = await userModel.find({});
        let counter = 1;
        for (const user of users) {
            if (!user.name || user.name.trim() === '') {
                user.name = `User ${counter}`;
                await user.save();
                console.log(`Updated user ${user.email} to name ${user.name}`);
                counter++;
            }
        }

        // Also update any existing reviews that might have 'undefined' or missing names
        const productSchema = new mongoose.Schema({
            reviews: [
                {
                    user: { type: String },
                    name: { type: String },
                    rating: { type: Number },
                    comment: { type: String },
                    date: { type: String }
                }
            ]
        }, { strict: false });
        const productModel = mongoose.models.product || mongoose.model("product", productSchema);
        
        const products = await productModel.find({});
        for (const product of products) {
            let modified = false;
            if (product.reviews && product.reviews.length > 0) {
                for (let i = 0; i < product.reviews.length; i++) {
                    if (!product.reviews[i].name || product.reviews[i].name === 'undefined') {
                        // try to find user to get name
                        const u = await userModel.findById(product.reviews[i].user);
                        product.reviews[i].name = u ? u.name : 'Anonymous User';
                        modified = true;
                    }
                }
                if (modified) {
                    await product.save();
                    console.log(`Updated reviews for product ${product._id}`);
                }
            }
        }

        console.log("Migration complete.");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixUsers();
