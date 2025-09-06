const Joi=require("joi");
function createTaskCheck(input){
    const schema=Joi.object({
        title:Joi.string().required().max(50),
        description:Joi.string().optional().max(100),
        status:Joi.string().required(),
        priority:Joi.string().required(),
        dueDate:Joi.date().optional(),
        category:Joi.string().required().max(10).min(3),
        user_id:Joi.string().required()
    })
    return schema.validate(input);
}
function updateTaskCheck(input){
    const schema=Joi.object({
        title:Joi.string().max(50),
        description:Joi.string().max(100),
        status:Joi.string(),
        priority:Joi.string(),
        dueDate:Joi.date(),
        category:Joi.string().max(10).min(3),
    }).min(1)
    return schema.validate(input);
}
module.exports={createTaskCheck,updateTaskCheck};
