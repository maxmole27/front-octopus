import { z } from 'zod'

export const createSchema = z.object({
  systemName: z.string({
    required_error: 'El nombre del sistema es requerido'
  })
    .min(3, { message: 'El nombre del sistema debe tener al menos 3 caracteres' }),

  systemIsBacktesting: z.boolean(),

  systemInitialBankroll: z.number({
    required_error: 'El bankroll inicial es requerido'
  })
    .min(1, { message: 'El bankroll inicial debe ser mayor a 0' }),

  systemDefaultStake: z.number({
    required_error: 'La apuesta por defecto es requerida'
  })
    .min(1, { message: 'La apuesta por defecto debe ser mayor a 0' }),

  systemDefaultBookie: z.number({
    required_error: 'La casa de apuestas por defecto es requerida'
  }),

  systemDefaultSports: z.number({
    required_error: 'El deporte por defecto es requerido'
  }),

  systemProfileImage: z.string().optional()
})
