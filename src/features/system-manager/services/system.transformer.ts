export function createSystemTransformer (request: FormSystemRequest): FormSystemCreate {
  return {
    name: request.systemName,
    description: request.systemDescription,
    image_url: request.systemProfileImage,
    initial_bankroll: request.systemInitialBankroll,
    is_backtesting: request.systemIsBacktesting,
    stake_by_default: request.systemDefaultStake,
    sport_by_default: request.systemDefaultSports,
    bookie_by_default: request.systemDefaultBookie,
    owner_id: request.systemOwnerId
  }
}
