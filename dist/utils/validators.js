import { body, validationResult } from "express-validator";
//const validate =(validations : ValidationChain ) =>{}
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next;
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("Email").trim().isEmail().withMessage("Email is required"),
    body("Password").trim().isLength({ min: 6 }).withMessage("Minimum 6 character for password is required"),
];
// export default validate;
//# sourceMappingURL=validators.js.map