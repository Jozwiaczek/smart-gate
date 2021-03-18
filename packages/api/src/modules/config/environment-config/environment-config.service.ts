import { Injectable } from '@nestjs/common';

type CustomValueParser<SourceType, TargetType> = (valueRaw: SourceType) => TargetType;

@Injectable()
export class EnvironmentConfigService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly config: Record<string, any> = {};

  public getStringValue(key: string, required: boolean): string;

  public getStringValue(key: string): string | undefined;

  public getStringValue(key: string, required?: boolean): string | undefined {
    if (this.config[key] === undefined) {
      const value: string | undefined = process.env[key];
      if (required && value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      this.config[key] = value;
    }

    return this.config[key];
  }

  public getNumberValue(key: string, required: boolean): number;

  public getNumberValue(key: string): number | undefined;

  public getNumberValue(key: string, required?: boolean): number | undefined {
    if (this.config[key] === undefined) {
      const value: string | undefined = process.env[key];
      if (required && value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      this.config[key] = Number(value);
    }

    return this.config[key];
  }

  public getBooleanValue(key: string, required: boolean): boolean;

  public getBooleanValue(key: string): boolean | undefined;

  public getBooleanValue(key: string, required?: boolean): boolean | undefined {
    if (this.config[key] === undefined) {
      const value: string | undefined = process.env[key];
      if (required && value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      this.config[key] = Boolean(value);
    }

    return this.config[key];
  }

  public getCustomValue<T>(
    key: string,
    parser: CustomValueParser<string, T>,
    required: true,
  ): ReturnType<CustomValueParser<string, T>>;

  public getCustomValue<T>(
    key: string,
    parser: CustomValueParser<string | undefined, T | undefined>,
  ): ReturnType<CustomValueParser<string | undefined, T | undefined>>;

  public getCustomValue<T>(
    key: string,
    parser: CustomValueParser<string, T>,
    required?: true,
  ): ReturnType<CustomValueParser<string, T>> {
    if (this.config[key] === undefined) {
      const value: string | undefined = process.env[key];
      if (required && value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      this.config[key] = parser(value as string);
    }

    return this.config[key];
  }
}
