import {z} from "zod";

const updateTodoSchema = z.object({
    title: z
    .string("El título es requerido")
    .trim()
    .min(1, "El título no puede estar vacío"),
    completed: z.boolean("El valor debe ser true o false").optional(),
});

export default updateTodoSchema;