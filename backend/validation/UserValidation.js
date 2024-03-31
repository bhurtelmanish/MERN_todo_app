import zod from 'zod';

export const userRegisterSchema = zod.object({
    username : zod.string().min(3),
    email : zod.string().email(),
    password : zod.string().min(6)
})

export const userLoginSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(6)
}); 
