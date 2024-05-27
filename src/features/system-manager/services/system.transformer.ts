export function createSystemTransformer (request: FormSystemRequest): FormSystemCreate {
  return {
    Name: request.systemName,
    Description: request.systemDescription,
    ImageUrl: request.systemProfileImage,
    InitialBankroll: request.systemInitialBankroll?.value,
    IsBacktesting: request.systemIsBacktesting,
    StakeByDefault: request.systemDefaultStake?.value,
    SportId: request.systemDefaultSports?.ID,
    BookieId: request.systemDefaultBookie?.ID
  }
}
