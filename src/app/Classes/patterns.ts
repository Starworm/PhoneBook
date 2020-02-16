import {Validators} from '@angular/forms';

export class Patterns {

  static emailPattern = Validators.pattern('^(([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4}))?$');
  static passwordPattern =  Validators.pattern('^(?=.*[0-9])(?=.*[$~\\-_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$~\\-_]{8,}$');
  static namePattern =  Validators.pattern('^[a-zA-Z ]+$');
  static addressPattern =  Validators.pattern('^[a-zA-Z 0-9,;\\-//]*?$');
  static phonePattern =  Validators.pattern('\\+?\\d{1,3}-\\d{1,3}-\\d{3}-\\d{4}');
}
