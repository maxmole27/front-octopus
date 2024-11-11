import { z } from 'zod'

export const pickResolver = z.object({
  sport_id: z.number({
    required_error: 'El deporte es requerido'
  })
    .min(1, { message: 'El deporte es requerido' }),

  player_or_team1_str: z.string({
    required_error: 'El jugador o equipo 1 es requerido'
  })
    .min(1, { message: 'El jugador o equipo 1 es requerido' }),

  player_or_team2_str: z.string({
    required_error: 'El jugador o equipo 2 es requerido'
  })
    .min(1, { message: 'El jugador o equipo 2 es requerido' }),

  odds: z.number({
    required_error: 'La cuota es requerida',
    invalid_type_error: 'La cuota debe ser un número'
  })
    .min(1, { message: 'La cuota debe ser de 1 o más' }),

  type_of_bet: z.string({
    required_error: 'El tipo de apuesta es requerido'
  })
    .min(1, { message: 'El tipo de apuesta es requerido' }),

  specific_bet: z.string({
    required_error: 'La apuesta específica es requerida'
  })
    .min(1, { message: 'La apuesta específica es requerida' }),

  league_or_tournament_str: z.string({
    required_error: 'La liga o torneo es requerido'
  })
    .min(1, { message: 'La liga o torneo es requerido' })
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
