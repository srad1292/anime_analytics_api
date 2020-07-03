
import {validate, ValidationError} from "class-validator";
import {plainToClass} from "class-transformer";

function validationFactory<T>(metadataKey: Symbol, model: { new (...args: any[]): T}, source: "body" | "query"): any {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        Reflect.defineMetadata(metadataKey, model, target, propertyName);

        if(descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyName);
        }

        const method = descriptor.value;
        descriptor.value = async function (request, response, next) {
            const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);
            const errors = await validate(plainToClass(model, request[source]));
            if (errors.length > 0) {
                const formattedErrors = transformValidationErrorsToJSON(errors);
                const errorResponse = {
                    message: 'Invalid Request Data',
                    errors: formattedErrors
                }
                response.status(422).json(errorResponse);
                return;
            }

            return method.apply(this, [request, response, next]);
        };
    };
}

function transformValidationErrorsToJSON(errors: ValidationError[]) {
    return errors.reduce((formattedErrors, error: ValidationError) => {
        if (!error.children || !error.children.length) {
            formattedErrors[error.property] = Object.keys(error.constraints).map(key => error.constraints[key]);
        } else {
            formattedErrors[error.property] = transformValidationErrorsToJSON(error.children);
        }
        return formattedErrors;
    }, {});
}

export const ValidateQuery = dto => validationFactory(Symbol("validate-query"), dto, "query");
export const ValidateBody = dto => validationFactory(Symbol("validate-body"), dto, "body");

