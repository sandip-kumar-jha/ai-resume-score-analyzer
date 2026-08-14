const UserModel = require("../Models/user");

exports.register = async (req, res) => {
    try {
        const { name, email, photoUrl } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required",
            });
        }

        const userExist = await UserModel.findOne({ email });

        // Existing user
        if (userExist) {
            userExist.name = name;

            if (photoUrl) {
                userExist.photoUrl = photoUrl;
            }

            await userExist.save();

            return res.status(200).json({
                message: "Welcome Back",
                user: userExist,
            });
        }

        // New user
        const newUser = new UserModel({
            name,
            email,
            photoUrl: photoUrl || "",
        });

        await newUser.save();

        return res.status(201).json({
            message: "Account created successfully",
            user: newUser,
        });

    } catch (err) {
        console.log("Register Error:", err);

        return res.status(500).json({
            error: "Server error",
            message: err.message,
        });
    }
};