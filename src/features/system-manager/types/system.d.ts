
interface SystemResponse {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Name: string;
  Description: string;
  ImageUrl: string;
  InitialBankroll: number;
  IsBacktesting: boolean;
  StakeByDefault: number;
  SportId: number;
  Sport: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Name: string;
    Description: string;
  };
}