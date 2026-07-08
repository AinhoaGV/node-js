import {z} from "zod";

const registerUserSchema = z.object({
    username: z
    .string("El nombre de usuario es requerido")
    .trim()
    .min(3, "La contraseña debe tener al menos 3 caracteres" ),
    email: z
    .string("El correo electrónico es requerido")
    .email("El correo electrónico debe ser valido"),
    password: z
    .string("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres" )
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial" )
});
//z.regex

export default registerUserSchema;