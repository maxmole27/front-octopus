export function createSystemTransformer (request: FormSystemRequest): FormSystemCreate {
  return {
    Name: request.systemName,
    Description: request.systemDescription,
    ImageUrl: request.systemProfileImage,
    InitialBankroll: request.systemInitialBankroll,
    IsBacktesting: request.systemIsBacktesting,
    StakeByDefault: request.systemDefaultStake,
    SportId: request.systemDefaultSports,
    BookieId: request.systemDefaultBookie
  }
}
