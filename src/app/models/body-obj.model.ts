export class RegistrationBody {
  username: string;
  email: string;
  name: string;
  photo_url?: string;
  password: string;

}

export class EditUserBody {
  username: string;
  name: string;
  photo_url: string;
  oldPassword: string;
  newPassword: string;
}

export class UpdatePassBody {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class LoginBody {
  username: string;
  password: string;
}
