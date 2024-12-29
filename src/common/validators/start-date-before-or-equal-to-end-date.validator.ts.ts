import { DateTime } from 'luxon';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator to check if startDate is before or equal to endDate.
 * @param validationOptions Additional options for custom validation.
 */
export function IsStartDateBeforeOrEqualToEndDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsStartDateBeforeOrEqualToEndDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          const startDate = DateTime.fromISO(object.startDate);
          const endDate = DateTime.fromISO(object.endDate);

          // Check if both dates are valid
          if (!startDate.isValid || !endDate.isValid) {
            return false;
          }

          return startDate <= endDate;
        },
        defaultMessage(args: ValidationArguments) {
          return 'startDate must be before or equal to endDate';
        }
      }
    });
  };
}