import { z } from 'zod'

export const pickResolver = z.object({
  sport_id: z.number({
    required_error: 'El deporte es requerido'
  })
    .min(1, { message: 'El deporte es requerido' }),
  player_or_team1_str: z.string({
    required_error: 'El jugador o equipo 1 es requerido'
  })
    .min(1, { message: 'El jugador o equipo 1 es requerido' })
})

export const createSchema = z.object({
  bookie_id: z.number({
    required_error: 'La casa de apuestas es requerida'
  })
    .min(1, { message: 'La casa de apuestas es requerida' }),
  stake: z.number({
    required_error: 'La cantidad apostada es requerida',
    invalid_type_error: 'El stake debe ser un número'
  })
    .min(1, { message: 'La cantidad apostada debe ser mayor a 0' })
    .nonnegative({ message: 'La cantidad apostada debe ser mayor a 0' }),
  money_stake: z.number({
    required_error: 'La cantidad apostada es requerida',
    invalid_type_error: 'El stake debe ser un número'
  })
    .min(1, { message: 'La cantidad apostada debe ser mayor a 0' })
    .nonnegative({ message: 'La cantidad apostada debe ser mayor a 0' }),
  picks: z.array(pickResolver)
})
