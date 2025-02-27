import {z} from 'zod'

export const formSchema = z.object({

    name: z.string().min(2).max(50),
    fuelType: z.string().min(2).max(50),
    category: z.string().min(2).max(50),
    seatCapacity: z.string().min(2).max(50),
    image: z.array(z.instanceof(File)),
    price: z.number().int().positive(),
    bookedFrom: z.date(),
    bookedTill: z.date(),
    availability: z.boolean(),
})